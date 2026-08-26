import type { Metadata } from "next";
import Image from "next/image";
import { BLUR_DATA_URL, LOCAL_IMAGE_PROPS } from "@/lib/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FEATURED_PROJECTS } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import FinalCTA from "@/components/sections/FinalCTA";
import ProjectGallery from "@/components/sections/ProjectGallery";

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return FEATURED_PROJECTS.find((p) => p.slug === slug);
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = FEATURED_PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  const facts = [
    { label: "Location", value: project.location },
    { label: "Category", value: project.category },
    { label: "Timeline", value: project.timeline },
    { label: "Year", value: project.year },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[68vh] min-h-[460px] items-end overflow-hidden">
        <Image
          {...LOCAL_IMAGE_PROPS}
          src={project.image}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/25 to-forest-deep/60" />

        <div className="relative z-10 w-full px-6 pb-14 md:px-12 md:pb-16">
          <div className="mx-auto max-w-wrap">
            <Link
              href="/projects"
              className="mb-6 inline-flex items-center gap-2 text-[13px] font-medium text-white/80 transition-colors hover:text-gold-light"
            >
              ← Back to Projects
            </Link>
            <div className="eyebrow !text-gold-light before:!bg-gold-light">
              {project.category}
            </div>
            <h1 className="max-w-[820px] font-display text-[36px] font-bold leading-[1.02] text-white sm:text-[48px] md:text-[64px]">
              {project.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Facts + description */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-wrap grid-cols-1 gap-14 px-6 md:px-12 lg:grid-cols-[1fr_360px] lg:gap-20">
          <Reveal>
            <div className="eyebrow">The Project</div>
            <h2 className="mb-6 font-display text-[26px] font-bold leading-tight sm:text-[32px]">
              {project.summary}
            </h2>
            {project.description.map((paragraph, i) => (
              <p
                key={i}
                className="mb-5 max-w-[640px] text-base font-light leading-relaxed text-forest last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-sm border border-forest-deep/10 bg-white/60 p-8">
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Project Details
              </h3>
              <dl className="mb-8 space-y-5">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 border-b border-forest-deep/10 pb-3"
                  >
                    <dt className="text-sm font-light text-forest">{fact.label}</dt>
                    <dd className="text-right font-display text-sm font-semibold">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Materials &amp; Systems
              </h3>
              <ul className="space-y-2.5">
                {project.materials.map((material) => (
                  <li
                    key={material}
                    className="flex items-start gap-2.5 text-sm font-light leading-relaxed text-forest"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-deep" />
                    {material}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary mt-8 block text-center">
                Start a Similar Project
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream pb-20 md:pb-28">
        <div className="mx-auto max-w-wrap px-6 md:px-12">
          <Reveal>
            <div className="eyebrow">Gallery</div>
            <h2 className="mb-10 font-display text-[26px] font-bold leading-tight sm:text-[32px]">
              A closer look.
            </h2>
          </Reveal>
          <ProjectGallery images={project.gallery} projectName={project.name} />
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-sage/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-wrap grid-cols-1 items-center gap-14 px-6 md:px-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="eyebrow">Before &amp; After</div>
            <h2 className="mb-6 font-display text-[28px] font-bold leading-tight sm:text-[36px]">
              See the site the way we did.
            </h2>
            <p className="mb-8 max-w-[420px] text-base font-light leading-relaxed text-forest">
              Drag the divider to compare the original site condition on this
              project against the completed build.
            </p>
            <Link href="/contact" className="link-underline">
              Discuss a project like this →
            </Link>
          </Reveal>
          <BeforeAfterSlider
            bare
            beforeImage={project.beforeImage}
            afterImage={project.afterImage}
          />
        </div>
      </section>

      {/* Similar projects */}
      {related.length > 0 && (
        <section className="bg-cream py-20 md:py-28">
          <div className="mx-auto max-w-wrap px-6 md:px-12">
            <Reveal>
              <div className="eyebrow">More Work</div>
              <h2 className="mb-10 font-display text-[26px] font-bold leading-tight sm:text-[32px]">
                Similar projects.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-sm bg-forest-deep"
                  >
                    <Image
                      {...LOCAL_IMAGE_PROPS}
                      src={p.image}
                      alt={p.name}
                      fill
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent p-6">
                      <span className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-light">
                        {p.category}
                      </span>
                      <span className="font-display text-xl font-semibold text-white">
                        {p.name}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}