"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ONGOING_SHORTS, SOCIAL } from "@/lib/constants";
import { ExternalLink, Play } from "lucide-react";

type Props = { preview?: boolean };

function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.8a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.27 8.27 0 0 0 4.84 1.56V6.86a4.85 4.85 0 0 1-1.08-.17z" />
    </svg>
  );
}

/** Reliable player: native TikTok player iframe, loads when visible */
function TikTokPlayer({ videoId, title }: { videoId: string; title: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playerSrc = `https://www.tiktok.com/embed/v2/${videoId}`;
  const fallback = `https://www.tiktok.com/@rigid.landscaping/video/${videoId}`;

  return (
    <div ref={wrapRef} className="relative aspect-[9/16] w-full overflow-hidden rounded-sm bg-forest-deep">
      {!show && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-cream/70">
          <Play className="h-10 w-10 text-gold-light" strokeWidth={1.5} />
          <span className="text-xs font-medium uppercase tracking-wider">Loading reel…</span>
        </div>
      )}
      {show && (
        <iframe
          src={playerSrc}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      <a
        href={fallback}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 z-20 rounded bg-black/50 px-2 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm hover:text-white"
      >
        Open on TikTok
      </a>
    </div>
  );
}

export default function OngoingProjects({ preview = false }: Props) {
  const shorts = preview ? ONGOING_SHORTS.slice(0, 3) : ONGOING_SHORTS;

  return (
    <section
      id="ongoing-projects"
      className={preview ? "bg-cream py-24 md:py-32" : "bg-cream py-16 md:py-24"}
    >
      <div className="mx-auto max-w-wrap px-6 md:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <div className="max-w-[560px]">
              <div className="eyebrow">Social · Behind the build</div>
              <h2 className="font-display text-[30px] font-bold leading-tight text-forest-deep sm:text-[40px] md:text-[48px]">
                {preview ? "Ongoing projects." : "Ongoing projects"}
              </h2>
              <p className="mt-4 text-[15px] font-light leading-relaxed text-forest">
                Short updates from active sites — base work, walls, turf, and finishes.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href={SOCIAL.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-sm border border-forest-deep/15 bg-white px-5 py-3.5 shadow-sm transition-all hover:border-gold-deep/40"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-deep text-gold-light">
                <TikTokIcon />
              </span>
              <span className="text-left">
                <span className="block text-xs font-semibold uppercase tracking-wide text-gold-deep">
                  Follow on TikTok
                </span>
                <span className="block text-sm font-medium text-forest-deep">
                  {SOCIAL.tiktokHandle}
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        <div
          className={
            preview
              ? "grid grid-cols-1 gap-6 sm:grid-cols-3"
              : "mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2"
          }
        >
          {shorts.map((short, i) => (
            <Reveal key={short.id} delay={i * 0.05}>
              <div className="overflow-hidden rounded-sm border border-forest-deep/10 bg-white shadow-sm">
                <TikTokPlayer videoId={short.tiktokId} title={short.title} />
                <div className="p-4">
                  <h3 className="font-display text-base font-semibold text-forest-deep">
                    {short.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm font-light text-forest/75">
                    {short.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {preview && (
          <div className="mt-10 text-center">
            <Link
              href="/ongoing-projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-forest-deep underline decoration-gold-deep/40 underline-offset-4 hover:decoration-gold-deep"
            >
              View all reels
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
