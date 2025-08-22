"use client";
import { cn } from "@/lib/utils";
import React from "react";

type SpotlightProps = {
  className?: string;
  fill?: string;
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const Spotlight = ({
  className,
  fill = "white",
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .25) 0, hsla(210, 100%, 55%, .08) 50%, hsla(210, 100%, 45%, .02) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .20) 0, hsla(210, 100%, 55%, .08) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .15) 0, hsla(210, 100%, 45%, .06) 80%, transparent 100%)",
  translateY = -350,
  width = 800,
  height = 1600,
  smallWidth = 400,
  duration = 5,
  xOffset = 150,
}: SpotlightProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 h-screen w-screen",
        className
      )}
    >
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: gradientFirst,
          transform: `translateY(${translateY}px)`,
          width: `${width}px`,
          height: `${height}px`,
          animationDuration: `${duration}s`,
        }}
      />
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: gradientSecond,
          transform: `translateY(${translateY}px) translateX(${xOffset}px)`,
          width: `${smallWidth}px`,
          height: `${height}px`,
          animationDuration: `${duration * 0.8}s`,
          animationDelay: "0.5s",
        }}
      />
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: gradientThird,
          transform: `translateY(${translateY}px) translateX(-${xOffset}px)`,
          width: `${smallWidth}px`,
          height: `${height}px`,
          animationDuration: `${duration * 1.2}s`,
          animationDelay: "1s",
        }}
      />
      
      {/* Additional intense spotlights */}
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: "radial-gradient(40% 40% at 60% 40%, hsla(217, 91%, 59%, .3) 0, hsla(217, 91%, 70%, .1) 50%, transparent 100%)",
          transform: `translateY(${translateY * 0.7}px) translateX(${xOffset * 2}px)`,
          width: `${width * 0.6}px`,
          height: `${height * 0.8}px`,
          animationDuration: `${duration * 1.5}s`,
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: "radial-gradient(35% 35% at 40% 60%, hsla(217, 91%, 59%, .25) 0, hsla(217, 91%, 85%, .08) 60%, transparent 100%)",
          transform: `translateY(${translateY * 1.2}px) translateX(-${xOffset * 1.5}px)`,
          width: `${width * 0.5}px`,
          height: `${height * 1.1}px`,
          animationDuration: `${duration * 0.9}s`,
          animationDelay: "1.5s",
        }}
      />
    </div>
  );
};