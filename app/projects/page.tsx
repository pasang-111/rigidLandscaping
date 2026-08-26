import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_PROJECTS } from "@/lib/constants";
import {BLUR_DATA_URL, LOCAL_IMAGE_PROPS} from "@/lib/image";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected landscape design and construction projects by Rigid Landscaping.",
};

export default function ProjectsPage() {
  return (
    <section className="bg-cream pb-24 pt-40 md:pb-32 md:pt-48">
      <div className="mx-auto max-w-wrap px-6 md:px-12">
        <div className="mb-16 max-w-[640px]">
          <div className="eyebrow">Portfolio</div>
          <h1 className="font-display text-[36px] font-bold leading-tight sm:text-[48px]">
            Selected projects.
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-sm bg-forest-deep"
              >
                <Image {...LOCAL_IMAGE_PROPS}
                  src={project.image}
                  alt={project.name}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent p-6">
                  <span className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-light">
                    {project.category}
                  </span>
                  <span className="font-display text-xl font-semibold text-white">
                    {project.name}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
