import Image from "next/image";
import { LOCAL_IMAGE_PROPS } from "@/lib/image";
import Link from "next/link";
import { NAV_LINKS, SERVICE_AREAS, SITE, SOCIAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-forest-deep pb-9 pt-24 text-sage/80">
      <div className="mx-auto max-w-wrap px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-12">
          <div>
            <Image {...LOCAL_IMAGE_PROPS}
              src="/logo.png"
              loading="lazy"
              alt="Rigid Landscaping"
              width={220}
              height={104}
              className="mb-6 h-12 w-auto brightness-0 invert"
            />
            <p className="max-w-[280px] text-sm font-light leading-relaxed">
              Experts in landscaping. Creative design, precision construction, and
              lasting maintenance — transforming outdoor spaces into dream landscapes
              across Sydney.
            </p>
            <p className="mt-4 max-w-[280px] text-sm font-light leading-relaxed text-sage/60">
              Part of{" "}
              <a
                href={SITE.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold-light transition-colors hover:text-white"
              >
                {SITE.parentCompany}
              </a>
              {" "}
              —{" "}
              <a
                href={SITE.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/20 underline-offset-2 transition-colors hover:decoration-gold-light"
              >
                reycorp.com.au
              </a>
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-light">
              Site
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-light transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-sm font-light transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-light">
              Service Areas
            </h4>
            <ul className="space-y-3">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="text-sm font-light">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-light">
              Get in Touch
            </h4>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="mb-2 block font-display text-xl font-semibold text-white"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm font-light transition-colors hover:text-white"
            >
              {SITE.email}
            </a>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={SOCIAL.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-wide text-gold-light/90 transition-colors hover:text-white"
              >
                TikTok
              </a>
              <span className="text-white/20">·</span>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-wide text-gold-light/90 transition-colors hover:text-white"
              >
                Facebook
              </a>
            </div>
            <Link
              href="/contact"
              className="link-underline mt-5 inline-block !border-gold-light !text-gold-light"
            >
              Start a Project →
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-xs text-sage/50">
          <span>© {new Date().getFullYear()} Rigid Landscaping. All rights reserved.</span>
          <div className="flex items-center gap-4">
            {["Licensed", "Insured", "Experienced"].map((badge) => (
              <span
                key={badge}
                className="rounded-sm border border-white/10 px-3 py-1.5 text-[11px] tracking-wide"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
