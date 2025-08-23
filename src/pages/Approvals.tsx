import { useMemo, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

import { Glass } from "@/components/ui/Glass"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Status = "pending" | "approved" | "rejected"

type Influencer = {
  id: string
  name: string
  handle: string
  platform: "Instagram" | "TikTok" | "YouTube" | "X"
  followers: number
  engagement: number // % as 0-100
  category: string
  status: Status
  rejectionReason?: string
}

// Removed static data - will fetch from API

const rejectOptions = [
  "Audience mismatch",
  "Low engagement",
  "Brand fit concerns",
  "Past negative sentiment",
  "Budget constraints",
  "Duplicate selection",
  "Suspicious metrics",
  "Other",
] as const

export default function Approvals() {
  const { user, session } = useAuth()
  const [rows, setRows] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Influencer | null>(null)
  const [rejectReason, setRejectReason] = useState<string>("")
  const [rejectNotes, setRejectNotes] = useState<string>("")
  const [rejectOpen, setRejectOpen] = useState(false)

  // Fetch influencers from the webhook
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Prepare user data to send with the request
        const userData = {
          userId: user?.id || 'anonymous',
          email: user?.email || 'no-email',
          userMetadata: user?.user_metadata || {},
          sessionId: session?.access_token || 'no-session',
          timestamp: new Date().toISOString(),
          isAuthenticated: !!(user && session),
        }
        
        console.log('Sending user data:', userData)
        
        const requestBody = {
          user: userData,
          action: 'get_influencers_for_review',
        }
        
        console.log('Request body:', requestBody)
        
        const response = await fetch('https://dreamwell.app.n8n.cloud/webhook/review-and-approve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(session?.access_token && { 'Authorization': `Bearer ${session.access_token}` }),
          },
          body: JSON.stringify(requestBody),
        })

        console.log('Response status:', response.status)
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Response data:', data)
        
        // Transform the API response to match our Influencer type
        // Map the actual JSON structure from the webhook
        const influencers: Influencer[] = Array.isArray(data) ? data.map((item: any, index: number) => {
          // Parse followers count - handle both string and number formats
          let followersCount = 0;
          if (item.followers && item.followers !== 'N/A') {
            const followersStr = item.followers.toString().toLowerCase();
            if (followersStr.includes('k')) {
              followersCount = parseFloat(followersStr.replace('k', '')) * 1000;
            } else if (followersStr.includes('m')) {
              followersCount = parseFloat(followersStr.replace('m', '')) * 1000000;
            } else {
              followersCount = parseInt(followersStr) || 0;
            }
          }

          return {
            id: item.id || `INF-${index + 1}`,
            name: `${item.first_name || ''} ${item.last_name || ''}`.trim() || 'Unknown',
            handle: item.email || '@unknown', // Using email as handle since no social handle provided
            platform: (item.platform && item.platform !== 'N/A') ? item.platform : 'Unknown',
            followers: followersCount,
            engagement: 0, // No engagement data in the provided structure
            category: (item.niche && item.niche !== 'N/A') ? item.niche : 'General',
            status: 'pending', // Default status
            rejectionReason: undefined,
          };
        }) : []

        setRows(influencers)
      } catch (err) {
        console.error('Error fetching influencers:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch influencers')
      } finally {
        setLoading(false)
      }
    }

    fetchInfluencers()
  }, [user, session]) // Re-fetch when user or session changes

  const filtered = useMemo(() => {
    if (!query) return rows
    const q = query.toLowerCase()
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.platform.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        formatFollowers(r.followers).toLowerCase().includes(q) ||
        (r.rejectionReason && r.rejectionReason.toLowerCase().includes(q))
    )
  }, [rows, query])

  function approve(id: string) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved", rejectionReason: undefined } : r))
    )
  }

  function undoAction(id: string) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "pending", rejectionReason: undefined } : r))
    )
  }

  function openReject(influencer: Influencer) {
    setSelected(influencer)
    setRejectReason("")
    setRejectNotes("")
    setRejectOpen(true)
  }

  function confirmReject() {
    if (!selected) return
    const finalReason =
      rejectReason === "Other" ? (rejectNotes.trim() || "Other") : rejectReason || rejectNotes.trim()
    if (!finalReason) return
    setRows((prev) =>
      prev.map((r) => (r.id === selected.id ? { ...r, status: "rejected", rejectionReason: finalReason } : r))
    )
    setRejectOpen(false)
    setSelected(null)
  }


  return (
    <div className="w-full overflow-hidden flex items-start justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-semibold">Approvals</h1>
              <p className="text-muted-foreground mt-1">
                Review suggested influencers. Approve or reject with a quick reason.
              </p>
            </div>
            <div className="w-full sm:w-80">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <Input
                id="search"
                placeholder="Search by name, platform, followers, category, status..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-white/5 border-white/10 placeholder:text-white/40"
              />
            </div>
          </div>

          <Separator className="my-4 bg-white/10" />

          <div className="relative overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                  <p className="text-muted-foreground">Loading influencers...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-2">
                  <p className="text-red-400">Error loading influencers</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline"
                    className="border-white/20 bg-white/5 hover:bg-white/10"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            ) : (
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Influencer</TableHead>
                    <TableHead className="w-[120px]">Platform</TableHead>
                    <TableHead className="w-[150px] text-right pr-8">Followers</TableHead>
                    <TableHead className="w-[200px] pl-8">Category</TableHead>
                    <TableHead className="w-[120px] min-w-[120px]">Status</TableHead>
                    <TableHead className="w-[200px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length ? (
                    filtered.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.name}</TableCell>
                        <TableCell>{r.platform}</TableCell>
                        <TableCell className="text-right tabular-nums pr-8">{formatFollowers(r.followers)}</TableCell>
                        <TableCell className="pl-8">{r.category}</TableCell>
                        <TableCell>
                          <StatusBadge status={r.status} reason={r.rejectionReason} />
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {r.status === "pending" ? (
                            <>
                              <Button
                                size="sm"
                                className="bg-emerald-500 hover:bg-emerald-500/90 text-white"
                                onClick={() => approve(r.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-white/20 bg-white/5 hover:bg-white/10"
                                onClick={() => openReject(r)}
                              >
                                Reject
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 bg-white/5 hover:bg-white/10"
                              onClick={() => undoAction(r.id)}
                            >
                              Undo
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        {rows.length === 0 ? "No influencers found." : "No results match your search."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-white/60">
              {rows.filter((r) => r.status === "pending").length} pending •{" "}
              {rows.filter((r) => r.status === "approved").length} approved •{" "}
              {rows.filter((r) => r.status === "rejected").length} rejected
            </div>
            <Link to="/launchpad" className="text-sm text-sky-300 underline underline-offset-4">
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Reject Dialog (glassmorphic) */}
        <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
          <DialogContent className="bg-transparent border-0 shadow-none p-0">
            <Glass variant="card" className="p-6 sm:p-8 w-full max-w-xl">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {selected ? `Reject ${selected.name}` : "Reject Influencer"}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                <div>
                  <p className="text-sm text-white/70">Select a reason</p>
                  <RadioGroup
                    value={rejectReason}
                    onValueChange={setRejectReason}
                    className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    {rejectOptions.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 hover:bg-white/8 cursor-pointer"
                      >
                        <RadioGroupItem value={opt} id={opt} />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any context for your rejection..."
                    value={rejectNotes}
                    onChange={(e) => setRejectNotes(e.target.value)}
                    className="min-h-24 bg-white/5 border-white/10 placeholder:text-white/40"
                  />
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  variant="ghost"
                  className="hover:bg-white/10"
                  onClick={() => setRejectOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmReject}
                  className="bg-rose-500 hover:bg-rose-500/90 text-white"
                  disabled={!rejectReason && !rejectNotes.trim()}
                >
                  Confirm Rejection
                </Button>
              </DialogFooter>
            </Glass>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function StatusBadge({ status, reason }: { status: Status; reason?: string }) {
  if (status === "approved")
    return <Badge className="bg-emerald-500/20 text-emerald-200 border border-emerald-300/20">Approved</Badge>
  if (status === "rejected")
    return (
      <div className="w-full">
        <Badge className="bg-rose-500/20 text-rose-200 border border-rose-300/20">Rejected</Badge>
        {reason ? (
          <div className="text-xs text-white/60 mt-1 truncate max-w-[100px]" title={reason}>
            {reason}
          </div>
        ) : null}
      </div>
    )
  return <Badge variant="secondary" className="bg-white/10 border-white/10">Pending</Badge>
}

function formatFollowers(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k"
  return n.toString()
}
