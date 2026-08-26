import type { Metadata } from "next";
import Image from "next/image";
import {BLUR_DATA_URL, LOCAL_IMAGE_PROPS} from "@/lib/image";
import Reveal from "@/components/ui/Reveal";
import ServicesFlyer from "@/components/sections/ServicesFlyer";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-service landscaping from turf and garden design to retaining walls, decks and fencing. Built to last across Sydney.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream pb-24 pt-40 md:pb-32 md:pt-48">
        <div className="mx-auto max-w-wrap px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <div className="eyebrow">About</div>
              <h1 className="mb-6 font-display text-[36px] font-bold leading-tight sm:text-[48px]">
                Ground up, built right.
              </h1>
              <p className="mb-5 text-base font-light leading-relaxed text-forest">
                Rigid Landscaping is a full-service team working the ground across Sydney
                and surrounds. From levelling and turf to retaining walls, fencing,
                decks and garden design — we build outdoor spaces that last.
              </p>
              <p className="mb-5 text-base font-light leading-relaxed text-forest">
                Every place is held by one team — from the first walk to the final
                finish. Solid groundwork, quality materials, and straightforward
                quotes with no surprises.
              </p>
              <p className="mb-5 text-base font-light leading-relaxed text-forest">
                Rigid Landscaping is part of{" "}
                <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-forest-deep underline decoration-gold-deep/50 underline-offset-2">
                  {SITE.parentCompany}
                </a>
                {" "}({SITE.parentUrl.replace("https://", "").replace("www.", "")}).
              </p>
              <p className="text-base font-light leading-relaxed text-forest">
                Call{" "}
                <a href={`tel:${SITE.phoneHref}`} className="font-medium text-forest-deep underline decoration-gold-deep/60 underline-offset-2">
                  {SITE.phone}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${SITE.email}`} className="font-medium text-forest-deep underline decoration-gold-deep/60 underline-offset-2">
                  {SITE.email}
                </a>
                .
              </p>
            </Reveal>
            <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image {...LOCAL_IMAGE_PROPS}
                src="/before-after-home.jpg"
                alt="Home transformation by Rigid Landscaping"
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream pb-20">
        <div className="mx-auto max-w-wrap px-6 md:px-12">
          <Reveal>
            <div className="eyebrow">Our Brochure</div>
            <h2 className="mb-8 max-w-[520px] font-display text-[28px] font-bold leading-tight sm:text-[36px]">
              What we build.
            </h2>
          </Reveal>
          <ServicesFlyer />
        </div>
      </section>

      <section className="bg-forest-deep py-24 md:py-28">
        <div className="mx-auto grid max-w-wrap grid-cols-1 gap-10 px-6 sm:grid-cols-3 md:px-12">
          {[
            { label: "Built to Last", detail: "Solid groundwork, quality materials." },
            { label: "Full-Service", detail: "Design through to build, one team." },
            { label: "Local & Reliable", detail: "Straightforward quotes, no surprises." },
          ].map((item) => (
            <Reveal key={item.label}>
              <h2 className="mb-2 font-display text-xl font-semibold text-white">
                {item.label}
              </h2>
              <p className="text-sm font-light text-sage/70">{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
