"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const step = Math.max(1, Math.round(value / 40));
    let current = 0;
    let frame: number;
    const tick = () => {
      current += step;
      if (current >= value) {
        setDisplay(value);
        return;
      }
      setDisplay(current);
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-[42px] font-bold leading-none tracking-tight text-forest-deep sm:text-[48px]">
      {display}
      <span className="text-gold-deep">{suffix}</span>
    </span>
  );
}

export default function TrustStrip() {
  return (
    <section className="texture-paper relative overflow-hidden border-y border-forest-deep/10 bg-cream">
      <div className="pointer-events-none absolute inset-0 section-grid opacity-60" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto grid max-w-wrap grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-4 md:px-12 md:py-16"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`relative ${i > 0 ? "sm:border-l sm:border-forest-deep/10 sm:pl-8" : ""}`}
          >
            <div className="mb-3 h-px w-8 bg-gradient-to-r from-gold-deep to-transparent" />
            <Counter value={stat.value} suffix={stat.suffix} />
            <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/70">
              {stat.label}
            </div>
          </div>
        ))}
        <div className="relative border-l border-forest-deep/10 pl-5 sm:pl-8">
          <div className="mb-3 h-px w-8 bg-gradient-to-r from-gold-deep to-transparent" />
          <span className="block font-display text-2xl font-bold tracking-tight text-forest-deep sm:text-[28px]">
            Sydney
          </span>
          <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/70">
            Service Region
          </div>
        </div>
      </motion.div>
    </section>
  );
}
