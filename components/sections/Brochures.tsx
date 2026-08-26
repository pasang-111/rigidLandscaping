"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, Download } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ImageLightbox from "@/components/ui/ImageLightbox";
import {BLUR_DATA_URL, LOCAL_IMAGE_PROPS} from "@/lib/image";
import { BROCHURES } from "@/lib/constants";

export default function Brochures() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-forest-deep py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 section-grid-dark opacity-70" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-gold-light/5 blur-[100px]" />
      <div className="relative mx-auto max-w-wrap px-6 md:px-12">
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <div className="eyebrow mx-auto justify-center !text-gold-light before:!bg-gold-light">
            Brochures &amp; Guides
          </div>
          <h2 className="mb-5 font-display text-[28px] font-bold leading-tight text-white sm:text-[36px] md:text-[42px]">
            Everything we build.
          </h2>
          <p className="mx-auto max-w-[460px] text-base font-light leading-relaxed text-white/70">
            Browse our brochures below, or request the full portfolio —
            materials, finishes, and past work sent to your inbox.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BROCHURES.map((b, i) => (
            <Reveal key={b.slug} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block w-full overflow-hidden rounded-sm border border-white/10 bg-white/5 text-left transition-colors hover:border-gold-light/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
              >
                <div className="relative aspect-[4/5]">
                  <Image {...LOCAL_IMAGE_PROPS}
                    src={b.image}
                    alt={b.title}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                    <div>
                      <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-light">
                        <FileText className="h-3.5 w-3.5" strokeWidth={2.2} />
                        Brochure
                      </div>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {b.title}
                      </h3>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-light text-forest-deep transition-transform group-hover:scale-110">
                      <Download className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </div>
                </div>
              </button>
              <p className="mt-3 text-sm font-light leading-relaxed text-white/60">
                {b.description}
              </p>
            </Reveal>
          ))}

          {/* Request full portfolio card */}
          <Reveal delay={BROCHURES.length * 0.08}>
            <Link
              href="/contact"
              className="group flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 rounded-sm border border-dashed border-white/20 bg-white/[0.03] p-8 text-center transition-colors hover:border-gold-light/50 hover:bg-white/[0.06]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-light/40 text-gold-light transition-transform group-hover:scale-110">
                <Download className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="block">
                <span className="mb-2 block font-display text-lg font-semibold text-white">
                  Request the full portfolio
                </span>
                <span className="block text-sm font-light leading-relaxed text-white/60">
                  Get our complete project brochure emailed to you within one
                  business day.
                </span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-light">
                Contact us →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

      {openIndex !== null && (
        <ImageLightbox
          images={BROCHURES.map((b) => ({ src: b.image, title: b.title, alt: b.title }))}
          index={openIndex}
          open={openIndex !== null}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </section>
  );
}
