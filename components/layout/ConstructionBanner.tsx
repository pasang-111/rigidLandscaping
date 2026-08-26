"use client";

import { useState } from "react";
import { HardHat, X } from "lucide-react";

export default function ConstructionBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative flex items-center justify-center gap-2.5 overflow-hidden bg-gold-light px-4 py-2 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(22,48,42,0.08)_0px,rgba(22,48,42,0.08)_10px,transparent_10px,transparent_20px)]" />
      <HardHat className="relative z-10 h-3.5 w-3.5 shrink-0 text-forest-deep" strokeWidth={2.2} />
      <p className="relative z-10 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-forest-deep sm:text-[12.5px]">
        This site is currently undergoing development &amp; construction — new galleries and content are on the way.
      </p>
      <button
        type="button"
        aria-label="Dismiss notice"
        onClick={() => setVisible(false)}
        className="relative z-10 ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-forest-deep/70 transition-colors hover:bg-forest-deep/10 hover:text-forest-deep"
      >
        <X className="h-3.5 w-3.5" strokeWidth={2.2} />
      </button>
    </div>
  );
}
