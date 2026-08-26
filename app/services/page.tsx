import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import ServicesFlyer from "@/components/sections/ServicesFlyer";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Landscape design, hardscape construction, planting, irrigation, lighting, pool landscaping, and maintenance.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-cream pb-24 pt-40 md:pb-32 md:pt-48">
        <div className="mx-auto max-w-wrap px-6 md:px-12">
          <div className="mb-12 max-w-[640px]">
            <div className="eyebrow">Services</div>
            <h1 className="font-display text-[36px] font-bold leading-tight sm:text-[48px]">
              What we do.
            </h1>
            <p className="mt-4 max-w-[520px] text-[15px] font-light leading-relaxed text-forest">
              Full-service landscaping — from turf and garden design to retaining walls,
              decks and fencing, built to last.
            </p>
          </div>

          <ServicesFlyer />

          <div className="grid grid-cols-1 gap-px border border-forest-deep/10 bg-forest-deep/10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full bg-cream p-9 transition-colors hover:bg-sage/50"
                >
                  <h2 className="mb-3 font-display text-lg font-semibold">
                    {service.title}
                  </h2>
                  <p className="mb-5 text-sm font-light leading-relaxed text-forest">
                    {service.description}
                  </p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
                    Learn more →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
