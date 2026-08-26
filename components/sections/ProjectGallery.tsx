"use client";

import { useState } from "react";
import Image from "next/image";
import {BLUR_DATA_URL, LOCAL_IMAGE_PROPS} from "@/lib/image";
import Reveal from "@/components/ui/Reveal";
import ImageLightbox, { type LightboxImage } from "@/components/ui/ImageLightbox";

type Props = {
  images: string[];
  projectName: string;
};

export default function ProjectGallery({ images, projectName }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const lightboxImages: LightboxImage[] = images.map((src, i) => ({
    src,
    title: `${projectName} — ${i + 1}`,
    alt: `${projectName} photo ${i + 1}`,
  }));

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {images.map((image, i) => (
          <Reveal
            key={image + i}
            delay={i * 0.08}
            className="relative aspect-[4/3] overflow-hidden rounded-sm"
          >
            <button
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="group relative block h-full w-full cursor-zoom-in"
              aria-label={`View ${projectName} photo ${i + 1}`}
            >
              <Image {...LOCAL_IMAGE_PROPS}
                src={image}
                alt={`${projectName} — photo ${i + 1}`}
                fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-forest-deep/0 transition-colors group-hover:bg-forest-deep/15" />
            </button>
          </Reveal>
        ))}
      </div>

      <ImageLightbox
        images={lightboxImages}
        index={index}
        open={open}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  );
}
