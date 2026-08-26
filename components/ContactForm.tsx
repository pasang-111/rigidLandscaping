"use client";

import { useState, FormEvent } from "react";
import { PROJECT_TYPES, BUDGET_RANGES } from "@/lib/validation";
import { SITE } from "@/lib/constants";

type Status = "idle" | "loading" | "success";

const inputClasses =
  "w-full rounded-sm border border-forest-deep/15 bg-white px-4 py-3 text-sm text-forest-deep placeholder:text-forest-deep/35 outline-none transition-colors focus:border-gold-deep";

const labelClasses = "mb-2 block text-[13px] font-medium text-forest-deep";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [photos, setPhotos] = useState<FileList | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    // Static form for now — no Resend / API call (avoids missing env vars on Vercel).
    // Re-enable /api/contact + Resend when CONTACT_* and RESEND_API_KEY are set.
    await new Promise((r) => setTimeout(r, 600));

    setStatus("success");
    e.currentTarget.reset();
    setPhotos(null);
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-gold-deep/40 bg-gold-light/10 p-8">
        <h3 className="mb-2 font-display text-xl font-semibold text-forest-deep">
          Request received.
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-forest">
          Thanks — a member of our team will follow up within one business day to
          schedule your site walkthrough.
        </p>
        <p className="text-sm font-light text-forest">
          Prefer to reach us directly?{" "}
          <a href={`tel:${SITE.phoneHref}`} className="font-medium text-gold-deep hover:underline">
            {SITE.phone}
          </a>{" "}
          ·{" "}
          <a href={`mailto:${SITE.email}`} className="font-medium text-gold-deep hover:underline">
            {SITE.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full name
          </label>
          <input id="name" name="name" required className={inputClasses} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={inputClasses}
            placeholder="+61 4XX XXX XXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClasses}
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label htmlFor="address" className={labelClasses}>
          Property address
        </label>
        <input id="address" name="address" className={inputClasses} placeholder="123 Ridgeview Dr" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className={labelClasses}>
            Project type
          </label>
          <select id="projectType" name="projectType" required className={inputClasses}>
            <option value="">Select one</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClasses}>
            Budget range
          </label>
          <select id="budget" name="budget" required className={inputClasses}>
            <option value="">Select one</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClasses}
          placeholder="Tell us about the space and what you have in mind."
        />
      </div>

      <div>
        <label htmlFor="photos" className={labelClasses}>
          Photos <span className="font-normal text-forest-deep/50">(optional)</span>
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setPhotos(e.target.files)}
          className="w-full text-sm text-forest-deep/70 file:mr-4 file:rounded-sm file:border-0 file:bg-forest-deep file:px-4 file:py-2.5 file:text-xs file:font-semibold file:text-white hover:file:bg-forest"
        />
        {photos && photos.length > 0 && (
          <p className="mt-1.5 text-xs text-forest-deep/50">
            {photos.length} file{photos.length > 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Request a Consultation"}
      </button>

      <p className="text-xs font-light text-forest-deep/50">
        We typically respond within one business day. Or call{" "}
        <a href={`tel:${SITE.phoneHref}`} className="underline">
          {SITE.phone}
        </a>
        .
      </p>
    </form>
  );
}
