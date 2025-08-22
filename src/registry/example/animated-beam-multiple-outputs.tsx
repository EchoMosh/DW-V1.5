import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight placeholder for "AnimatedBeamMultipleOutputDemo"
 * Visually renders animated gradient beams to simulate connections.
 */
export default function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[260px] w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
        className
      )}
    >
      {/* Emitters */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="size-3 rounded-full bg-sky-400 shadow-[0_0_24px_rgba(56,189,248,.7)]"
          />
        ))}
      </div>

      {/* Receivers */}
      <div className="absolute right-4 top-6 flex flex-col gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-12 rounded-full bg-white/20 backdrop-blur"
          />
        ))}
      </div>

      {/* Beams */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="beam" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(56,189,248,0.0)" />
            <stop offset="20%" stopColor="rgba(56,189,248,0.5)" />
            <stop offset="80%" stopColor="rgba(167,139,250,0.6)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0.0)" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[
          { y1: 80, y2: 60, delay: 0 },
          { y1: 150, y2: 140, delay: 0.25 },
          { y1: 220, y2: 220, delay: 0.5 },
        ].map((b, i) => (
          <g key={i} style={{ animation: `dash 2.6s ${b.delay}s linear infinite` }}>
            <path
              d={`M 40 ${b.y1} C 250 ${b.y1}, 550 ${b.y2}, 760 ${b.y2}`}
              stroke="url(#beam)"
              strokeWidth="3"
              fill="none"
              filter="url(#glow)"
              strokeDasharray="120 480"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>

      <style>{`
@keyframes dash {
  from { stroke-dashoffset: 600; }
  to { stroke-dashoffset: 0; }
}
`}</style>
    </div>
  );
}
