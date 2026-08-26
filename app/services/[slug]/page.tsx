import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <section className="bg-forest-deep pb-20 pt-40 md:pb-28 md:pt-48">
        <div className="mx-auto max-w-wrap px-6 md:px-12">
          <Reveal>
            <Link
              href="/services"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sage/80 transition-colors hover:text-gold-light"
            >
              <ArrowLeft className="h-4 w-4" />
              All services
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="eyebrow !text-gold-light">Service</div>
            <h1 className="max-w-[700px] font-display text-[36px] font-bold leading-tight text-white sm:text-[48px] md:text-[56px]">
              {service.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[540px] text-[16px] font-light leading-relaxed text-sage/80">
              {service.description}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link href="/contact" className="btn-primary mt-10 inline-block">
              Request a quote
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-wrap px-6 md:px-12">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-forest-deep">
                Other services
              </h2>
              <Link
                href="/services"
                className="text-sm font-semibold text-gold-deep transition-colors hover:text-forest-deep"
              >
                View all →
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${s.slug}`}
                  className="block rounded-sm border border-forest-deep/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-tile"
                >
                  <h3 className="mb-2 font-display text-base font-semibold text-forest-deep">
                    {s.title}
                  </h3>
                  <p className="line-clamp-2 text-xs font-light text-forest/80">
                    {s.description}
                  </p>
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