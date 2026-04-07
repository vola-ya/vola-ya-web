"use client";

import type { ReactNode } from "react";
import HeroAnimation from "./HeroAnimation";

/**
 * Shared background wrapper for HowItWorks + OpportunitiesSection.
 * The single flight network animation spans both sections as one parent layer.
 */
export default function FlightBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* One large ghostly animation that spans both child sections */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden
        style={{ zIndex: 0 }}
      >
        <HeroAnimation className="absolute right-[-6%] top-1/2 -translate-y-1/2 w-[62%] max-w-[820px] opacity-[0.07]" />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
