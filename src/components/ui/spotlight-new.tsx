"use client";
import { cn } from "@/lib/utils";
import React from "react";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({
  className,
  fill = "ffffff",
}: SpotlightProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-10",
        className
      )}
    >
      {/* Main bright spotlight glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]"
        style={{
          background: `radial-gradient(circle at 50% 45%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.15) 50%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
      
      {/* Bright gradient beam */}
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2">
        <div className="bg-gradient-to-r from-transparent via-white to-transparent h-2 w-[900px] blur-2xl opacity-90" />
        <div className="bg-gradient-to-r from-transparent via-sky-200 to-transparent h-[3px] w-[700px] opacity-90 mt-1" />
      </div>
      
      {/* Additional bright radial glow */}
      <div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[1300px] opacity-60"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 35%, transparent 65%)`,
          filter: "blur(30px)",
        }}
      />
    </div>
  );
};
