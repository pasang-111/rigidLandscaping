export const SITE = {
  name: "Rigid Landscaping",
  phone: "+61 433 815 287",
  phoneHref: "+61433815287",
  email: "rigidlandscaping@gmail.com",
  tagline: "Ground up, built right.",
  parentCompany: "Rey Corporate Group",
  parentUrl: "https://www.reycorp.com.au",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/ongoing-projects", label: "Reels" },
];

export const SERVICE_AREAS = [
  "Sydney",
  "North Shore",
  "Eastern Suburbs",
  "Inner West",
  "Northern Beaches",
  "Hills District",
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  image: string;
  size: "tall" | "wide" | "normal";
  location: string;
  timeline: string;
  year: string;
  summary: string;
  description: string[];
  materials: string[];
  gallery: string[];
  beforeImage: string;
  afterImage: string;
};

export const FEATURED_PROJECTS: Project[] = [
  {
    slug: "home-front-transformation",
    name: "Home Front Transformation",
    category: "Front Garden & Hardscape",
    image: "/before-after-home.jpg",
    size: "wide",
    location: "Sydney",
    timeline: "4 weeks",
    year: "2025",
    summary:
      "From bare construction site to a finished front — fencing, planting, and clean street appeal.",
    description: [
      "The front of the home was still in construction condition — exposed gravel, incomplete pathways, and no softscape. We completed the hardscape finishes, installed fencing and a gate, and planted low-maintenance garden beds with mulch.",
      "The result is a polished street presence: defined edges, healthy planting, and a finished look that matches the quality of the new build.",
    ],
    materials: ["Colorbond fencing & gate", "Edge & retaining blocks", "Garden beds & mulch", "Street-facing planting"],
    gallery: ["/before-after-home.jpg", "/after-collage.jpg", "/before-after-yard.jpg"],
    beforeImage: "/before-after-home.jpg",
    afterImage: "/before-after-home.jpg",
  },
  {
    slug: "side-yard-transformation",
    name: "Side Yard Transformation",
    category: "Yard Makeover",
    image: "/before-after-yard.jpg",
    size: "tall",
    location: "Sydney",
    timeline: "3 weeks",
    year: "2025",
    summary:
      "Overgrown side yard cleared and rebuilt with raised beds, turf, and a fire pit.",
    description: [
      "The side yard was choked with long grass and bare dirt. We cleared the space, installed timber raised garden beds with path lighting, laid turf, and added a fire pit for outdoor living.",
      "What was previously unused is now a functional, low-maintenance extension of the home.",
    ],
    materials: ["Timber raised beds", "Turf", "Path lighting", "Fire pit"],
    gallery: ["/before-after-yard.jpg", "/after-collage.jpg", "/before-after-home.jpg"],
    beforeImage: "/before-after-yard.jpg",
    afterImage: "/before-after-yard.jpg",
  },
  {
    slug: "lawn-establishment",
    name: "Lawn Establishment",
    category: "Turf & Levelling",
    image: "/after-collage.jpg",
    size: "normal",
    location: "Sydney",
    timeline: "2 weeks",
    year: "2025",
    summary:
      "Levelled and turfed lawns with clean driveway and path edges for a finished new-home look.",
    description: [
      "New-build sites often leave uneven grade and sparse coverage. We prepared the subgrade, levelled, and installed premium turf.",
      "Clean transitions to driveway, paths, and building edges complete the exterior.",
    ],
    materials: ["Premium turf", "Site levelling", "Edge finishing"],
    gallery: ["/after-collage.jpg", "/before-after-home.jpg"],
    beforeImage: "/after-collage.jpg",
    afterImage: "/after-collage.jpg",
  },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    slug: "levelling-turf",
    title: "Levelling & Turf Installation",
    description: "Level, prepare and lay premium turf for an even, healthy lawn.",
  },
  {
    slug: "garden-beds",
    title: "Garden Beds",
    description: "Built-up beds that keep plants healthy and borders clean.",
  },
  {
    slug: "retaining-walls",
    title: "Retaining Walls",
    description: "Solid walls that manage slopes and shape your yard.",
  },
  {
    slug: "fencing",
    title: "Fencing",
    description: "Sturdy fencing for privacy, security and clean lines.",
  },
  {
    slug: "garden-design",
    title: "Garden Design",
    description: "Custom layouts designed around your space and style.",
  },
  {
    slug: "walkways",
    title: "Front & Side Walkways",
    description: "Walkway designs that add flow and street appeal.",
  },
  {
    slug: "decks-pergolas",
    title: "Deck & Pergolas",
    description: "Timber structures built for outdoor living and shade.",
  },
  {
    slug: "concrete-steps",
    title: "Concrete Steps & Finish",
    description: "Steps and site finishes built solid and level.",
  },
];

