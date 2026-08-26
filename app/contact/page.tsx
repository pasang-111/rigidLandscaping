import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a consultation with Rigid Landscaping.",
};

export default function ContactPage() {
  return (
    <section className="bg-cream pb-24 pt-40 md:pb-32 md:pt-48">
      <div className="mx-auto max-w-wrap px-6 md:px-12">
        <div className="mb-16 max-w-[600px]">
          <div className="eyebrow">Contact</div>
          <h1 className="mb-5 font-display text-[36px] font-bold leading-tight sm:text-[48px]">
            Request a consultation.
          </h1>
          <p className="text-base font-light leading-relaxed text-forest">
            Tell us about your property and what you have in mind. We typically respond
            within one business day to schedule an on-site walkthrough.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <ContactForm />

          <div className="space-y-10">
            <div>
              <h2 className="mb-3 font-display text-lg font-semibold">Call or email</h2>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="block font-display text-2xl font-semibold text-forest-deep"
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 block text-sm text-forest"
              >
                {SITE.email}
              </a>
            </div>

            <div>
              <h2 className="mb-3 font-display text-lg font-semibold">Office hours</h2>
              <p className="text-sm leading-relaxed text-forest">
                Monday – Friday, 7:00 AM – 5:00 PM<br />
                Saturday by appointment
              </p>
            </div>

            <div>
              <h2 className="mb-3 font-display text-lg font-semibold">Service area</h2>
              <p className="text-sm leading-relaxed text-forest">
                We work throughout the greater metro area, including Brookhaven,
                Ridgeview, Northgate, and the Old Mill District.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
