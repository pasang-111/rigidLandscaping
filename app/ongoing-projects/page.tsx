import type { Metadata } from "next";
import OngoingProjects from "@/components/sections/OngoingProjects";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Ongoing Project",
  description:
    "Follow Rigid Landscaping’s active builds on TikTok — base work, walls, turf, and finishes in real time.",
};

export default function OngoingProjectsPage() {
  return (
    <>
      <section className="bg-cream pb-4 pt-40 md:pt-48">
        <div className="mx-auto max-w-wrap px-6 md:px-12">
          <div className="eyebrow">Campaign</div>
          <h1 className="max-w-[720px] font-display text-[36px] font-bold leading-tight text-forest-deep sm:text-[48px]">
            Ongoing projects — reels from the site.
          </h1>
          <p className="mt-4 max-w-[520px] text-[15px] font-light leading-relaxed text-forest">
            A social feed of work in progress. Built for homeowners who want to see
            the craft, not just the finished photo.
          </p>
        </div>
      </section>
      <OngoingProjects />
      <FinalCTA />
    </>
  );
}
