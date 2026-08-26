"use client";

import Reveal from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 section-grid opacity-50" />
      <div className="relative mx-auto max-w-wrap px-6 md:px-12">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-10">
          <Reveal>
            <div className="eyebrow">Process</div>
            <h2 className="max-w-[520px] font-display text-[30px] font-bold leading-[1.05] tracking-tight sm:text-[40px] md:text-[48px]">
              Four stages.
              <span className="block text-forest/50">Clear process.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[320px] text-[15px] font-light leading-relaxed text-forest/80">
              Consult, design, build, maintain — the same process on every project.
            </p>
          </Reveal>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {/* Connection line desktop */}
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-[36px] hidden h-px bg-gradient-to-r from-transparent via-gold-deep/40 to-transparent lg:block" />

          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="group relative h-full rounded-sm border border-forest-deep/8 bg-white/60 p-7 transition-all duration-500 hover:border-gold-deep/30 hover:bg-white hover:shadow-[0_20px_50px_-24px_rgba(22,48,42,0.25)]">
                <div className="relative z-10 mb-6 flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-gold-deep/30 pulse-ring" />
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-forest-deep/15 bg-cream font-display text-sm font-bold text-forest-deep transition-colors group-hover:border-gold-deep/50 group-hover:bg-gold-light/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-forest-deep/10 to-transparent lg:hidden" />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-forest-deep">
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-forest/75">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
