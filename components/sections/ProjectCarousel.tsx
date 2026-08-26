"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_PROJECTS } from "@/lib/constants";
import {BLUR_DATA_URL, IMAGE_QUALITY_CARD, LOCAL_IMAGE_PROPS} from "@/lib/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [active, setActive] = useState(0);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    if (card) {
      const w = card.offsetWidth + 20;
      setActive(Math.round(el.scrollLeft / w));
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 section-grid opacity-40" />

      <div className="relative mx-auto max-w-wrap px-6 md:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="eyebrow">Selected work</div>
            <h2 className="max-w-[480px] font-display text-[30px] font-bold leading-[1.05] tracking-tight sm:text-[40px] md:text-[48px]">
              Recent
              <span className="block text-forest/45">transformations.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous projects"
                disabled={!canPrev}
                onClick={() => scrollBy(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-deep/15 bg-white text-forest-deep transition-all hover:border-gold-deep/40 hover:bg-gold-light/20 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
              </button>
              <button
                type="button"
                aria-label="Next projects"
                disabled={!canNext}
                onClick={() => scrollBy(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-deep/15 bg-white text-forest-deep transition-all hover:border-gold-deep/40 hover:bg-gold-light/20 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
              </button>
              <Link
                href="/projects"
                className="ml-2 hidden items-center gap-1.5 text-sm font-semibold text-forest-deep transition-colors hover:text-gold-deep sm:inline-flex"
              >
                All projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed radical carousel */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scrollbar-hide px-6 pb-4 md:px-12"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {FEATURED_PROJECTS.map((project, i) => (
          <article
            key={project.slug}
            data-card
            className="group relative w-[min(85vw,420px)] shrink-0 snap-start sm:w-[min(60vw,480px)] lg:w-[min(42vw,520px)]"
          >
            <Link href={`/projects/${project.slug}`} className="block">
              <span className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-forest-deep">
                <Image {...LOCAL_IMAGE_PROPS}
                  src={project.image}
                  alt={project.name}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  quality={IMAGE_QUALITY_CARD}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 42vw"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/25 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 block p-6 md:p-8">
                  <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-light">
                    {project.category}
                  </span>
                  <span className="block font-display text-2xl font-bold tracking-tight text-white md:text-[28px]">
                    {project.name}
                  </span>
                  <span className="mt-2 block max-w-[90%] text-sm font-light leading-relaxed text-white/70 line-clamp-2">
                    {project.summary}
                  </span>
                  <span className="mt-4 flex items-center gap-3 text-[12px] text-white/50">
                    <span>{project.location}</span>
                    <span className="h-1 w-1 rounded-full bg-gold-light/50" />
                    <span>{project.timeline}</span>
                    <span className="h-1 w-1 rounded-full bg-gold-light/50" />
                    <span>{project.year}</span>
                  </span>
                </span>
                <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-forest-deep/40 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>
            </Link>
          </article>
        ))}
        {/* End card — view all */}
        <div className="flex w-[min(70vw,280px)] shrink-0 snap-start items-stretch sm:w-[240px]">
          <Link
            href="/projects"
            className="flex w-full flex-col items-center justify-center gap-4 rounded-sm border border-dashed border-forest-deep/20 bg-white/50 p-8 text-center transition-colors hover:border-gold-deep/40 hover:bg-white"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-forest-deep/15 text-forest-deep">
              <ArrowUpRight className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold text-forest-deep">
              View all projects
            </span>
          </Link>
        </div>
      </div>

      {/* Progress dots */}
      <div className="mx-auto mt-8 flex max-w-wrap items-center justify-center gap-2 px-6 md:px-12">
        {FEATURED_PROJECTS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to project ${i + 1}`}
            onClick={() => {
              const el = trackRef.current;
              const card = el?.querySelector("[data-card]") as HTMLElement | null;
              if (el && card) el.scrollTo({ left: i * (card.offsetWidth + 20), behavior: "smooth" });
            }}
            className={`h-1 rounded-full transition-all duration-400 ${
              i === active ? "w-8 bg-gold-deep" : "w-3 bg-forest-deep/20 hover:bg-forest-deep/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
