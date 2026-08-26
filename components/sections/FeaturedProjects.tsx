"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ImageLightbox, { type LightboxImage } from "@/components/ui/ImageLightbox";
import { FEATURED_PROJECTS } from "@/lib/constants";
import {BLUR_DATA_URL, LOCAL_IMAGE_PROPS} from "@/lib/image";

const sizeClasses: Record<string, string> = {
  tall: "sm:row-span-2 h-[340px] sm:h-full",
  normal: "h-[340px]",
  wide: "h-[340px] sm:col-span-2",
};

export default function FeaturedProjects() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const lightboxImages: LightboxImage[] = FEATURED_PROJECTS.map((p) => ({
    src: p.image,
    title: p.name,
    alt: `${p.name} — ${p.category}`,
  }));

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 section-grid opacity-40" />
      <div className="relative mx-auto max-w-wrap px-6 md:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-10">
          <Reveal>
            <div className="eyebrow">Projects</div>
            <h2 className="max-w-[560px] font-display text-[30px] font-bold leading-[1.05] tracking-tight sm:text-[40px] md:text-[48px]">
              Selected transformations.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[340px] text-[15px] font-light leading-relaxed text-forest">
              Real before-and-after projects from Rigid Landscaping — each
              finished with turf, fencing, garden beds, and outdoor living.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08} className={sizeClasses[project.size]}>
              <div className="group relative block h-full overflow-hidden rounded-sm bg-forest-deep">
                <button
                  type="button"
                  onClick={() => openAt(i)}
                  className="absolute inset-0 z-[1] cursor-zoom-in"
                  aria-label={`View ${project.name} fullscreen`}
                />
                <Image {...LOCAL_IMAGE_PROPS}
                  src={project.image}
                  alt={project.name}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-end bg-gradient-to-t from-forest-deep/95 via-forest-deep/10 to-transparent p-7">
                  <span className="mb-2 translate-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-light opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {project.category}
                  </span>
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="pointer-events-auto translate-y-2 font-display text-2xl font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:text-gold-light"
                  >
                    {project.name}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-11 text-right">
          <Link href="/projects" className="link-underline">
            View the full portfolio →
          </Link>
        </Reveal>
      </div>

      <ImageLightbox
        images={lightboxImages}
        index={index}
        open={open}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </section>
  );
}
