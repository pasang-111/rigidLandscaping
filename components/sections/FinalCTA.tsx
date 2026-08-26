"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";
import { ArrowUpRight, Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-forest-deep py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 section-grid-dark" />
      {/* Diagonal accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-light/[0.07] via-transparent to-transparent" />
      <div className="pointer-events-none absolute -right-20 top-0 h-full w-1/3 bg-gradient-to-l from-gold-deep/10 to-transparent" />

      <div className="relative mx-auto max-w-wrap px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="eyebrow !text-gold-light before:!bg-gold-light">
              Next step
            </div>
            <h2 className="max-w-[640px] font-display text-[34px] font-bold leading-[1.05] tracking-tight text-white sm:text-[44px] md:text-[56px]">
              Ready to transform
              <span className="block text-gradient-gold">your outdoor space?</span>
            </h2>
            <p className="mt-6 max-w-[420px] text-[15px] font-light leading-relaxed text-sage/70">
              Book a site walkthrough. We assess the property, discuss goals,
              and deliver a clear scope — no surprises.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="rounded-sm border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
              <Link
                href="/contact"
                className="btn-primary mb-6 flex w-full items-center justify-center gap-2 !py-4"
              >
                Request a Consultation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center justify-center gap-3 border-t border-white/10 pt-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-light/25 bg-gold-light/10 text-gold-light">
                  <Phone className="h-4 w-4" strokeWidth={2} />
                </span>
                <div>
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-sage/50">
                    Call us
                  </span>
                  <a
                    href={`tel:${SITE.phoneHref}`}
                    className="font-display text-lg font-semibold text-white transition-colors hover:text-gold-light"
                  >
                    {SITE.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
