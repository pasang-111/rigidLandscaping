import HeroSlider from "@/components/sections/HeroSlider";
import TrustStrip from "@/components/sections/TrustStrip";
import ProjectCarousel from "@/components/sections/ProjectCarousel";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import Brochures from "@/components/sections/Brochures";
import OngoingProjects from "@/components/sections/OngoingProjects";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <TrustStrip />
      <ProjectCarousel />
      <Services />
      <Process />
      <BeforeAfterSlider />
      <Brochures />
      <OngoingProjects preview />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
