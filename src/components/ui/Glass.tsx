/**
 * Reusable glass morphism panel component
 * Provides consistent glass effect styling across the dashboard
 */

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "pill" | "sidebar"
  blur?: "sm" | "md" | "lg"
}

const Glass = forwardRef<HTMLDivElement, GlassProps>(
  ({ className, variant = "default", blur = "md", children, ...props }, ref) => {
    const variants = {
      default: "rounded-2xl border border-glass-border bg-glass backdrop-blur-glass shadow-glass",
      card: "rounded-2xl border border-glass-border bg-glass backdrop-blur-glass shadow-glass hover:shadow-glow transition-all duration-normal",
      pill: "rounded-full border border-glass-border bg-glass backdrop-blur-glass shadow-soft",
      sidebar: "rounded-xl border border-glass-border bg-glass backdrop-blur-glass shadow-soft"
    }

    const blurVariants = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-glass", 
      lg: "backdrop-blur-xl"
    }

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          blurVariants[blur],
          "relative",
          "before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-glass-highlight before:opacity-50 before:pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Glass.displayName = "Glass"

export { Glass }