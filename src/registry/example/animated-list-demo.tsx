import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const sample = [
  { id: 1, title: "Server restarted", detail: "All systems nominal" },
  { id: 2, title: "New signup", detail: "jane@acme.co" },
  { id: 3, title: "Payment received", detail: "$249.00" },
  { id: 4, title: "Deploy complete", detail: "v1.2.3" },
  { id: 5, title: "Task finished", detail: "ETL pipeline" },
];

export default function AnimatedListDemo({ className }: Props) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 p-3 text-white/90",
        "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
        className
      )}
    >
      <ul className="space-y-2">
        {sample.map((n, i) => (
          <li
            key={n.id}
            className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm"
            style={{
              animation: "fade-in-up 400ms ease-out both",
              animationDelay: `${i * 80}ms`,
            }}
          >
            <span className="font-medium">{n.title}</span>
            <span className="text-white/70">{n.detail}</span>
          </li>
        ))}
      </ul>
      <style>{`
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
`}</style>
    </div>
  );
}
