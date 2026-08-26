"use client";

import Link from "next/link";
import Image from "next/image";
import { LOCAL_IMAGE_PROPS } from "@/lib/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SERVICES, SITE } from "@/lib/constants";
import { ChevronDown, Phone, ArrowUpRight } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const close = () => {
    setOpen(false);
    setServicesExpanded(false);
  };

  return (
    <div className="lg:hidden">
      <button
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="relative z-[110] flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
      >
        <span
          className={`block h-[1.5px] w-[22px] bg-white transition-transform duration-300 ${
            open ? "translate-y-[6.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[1.5px] w-[22px] bg-white transition-opacity duration-300 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-[1.5px] w-[22px] bg-white transition-transform duration-300 ${
            open ? "-translate-y-[6.5px] -rotate-45" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="glass-mobile fixed inset-0 z-[100] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 pb-4 pt-5">
              <Link href="/" onClick={close}>
                <Image
                  {...LOCAL_IMAGE_PROPS}
                  src="/logo.png"
                  alt="Rigid Landscaping"
                  width={160}
                  height={76}
                  className="h-9 w-auto brightness-0 invert"
                />
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-8">
              <nav className="flex flex-col gap-1 border-t border-white/10 pt-6">
                {NAV_LINKS.map((link) =>
                  link.href === "/services" ? (
                    <div key={link.href}>
                      <button
                        type="button"
                        onClick={() => setServicesExpanded((e) => !e)}
                        className="flex w-full items-center justify-between py-3.5 text-left text-lg font-medium text-white"
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 text-gold-light transition-transform duration-200 ${
                            servicesExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {servicesExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="mb-3 grid grid-cols-2 gap-2">
                              <Link
                                href="/projects/home-front-transformation"
                                onClick={close}
                                className="relative aspect-[4/5] overflow-hidden rounded-sm ring-1 ring-white/10"
                              >
                                <Image
                                  {...LOCAL_IMAGE_PROPS}
                                  src="/before-after-home.jpg"
                                  alt="Home transformation"
                                  fill
                                  className="object-cover object-top"
                                  sizes="40vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent" />
                                <span className="absolute bottom-2 left-2 text-[11px] font-semibold text-white">
                                  Home
                                </span>
                              </Link>
                              <Link
                                href="/projects/side-yard-transformation"
                                onClick={close}
                                className="relative aspect-[4/5] overflow-hidden rounded-sm ring-1 ring-white/10"
                              >
                                <Image
                                  {...LOCAL_IMAGE_PROPS}
                                  src="/before-after-yard.jpg"
                                  alt="Yard transformation"
                                  fill
                                  className="object-cover object-top"
                                  sizes="40vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent" />
                                <span className="absolute bottom-2 left-2 text-[11px] font-semibold text-white">
                                  Yard
                                </span>
                              </Link>
                            </div>
                            <ul className="mb-4 space-y-1 border-l border-gold-light/30 pl-4">
                              <li>
                                <Link
                                  href="/services"
                                  onClick={close}
                                  className="block py-1.5 text-sm font-semibold text-gold-light"
                                >
                                  All services →
                                </Link>
                              </li>
                              {SERVICES.map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={`/services/${s.slug}`}
                                    onClick={close}
                                    className="block py-1.5 text-sm font-light text-sage/80"
                                  >
                                    {s.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className="block py-3.5 text-lg font-medium text-white"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>

              <div className="mt-8 space-y-3">
                <Link
                  href="/contact"
                  onClick={close}
                  className="btn-primary flex w-full items-center justify-center gap-2 !py-3.5"
                >
                  Get a Quote
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  onClick={close}
                  className="flex w-full items-center justify-center gap-2 rounded-sm border border-white/15 py-3 text-sm font-medium text-white transition-colors hover:border-gold-light/40"
                >
                  <Phone className="h-4 w-4 text-gold-light" />
                  {SITE.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}