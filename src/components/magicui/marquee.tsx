import * as React from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = React.PropsWithChildren<{
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
  durationSec?: number; // seconds for one full loop
}>;

/**
 * Lightweight marquee component (no external deps)
 * - Duplicates children to create an infinite horizontal scroll
 * - pauseOnHover supported
 */
export function Marquee({
  className,
  pauseOnHover = false,
  reverse = false,
  durationSec = 20,
  children,
}: MarqueeProps) {
  React.useEffect(() => {
    const id = "magicui-marquee-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.innerHTML = `
@keyframes magicui-marquee-scroll {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
.magicui-marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
}
`;
      document.head.appendChild(style);
    }
  }, []);

  const [paused, setPaused] = React.useState(false);

  const onMouseEnter = () => {
    if (pauseOnHover) setPaused(true);
  };
  const onMouseLeave = () => {
    if (pauseOnHover) setPaused(false);
  };

  const animationStyle: React.CSSProperties = {
    animation: `magicui-marquee-scroll ${durationSec}s linear infinite`,
    animationDirection: reverse ? "reverse" as const : "normal" as const,
    animationPlayState: paused ? "paused" : "running",
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
        className
      )}
    >
      <div className="magicui-marquee-track" style={animationStyle}>
        {/* duplicate content for seamless loop */}
        <div className="flex gap-3 pr-3">{children}</div>
        <div className="flex gap-3 pr-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