export const PROCESS_STEPS = [
  {
    title: "Consult",
    description: "An on-site walkthrough to understand the property, goals, and constraints.",
  },
  {
    title: "Design",
    description: "Concept plans, materials, and a fixed scope — reviewed before anything is built.",
  },
  {
    title: "Build",
    description: "A dedicated crew executes the plan on schedule, with clear progress updates.",
  },
  {
    title: "Maintain",
    description: "Seasonal care to keep the design performing as intended.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "From overgrown side yard to a space we actually use. The raised beds, turf and fire pit completely changed how we live outside.",
    name: "Sydney Homeowner",
    location: "Sydney",
  },
  {
    quote:
      "They finished the front of our new build properly — fence, planting, edges. It finally looks like a completed home.",
    name: "Sydney Homeowner",
    location: "Sydney",
  },
  {
    quote:
      "Straightforward quotes, quality materials, and the work still looks solid months later. Exactly what we wanted.",
    name: "Sydney Homeowner",
    location: "Sydney",
  },
];

export const STATS = [
  { value: 16, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Full-Service" },
  { value: 100, suffix: "%", label: "Local & Reliable" },
];

export const SOCIAL = {
  tiktok: "https://www.tiktok.com/@rigid.landscaping",
  tiktokHandle: "@rigid.landscaping",
  facebook: "https://www.facebook.com/people/Rigid-Landscaping/61574919672049/",
};

export type OngoingShort = {
  id: string;
  tiktokId: string;
  title: string;
  caption: string;
  likes: string;
  comments: string;
};

export const ONGOING_SHORTS: OngoingShort[] = [
  {
    id: "1",
    tiktokId: "7671217155605564673",
    title: "Base prep done right",
    caption: "Solid groundwork before the first paver goes down. No shortcuts under the surface.",
    likes: "12.4K",
    comments: "89",
  },
  {
    id: "2",
    tiktokId: "7670087477193116944",
    title: "Retaining wall progress",
    caption: "Course by course with geogrid. Walls built to hold the slope, not just look good on day one.",
    likes: "8.7K",
    comments: "142",
  },
  {
    id: "3",
    tiktokId: "7667114722377911569",
    title: "Tree ring & grade",
    caption: "Clean retaining ring, proper backfill, and drainage that works. Built to last.",
    likes: "21.3K",
    comments: "310",
  },
  {
    id: "4",
    tiktokId: "7665647101669281032",
    title: "Paver path install",
    caption: "Level base, tight joints, edge restraint. The difference between a path that stays and one that shifts.",
    likes: "15.1K",
    comments: "97",
  },
];

export const HERO_SLIDES = [
  {
    image: "/hero-1.webp",
    focus: "object-[center_35%]",
    eyebrow: "Home Transformation",
    title: "Ground up,\nbuilt right.",
    description:
      "From bare site to finished street appeal — fencing, planting, and clean edges that complete the home.",
  },
  {
    image: "/hero-2.webp",
    focus: "object-[center_40%]",
    eyebrow: "Yard Transformation",
    title: "Unused space,\nreworked.",
    description:
      "Overgrown side yards become usable outdoor rooms — raised beds, turf, lighting, and a fire feature.",
  },
  {
    image: "/hero-3.webp",
    focus: "object-[center_45%]",
    eyebrow: "Turf & Levelling",
    title: "Lawns done\nproperly.",
    description:
      "Premium turf, level grade, and crisp edges to driveway and paths — finished the way a new build should be.",
  },
  {
    image: "/hero-4.webp",
    focus: "object-top",
    eyebrow: "Full Service",
    title: "Everything\nwe build.",
    description:
      "Turf, garden beds, retaining walls, fencing, decks, walkways, and concrete — one team, start to finish.",
  },
];

export const BROCHURES = [
  {
    slug: "ground-up-built-right",
    title: "Ground Up, Built Right",
    description: "Full-service overview — turf, walls, fencing, decks, walkways, and finishes.",
    image: "/brochure-services.jpg",
  },
  {
    slug: "did-you-know",
    title: "Did You Know?",
    description: "How plants, lighting, pathways, and water management create a complete outdoor environment.",
    image: "/brochure-didyouknow.jpg",
  },
  {
    slug: "home-transformation",
    title: "Home Transformation",
    description: "Before and after: construction site frontage to finished street appeal.",
    image: "/before-after-home.jpg",
  },
  {
    slug: "yard-transformation",
    title: "Yard Transformation",
    description: "Overgrown side yard transformed into turf, raised beds, and outdoor living.",
    image: "/before-after-yard.jpg",
  },
  {
    slug: "what-we-build",
    title: "What We Build",
    description: "Capability flyer — services and project types at a glance.",
    image: "/services-flyer.jpg",
  },
];
