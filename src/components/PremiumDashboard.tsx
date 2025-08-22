import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { cn } from "@/lib/utils"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowUpRight, Users, DollarSign, Percent } from "lucide-react"
import AnimatedListDemo from "@/registry/example/animated-list-demo"

/**
 * Premium Dashboard
 * Apple/Tesla inspired. Glassmorphic bento layout with mixed widths and charts.
 */

// Shared tile styles (glassmorphic)
const tileClass =
  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] lg:bg-white/[0.02] p-4 lg:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] hover:bg-white/[0.06] transition-colors"

// Simple gradient aura for tiles
function TileAura() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-16 -z-10"
      style={{
        background:
          "radial-gradient(60% 60% at 30% 10%, rgba(59,131,246,0.16) 0%, rgba(59,131,246,0.06) 38%, transparent 70%)",
      }}
    />
  )
}

// Lightweight number ticker (no external dep)
function NumberTicker({
  value,
  duration = 1000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const [display, setDisplay] = React.useState(0)
  React.useEffect(() => {
    const start = performance.now()
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setDisplay(value * eased)
      if (p < 1) requestAnimationFrame(step)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])
  return (
    <span className={cn("font-semibold tracking-tight", className)}>
      {prefix}
      {display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  )
}

// Demo data (daily)
const areaData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

// Monthly for bar chart
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const barData = months.map((m, i) => ({
  month: m,
  desktop: Math.round(120 + 80 * Math.sin(i / 2) + (i % 3) * 30),
  mobile: Math.round(100 + 60 * Math.cos(i / 3) + (i % 2) * 25),
}))

const areaConfig: ChartConfig = {
  visitors: { label: "Visitors" },
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
}

const barConfig: ChartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
}

function AreaChartTile() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const filteredData = React.useMemo(() => {
    const referenceDate = new Date("2024-06-30")
    let days = 90
    if (timeRange === "30d") days = 30
    if (timeRange === "7d") days = 7
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - days)
    return areaData.filter((d) => new Date(d.date) >= startDate)
  }, [timeRange])

  const uid = React.useId().replace(/:/g, "")
  const fillDesktopId = `fillDesktop-${uid}`
  const fillMobileId = `fillMobile-${uid}`

  return (
    <div className={cn(tileClass, "col-span-6 lg:col-span-4")}>
      <TileAura />
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">Traffic overview</h3>
          <p className="text-xs text-white/70">Visitors by device over selected period</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="bg-[#0a0c12] text-white border-white/10">
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <ChartContainer config={areaConfig} className="h-[210px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id={fillDesktopId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.08} />
              </linearGradient>
              <linearGradient id={fillMobileId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(value: string) => {
                const d = new Date(value)
                return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value as string).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="mobile" type="natural" fill={`url(#${fillMobileId})`} stroke="var(--color-mobile)" strokeWidth={2} />
            <Area dataKey="desktop" type="natural" fill={`url(#${fillDesktopId})`} stroke="var(--color-desktop)" strokeWidth={2} />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  )
}

function BarChartTile() {
  return (
    <div className={cn(tileClass, "col-span-6 lg:col-span-2")}>
      <TileAura />
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-white">Device mix by month</h3>
        <p className="text-xs text-white/70">Desktop vs Mobile distribution</p>
      </div>
      <div className="mt-4">
        <ChartContainer config={barConfig} className="h-[170px] w-full">
          <BarChart data={barData} barCategoryGap={12}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={6} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

function ActivityTile() {
  return (
    <div className={cn(tileClass, "col-span-6 lg:col-span-2")}>
      <TileAura />
      <h3 className="text-lg font-semibold text-white">Recent activity</h3>
      <AnimatedListDemo className="mt-3" />
    </div>
  )
}

type ActionNode = {
  title: string
  children?: ActionNode[]
  done?: boolean
}

function ActionHierarchyTile() {
  const tree: ActionNode[] = [
    {
      title: "Launch Q3 Campaign",
      children: [
        {
          title: "Define target segments",
          children: [{ title: "Upload audience list", done: true }, { title: "Prioritize geo", done: true }],
        },
        {
          title: "Approve influencers",
          children: [{ title: "Shortlist 20 creators" }, { title: "Send briefs" }],
        },
        { title: "Set budget & pacing", done: false },
      ],
    },
  ]

  const Node = ({ node, depth = 0 }: { node: ActionNode; depth?: number }) => {
    const hasChildren = !!node.children?.length
    return (
      <div className="relative">
        {depth > 0 && (
          <div
            className="absolute left-[8px] top-4 bottom-0 w-px bg-white/10"
            aria-hidden
          />
        )}
        <div className="flex items-center gap-2" style={{ paddingLeft: depth * 16 }}>
          <span
            className={cn(
              "inline-block h-3.5 w-3.5 rounded-full border",
              node.done ? "border-emerald-300/40 bg-emerald-300/20" : "border-white/30 bg-white/10"
            )}
          />
          <span className={cn("text-sm", node.done ? "text-white/70 line-through" : "text-white/90")}>
            {node.title}
          </span>
        </div>
        {hasChildren && (
          <div className="mt-2 space-y-2">
            {node.children!.map((c, i) => (
              <Node key={i} node={c} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn(tileClass, "col-span-6 lg:col-span-2")}>
      <TileAura />
      <h3 className="text-lg font-semibold text-white">Action hierarchy</h3>
      <div className="mt-2 space-y-2">
        {tree.map((n, i) => (
          <Node key={i} node={n} />
        ))}
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  icon: React.ComponentType<{ size?: number | string; className?: string }>
  label: string
  value: number
  delta: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const positive = delta >= 0
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg border border-white/15 bg-white/10 flex items-center justify-center">
            <Icon size={16} className="text-white" />
          </div>
          <span className="text-xs text-white/70">{label}</span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] border",
            positive
              ? "border-emerald-400/30 text-emerald-300 bg-emerald-400/10"
              : "border-rose-400/30 text-rose-300 bg-rose-400/10"
          )}
        >
          <ArrowUpRight
            size={12}
            className={cn("shrink-0", positive ? "rotate-0" : "rotate-180")}
          />
          {positive ? "+" : "-"}
          {Math.abs(delta)}%
        </span>
      </div>
      <div className="mt-2">
        <NumberTicker
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          className="text-2xl text-white"
        />
      </div>
    </div>
  )
}

function KPIStackTile() {
  return (
    <div className={cn(tileClass, "col-span-6 lg:col-span-2")}>
      <TileAura />
      <h3 className="text-lg font-semibold text-white">Key metrics</h3>
      <div className="mt-4 grid grid-cols-1 gap-2">
        <StatCard icon={Users} label="Active users" value={48210} delta={12} />
        <StatCard icon={DollarSign} label="Revenue (MTD)" value={128450} prefix="$" delta={8.4} />
        <StatCard icon={Percent} label="Conversion" value={3.92} suffix="%" decimals={2} delta={1.2} />
      </div>
    </div>
  )
}

export default function PremiumDashboard() {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/70">
          A crisp overview of your growth, engagement, and pipeline — designed with a premium glass aesthetic.
        </p>
      </div>

      <div className="grid grid-cols-6 gap-3 lg:gap-4">
        {/* Row 1: wide + narrow */}
        <AreaChartTile />
        <KPIStackTile />

        {/* Row 2: three boxes (per feedback) */}
        <BarChartTile />
        <ActivityTile />
        <ActionHierarchyTile />
      </div>
    </div>
  )
}
