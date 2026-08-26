"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ImageLightbox, { type LightboxImage } from "@/components/ui/ImageLightbox";
import { SERVICES, BROCHURES } from "@/lib/constants";
import {BLUR_DATA_URL, IMAGE_QUALITY_CARD, LOCAL_IMAGE_PROPS} from "@/lib/image";
import {
  Layers,
  Building2,
  Sprout,
  Scissors,
  Lightbulb,
  Waves,
  Home,
  ArrowUpRight,
} from "lucide-react";

const ICONS = [Layers, Sprout, Building2, Scissors, Lightbulb, Waves, Home, Building2];

const LIGHTBOX_IMAGES: LightboxImage[] = BROCHURES.map((b) => ({
  src: b.image,
  title: b.title,
  alt: b.title,
}));

export default function Services() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openAt = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  return (
    <section id="services" className="relative overflow-hidden bg-forest-deep py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 section-grid-dark opacity-70" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-gold-light/5 blur-[120px]" />
      <div className="relative mx-auto max-w-wrap px-6 md:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-10">
          <Reveal>
            <h2 className="max-w-[560px] font-display text-[30px] font-bold leading-tight text-white sm:text-[40px] md:text-[48px]">
              Ground up, built right.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-[340px]">
              <p className="mb-5 text-[15px] font-light leading-relaxed text-sage/70">
                Full-service landscaping — from turf and garden design to retaining
                walls, decks and fencing, built to last.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold-light transition-colors hover:text-white"
              >
                View all services
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Brochure grid — original media only */}
        <Reveal delay={0.05}>
          <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BROCHURES.map((b, i) => (
              <button
                key={b.slug}
                type="button"
                onClick={() => openAt(i)}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
              >
                <Image {...LOCAL_IMAGE_PROPS}
                  src={b.image}
                  alt={b.title}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  quality={IMAGE_QUALITY_CARD}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-light">
                    {b.title}
                  </span>
                  <span className="mt-1 block text-[11px] text-white/70">
                    Click to enlarge
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={service.slug} delay={(i % 4) * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col bg-forest-deep p-7 transition-colors duration-300 hover:bg-forest/50"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <Icon className="h-9 w-9 text-gold-light" strokeWidth={1.4} />
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-light" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="flex-1 text-sm font-light leading-relaxed text-sage/65">
                    {service.description}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>

      <ImageLightbox
        images={LIGHTBOX_IMAGES}
        index={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
