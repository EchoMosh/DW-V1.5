import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

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

const initialInfluencers: Influencer[] = [
  {
    id: "INF-1",
    name: "Ava North",
    handle: "@avanorth",
    platform: "Instagram",
    followers: 256000,
    engagement: 3.2,
    category: "Lifestyle",
    status: "pending",
  },
  {
    id: "INF-2",
    name: "TechTom",
    handle: "@techtom",
    platform: "YouTube",
    followers: 183000,
    engagement: 5.8,
    category: "Tech",
    status: "pending",
  },
  {
    id: "INF-3",
    name: "FitMia",
    handle: "@fit.mia",
    platform: "TikTok",
    followers: 920000,
    engagement: 8.9,
    category: "Fitness",
    status: "pending",
  },
  {
    id: "INF-4",
    name: "ChefRay",
    handle: "@raycooks",
    platform: "Instagram",
    followers: 74000,
    engagement: 4.1,
    category: "Food",
    status: "pending",
  },
]

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
  const [rows, setRows] = useState<Influencer[]>(initialInfluencers)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Influencer | null>(null)
  const [rejectReason, setRejectReason] = useState<string>("")
  const [rejectNotes, setRejectNotes] = useState<string>("")
  const [rejectOpen, setRejectOpen] = useState(false)

  const filtered = useMemo(() => {
    if (!query) return rows
    const q = query.toLowerCase()
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.handle.toLowerCase().includes(q) ||
        r.platform.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    )
  }, [rows, query])

  function approve(id: string) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved", rejectionReason: undefined } : r))
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
                placeholder="Search by name, handle, platform, category..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-white/5 border-white/10 placeholder:text-white/40"
              />
            </div>
          </div>

          <Separator className="my-4 bg-white/10" />

          <div className="relative overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Influencer</TableHead>
                    <TableHead>Handle</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead className="text-right">Followers</TableHead>
                    <TableHead className="text-right">Engagement</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length ? (
                    filtered.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.name}</TableCell>
                        <TableCell className="text-muted-foreground">{r.handle}</TableCell>
                        <TableCell>{r.platform}</TableCell>
                        <TableCell className="text-right tabular-nums">{formatFollowers(r.followers)}</TableCell>
                        <TableCell className="text-right">{r.engagement.toFixed(1)}%</TableCell>
                        <TableCell>{r.category}</TableCell>
                        <TableCell>
                          <StatusBadge status={r.status} reason={r.rejectionReason} />
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            disabled={r.status !== "pending"}
                            className="bg-emerald-500 hover:bg-emerald-500/90 text-white"
                            onClick={() => approve(r.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={r.status !== "pending"}
                            className="border-white/20 bg-white/5 hover:bg-white/10"
                            onClick={() => openReject(r)}
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
      <div className="flex items-center gap-2">
        <Badge className="bg-rose-500/20 text-rose-200 border border-rose-300/20">Rejected</Badge>
        {reason ? (
          <span className="text-xs text-white/60 max-w-[220px] truncate" title={reason}>
            {reason}
          </span>
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
