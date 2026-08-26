"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { LOCAL_IMAGE_PROPS } from "@/lib/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxImage = {
  src: string;
  title?: string;
  alt?: string;
};

type Props = {
  images: LightboxImage[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function ImageLightbox({
  images,
  index,
  open,
  onClose,
  onIndexChange,
}: Props) {
  const current = images[index];
  const hasMultiple = images.length > 1;

  const prev = useCallback(() => {
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  const next = useCallback(() => {
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, prev, next]);

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex flex-col bg-forest-deep/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 md:px-8">
            <div className="min-w-0 flex-1">
              {current.title && (
                <p className="truncate font-display text-base font-semibold text-white md:text-lg">
                  {current.title}
                </p>
              )}
              {hasMultiple && (
                <p className="mt-0.5 text-xs font-medium text-sage/60">
                  {index + 1} / {images.length}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          {/* Image area */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 md:px-16">
            {hasMultiple && (
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-forest-deep/80 text-white transition-colors hover:bg-white/15 md:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <motion.div
              key={current.src + index}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative h-full w-full max-h-[calc(100vh-140px)] max-w-6xl"
            >
              <Image {...LOCAL_IMAGE_PROPS}
                src={current.src}
                alt={current.alt || current.title || "Gallery image"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {hasMultiple && (
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-forest-deep/80 text-white transition-colors hover:bg-white/15 md:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Thumbnail strip when multiple */}
          {hasMultiple && (
            <div className="flex shrink-0 justify-center gap-2 overflow-x-auto px-4 pb-5">
              {images.map((img, i) => (
                <button
                  key={img.src + i}
                  type="button"
                  onClick={() => onIndexChange(i)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-sm border-2 transition-all ${
                    i === index
                      ? "border-gold-light opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image {...LOCAL_IMAGE_PROPS}
                    src={img.src}
                    alt=""
                    fill
                  loading="lazy"
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
