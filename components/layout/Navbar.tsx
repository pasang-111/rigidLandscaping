"use client";

import Link from "next/link";
import Image from "next/image";
import { LOCAL_IMAGE_PROPS } from "@/lib/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { NAV_LINKS, SERVICES, SITE } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import ConstructionBanner from "./ConstructionBanner";
import { ChevronDown, ArrowUpRight, Phone } from "lucide-react";

const MEGA_FEATURED = [
  {
    href: "/projects/home-front-transformation",
    image: "/before-after-home.jpg",
    label: "Home Transformation",
    caption: "Front garden & hardscape",
  },
  {
    href: "/projects/side-yard-transformation",
    image: "/before-after-yard.jpg",
    label: "Yard Transformation",
    caption: "Raised beds · turf · outdoor living",
  },
  {
    href: "/services",
    image: "/brochure-services.jpg",
    label: "What We Build",
    caption: "Full service brochure",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 280);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-[90]" suppressHydrationWarning>
      <ConstructionBanner />

      <div onMouseLeave={closeServices} onMouseEnter={cancelClose}>
        <div
          className={`relative transition-all duration-500 ${
            scrolled
              ? "glass-nav-scrolled py-2.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]"
              : "bg-gradient-to-b from-[#16302A]/80 to-transparent py-4"
          }`}
        >
          <div className="relative mx-auto grid max-w-wrap grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:grid-cols-[1fr_auto_1fr] md:px-10 lg:px-12">
            {/* Brand — white logo */}
            <div className="flex items-center justify-self-start">
              <Link href="/" className="group relative block h-10 w-auto sm:h-11">
                <Image
                  {...LOCAL_IMAGE_PROPS}
                  src="/logo.png"
                  alt="Rigid Landscaping"
                  width={160}
                  height={44}
                  className="h-10 w-auto object-contain object-left brightness-0 invert sm:h-11"
                  priority
                />
              </Link>
            </div>

            {/* Center nav */}
            <nav
              className={`hidden items-center justify-center lg:flex ${
                scrolled ? "" : "nav-center-pill rounded-full px-2 py-1.5"
              }`}
              aria-label="Primary"
            >
              <ul className="flex items-center gap-0.5">
                {NAV_LINKS.map((link) => {
                  if (link.href === "/services") {
                    return (
                      <li key={link.href} className="relative">
                        <button
                          type="button"
                          onMouseEnter={openServices}
                          onFocus={openServices}
                          className={`flex items-center gap-1 rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors ${
                            isActive("/services") || servicesOpen
                              ? "bg-white/10 text-gold-light"
                              : "text-white/75 hover:text-white"
                          }`}
                          aria-expanded={servicesOpen}
                        >
                          Services
                          <ChevronDown
                            className={`h-3 w-3 transition-transform duration-300 ${
                              servicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </li>
                    );
                  }
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onMouseEnter={() => {
                          if (servicesOpen) closeServices();
                        }}
                        className={`block rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors ${
                          isActive(link.href)
                            ? "bg-white/10 text-gold-light"
                            : "text-white/75 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right actions */}
            <div className="flex items-center justify-end gap-2 justify-self-end sm:gap-3">
              
                href={`tel:${SITE.phoneHref}`}
                className="hidden items-center justify-center rounded-full border border-white/15 bg-white/5 p-2.5 text-white/80 transition-all hover:border-gold-light/50 hover:text-gold-light sm:inline-flex"
                aria-label="Call us"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
              <Link
                href="/contact"
                className="hidden rounded-full bg-gold-light px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-forest-deep transition-all hover:bg-white sm:inline-flex"
              >
                Consult
              </Link>
              <div className="lg:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        <div
          ref={megaRef}
          className={`relative z-[95] overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
            servicesOpen
              ? "max-h-[560px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
          onMouseEnter={() => {
            cancelClose();
            setServicesOpen(true);
          }}
        >
          <div className="glass-mega border-t border-white/10 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.5)]">
            <div className="mx-auto grid max-w-wrap grid-cols-1 gap-8 px-6 py-8 md:grid-cols-12 md:px-12 md:py-10">
              <div className="md:col-span-4">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-light">
                  Services
                </p>
                <ul className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 md:grid-cols-1">
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="group flex items-center justify-between rounded-sm px-2 py-2.5 text-[13.5px] text-white/80 transition-colors hover:bg-white/8 hover:text-white"
                      >
                        {s.title}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-70" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-8">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-light">
                  Featured
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {MEGA_FEATURED.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setServicesOpen(false)}
                      className="group relative block overflow-hidden rounded-sm ring-1 ring-white/10 transition-all duration-300 hover:ring-gold-light/40"
                    >
                      <span className="relative block aspect-[4/5] overflow-hidden">
                        <Image
                          {...LOCAL_IMAGE_PROPS}
                          src={item.image}
                          alt={item.label}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 220px"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-[#16302A]/95 via-[#16302A]/30 to-transparent" />
                        <span className="absolute bottom-0 left-0 right-0 block p-3.5">
                          <span className="block text-[13px] font-semibold text-white">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[11px] font-light text-white/55">
                            {item.caption}
                          </span>
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="glass-mega-footer border-t border-white/10">
              <div className="mx-auto flex max-w-wrap flex-wrap items-center justify-between gap-4 px-6 py-3.5 md:px-12">
                <p className="text-[12.5px] font-light text-white/50">
                  Full-service landscaping across Sydney — ground up, built right.
                </p>
                <Link
                  href="/contact"
                  onClick={() => setServicesOpen(false)}
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-gold-light transition-colors hover:text-white"
                >
                  Request a free estimate
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-gold-light to-transparent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </header>
  );
}
