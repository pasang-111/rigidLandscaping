"use client";

import { useState } from "react";
import Image from "next/image";
import {BLUR_DATA_URL, LOCAL_IMAGE_PROPS} from "@/lib/image";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { BROCHURES } from "@/lib/constants";

export default function ServicesFlyer() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        className="group relative mb-14 block w-full overflow-hidden rounded-sm border border-forest-deep/10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
      >
        <div className="relative aspect-[4/5] sm:aspect-[16/9]">
          <Image {...LOCAL_IMAGE_PROPS}
            src="/brochure-services.jpg"
            alt="Ground Up, Built Right — Rigid Landscaping"
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
            sizes="100vw"
          />
          <span className="absolute bottom-4 right-4 rounded-sm bg-forest-deep/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-light backdrop-blur-sm">
            Click to enlarge
          </span>
        </div>
      </button>
      <ImageLightbox
        images={BROCHURES.map((b) => ({
          src: b.image,
          title: b.title,
          alt: b.title,
        }))}
        index={index}
        open={open}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  );
}
