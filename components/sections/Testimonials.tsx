"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const current = TESTIMONIALS[index];

  return (
    <section className="relative overflow-hidden bg-forest-deep py-32 md:py-40">
      <div className="pointer-events-none absolute inset-0 section-grid-dark opacity-80" />
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-gold-light/5 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-gold-deep/10 blur-[90px]" />

      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none font-display text-[280px] font-bold leading-none text-white/[0.03] sm:text-[380px]"
      >
        &ldquo;
      </span>

      <div className="relative z-10 mx-auto max-w-[720px] px-6 text-center">
        <div className="mb-10 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-light/50" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light/80">
            Client reviews
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-light/50" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-10 font-serif text-[24px] font-medium leading-[1.35] tracking-tight text-white sm:text-[28px] md:text-[34px]">
              {current.quote}
            </p>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[13px] font-semibold tracking-wide text-gold-light">
                {current.name}
              </span>
              <span className="text-[12px] font-light text-sage/50">
                {current.location}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name + i}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-8 bg-gold-light"
                  : "w-3 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
