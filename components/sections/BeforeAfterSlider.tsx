"use client";

import Image from "next/image";
import {BLUR_DATA_URL, LOCAL_IMAGE_PROPS} from "@/lib/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";

const DEFAULT_AFTER_IMG = "/before-after-yard.jpg";
const DEFAULT_BEFORE_IMG = "/before-after-home.jpg";

type BeforeAfterSliderProps = {
  beforeImage?: string;
  afterImage?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  showLink?: boolean;
  bare?: boolean;
};

export default function BeforeAfterSlider({
  beforeImage = DEFAULT_BEFORE_IMG,
  afterImage = DEFAULT_AFTER_IMG,
  eyebrow = "Before & After",
  title = "See the transformation.",
  description = "Real projects from Rigid Landscaping. Drag the divider to compare site conditions against the finished result — turf, fencing, garden beds, and outdoor living spaces built to last.",
  showLink = true,
  bare = false,
}: BeforeAfterSliderProps) {
  const AFTER_IMG = afterImage;
  const BEFORE_IMG = beforeImage;
  const [pct, setPct] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(98, Math.max(2, raw)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const content = (
    <>
      <div
        ref={sliderRef}
        className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-sm border border-forest-deep/10 bg-forest-deep/5"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* After (full) */}
        <Image {...LOCAL_IMAGE_PROPS}
          src={AFTER_IMG}
          alt="After — completed landscape"
          fill
          loading="lazy"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-center"
          sizes="(max-width: 1280px) 100vw, 1280px"
          draggable={false}
        />
        {/* Before (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pct}%` }}
        >
          <div className="relative h-full" style={{ width: sliderRef.current?.offsetWidth ?? "100%" }}>
            <Image {...LOCAL_IMAGE_PROPS}
              src={BEFORE_IMG}
              alt="Before — original site condition"
              fill
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
              draggable={false}
            />
          </div>
        </div>
        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 z-10 w-1 -translate-x-1/2 bg-gold-light shadow-[0_0_12px_rgba(0,0,0,0.35)]"
          style={{ left: `${pct}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold-light bg-forest-deep text-gold-light shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 6L4 12L8 18M16 6L20 12L16 18" />
            </svg>
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-sm bg-forest-deep/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          Before
        </span>
        <span className="absolute right-4 top-4 rounded-sm bg-forest-deep/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold-light backdrop-blur-sm">
          After
        </span>
      </div>
    </>
  );

  if (bare) return content;

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 section-grid opacity-40" />
      <div className="relative mx-auto max-w-wrap px-6 md:px-12">
        <div className="mb-12 max-w-[560px]">
          <Reveal>
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="mb-4 font-display text-[30px] font-bold leading-tight sm:text-[40px] md:text-[48px]">
              {title}
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-forest">
              {description}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.08}>{content}</Reveal>
        {showLink && (
          <Reveal delay={0.12}>
            <div className="mt-10">
              <Link href="/projects" className="link-underline">
                View all projects →
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
