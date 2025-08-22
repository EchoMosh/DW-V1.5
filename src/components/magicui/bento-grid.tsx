import * as React from "react";
import { cn } from "@/lib/utils";

type BentoCardProps = {
  Icon?: React.ComponentType<{ className?: string; size?: number | string }>;
  name: string;
  description?: string;
  href?: string;
  cta?: string;
  className?: string;
  background?: React.ReactNode;
};

type BentoGridProps = React.PropsWithChildren<{
  className?: string;
}>;

/**
 * Simple MagicUI-like Bento Grid
 * - 3 columns on lg+, stacked on mobile
 * - BentoCard supports optional icon, background layer, and cta link
 */
export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-4 lg:gap-6",
        "max-w-6xl w-full",
        "grid-flow-dense",
        "sm:grid-cols-3 grid-cols-3",
        "px-2",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  Icon,
  name,
  description,
  href,
  cta = "Learn more",
  className,
  background,
}: BentoCardProps) {
  const Wrapper: React.ElementType = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      className={cn(
        "group relative col-span-3 overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/[0.02] dark:border-white/10",
        "p-5 lg:p-6",
        "hover:bg-white/[0.04] transition-colors",
        "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
        "min-h-[220px] flex flex-col justify-between",
        "no-underline",
        className
      )}
    >
      {/* background layer */}
      {background && (
        <div className="pointer-events-none absolute inset-0 -z-10">{background}</div>
      )}

      <div className="flex items-center gap-2">
        {Icon ? (
          <div className="h-8 w-8 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center">
            <Icon className="text-white/90" size={16} />
          </div>
        ) : null}
        <h3 className="text-base font-semibold text-white">{name}</h3>
      </div>

      {description ? (
        <p className="mt-2 text-sm text-white/80 max-w-[46ch]">{description}</p>
      ) : null}

      {href ? (
        <div className="mt-4 text-sm text-sky-300/90 underline underline-offset-4 group-hover:text-sky-200">
          {cta}
        </div>
      ) : null}
    </Wrapper>
  );
}
