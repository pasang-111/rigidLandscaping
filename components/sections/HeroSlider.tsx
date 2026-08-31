"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { HERO_SLIDES, SITE } from "@/lib/constants";
import { LOCAL_IMAGE_PROPS } from "@/lib/image";

const SLIDE_DURATION = 9000;
const FADE_DURATION = 1.0;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [entered, setEntered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 28, damping: 26, mass: 0.85 });
  const sy = useSpring(my, { stiffness: 28, damping: 26, mass: 0.85 });

  const slides = HERO_SLIDES;

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 120);
    return () => clearTimeout(t);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setIndex((i + slides.length) % slides.length);
      setProgressKey((k) => k + 1);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || !entered) return;
    const t = setTimeout(next, SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [index, paused, next, entered]);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
      my.set(p * 16);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [my]);

  const onPointerMove = (e: React.PointerEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  };

  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 56) prev();
    else if (delta < -56) next();
    touchStartX.current = null;
  };

  const active = slides[index];

  return (
    <section
      ref={sectionRef}
      className="grade-hero relative isolate flex h-screen min-h-[100dvh] items-end overflow-hidden bg-forest-deep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        onPointerLeave();
      }}
      onPointerMove={onPointerMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Rigid Landscaping"
    >
      <div className="absolute inset-x-0 top-0 z-30">
        <div
          className="flex items-center justify-center px-4 py-2 text-center"
          style={{
            background: "rgba(239, 209, 100, 0.9)",
            WebkitBackdropFilter: "blur(10px)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forest-deep sm:text-[11px]">
            Site under development
          </span>
        </div>
      </div>

      {slides.map((slide, i) => (
        <motion.div
          key={slide.image}
          className="absolute inset-0 z-0"
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: FADE_DURATION, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: "none" }}
        >
          <motion.div
            className="absolute -inset-[4%]"
            style={i === index ? { x: sx, y: sy } : undefined}
            initial={false}
            animate={i === index ? { scale: 1.1 } : { scale: 1.0 }}
            transition={{
              duration: i === index ? SLIDE_DURATION / 1000 + FADE_DURATION : 0.8,
              ease: "linear",
            }}
          >
            <Image
              {...LOCAL_IMAGE_PROPS}
              src={slide.image}
              alt={slide.title.replace(/\n/g, " ")}
              fill
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="100vw"
              className={`grade-hero-image object-cover ${slide.focus}`}
            />
          </motion.div>
        </motion.div>
      ))}

      <div className="grade-scrim" />
      <div className="grade-warm-lift" />
      <div className="grade-vignette" />
      <motion.div
        className="hero-spotlight hidden md:block"
        style={{ x: sx, y: sy }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-24 bg-gradient-to-b from-forest-deep/60 to-transparent md:h-32" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-44 bg-gradient-to-t from-forest-deep/90 to-transparent md:h-56" />

      <div className="relative z-10 mx-auto w-full max-w-wrap px-6 pb-20 pt-32 md:px-12 md:pb-24 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-gold-light/70" />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
              Rigid Landscaping
            </span>
          </div>

          <motion.div
            className="overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={entered ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <h1 className="motto-soft will-change-transform whitespace-pre-line font-display text-[44px] font-bold leading-[0.95] tracking-tight text-white sm:text-[56px] md:text-[72px] lg:text-[84px]">
              Ground up,
              <br />
              built right.
            </h1>
          </motion.div>

          <p className="mt-5 text-[12px] font-medium tracking-[0.06em] text-white/50">
            A division of{" "}
            
              href={SITE.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-light/90 transition-colors hover:text-gold-light"
            >
              {SITE.parentCompany}
            </a>
          </p>
        </motion.div>

        <motion.div
          className="mt-10 max-w-[360px]"
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.55 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15px] font-light leading-relaxed tracking-wide text-white/70"
            >
              {active.description}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.75 }}
        >
          <Link
            href="/contact"
            className="inline-block bg-gold-light px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-forest-deep transition-all duration-300 hover:bg-white"
          >
            Request a Consultation
          </Link>
          <Link
            href="/projects"
            className="inline-block border border-white/25 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-white/85 transition-all duration-300 hover:border-white/50 hover:text-white"
          >
            View Work
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.95 }}
        >
          <span className="font-display text-[13px] tabular-nums tracking-wider text-white/40">
            {String(index + 1).padStart(2, "0")}
            <span className="text-white/20"> / {String(slides.length).padStart(2, "0")}</span>
          </span>
          <div className="flex h-px max-w-[200px] flex-1 gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className="relative h-px flex-1 overflow-hidden bg-white/15"
              >
                {i === index && (
                  <motion.span
                    key={progressKey}
                    className="absolute inset-y-0 left-0 block bg-gold-light"
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? undefined : "100%" }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                  />
                )}
                {i < index && <span className="absolute inset-0 bg-gold-light/40" />}
              </button>
            ))}
          </div>
          <span className="hidden text-[11px] uppercase tracking-[0.16em] text-white/35 sm:inline">
            {active.eyebrow}
          </span>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 justify-between px-5 md:flex md:px-8">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center text-white/40 transition-colors hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center text-white/40 transition-colors hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.1 }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
          Scroll
        </span>
        <span className="scroll-cue-track" />
      </motion.div>
    </section>
  );
}
