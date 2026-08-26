# Rigid Landscaping — Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Resend.

## Stack

- **Framework:** Next.js 14, App Router, React Server Components by default
- **Styling:** Tailwind CSS with brand colors set up as theme tokens (`forest-deep`, `forest`, `sage`, `gold-light`, `gold-deep`, `cream`)
- **Fonts:** `next/font/google` (Space Grotesk for display, Inter for body) — self-hosted automatically, zero layout shift, no external font requests
- **Images:** `next/image` throughout — automatic AVIF/WebP, responsive `sizes`, lazy loading (hero uses `priority` to avoid delaying LCP)
- **Animation:** Framer Motion, scroll-triggered reveals, respects `prefers-reduced-motion`
- **Email:** Resend + `@react-email/components`, sent from a Route Handler (`app/api/contact/route.ts`)
- **Validation:** Zod, shared between client and server

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY etc.
npm run dev
```

Open http://localhost:3000.

## Environment variables

See `.env.example`. All four are required for the contact form to actually send
email in production — without them the API route returns a friendly error and
logs the missing configuration server-side (the form itself always renders and
validates correctly regardless).

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | From resend.com/api-keys |
| `CONTACT_TO_EMAIL` | Inbox that receives new submissions |
| `CONTACT_FROM_EMAIL` | Must be on a domain verified in Resend |
| `NEXT_PUBLIC_SITE_URL` | Used for metadata / canonical URLs |

## Photo uploads on the contact form

The form accepts photo attachments client-side, but large binary files are
never sent through the JSON API route or attached to the email directly
(that would blow past request-size limits and slow down delivery). To wire
uploads up for real:

1. Add a signed-upload endpoint (S3 presigned URL, or Cloudinary's unsigned
   upload preset) — a good place is `app/api/upload/route.ts`.
2. In `components/ContactForm.tsx`, upload each selected file to that
   endpoint before submitting the form, and collect the resulting URLs into
   the `photoUrls` array already wired into the payload and into
   `emails/ContactEmail.tsx`.

This keeps the contact form fast and avoids ever storing customer photos in
your email provider.

## Replacing placeholder content

- **Logo:** replace `public/logo.png` with your production logo (SVG
  recommended). The navbar and footer apply a CSS filter to render it in
  white — swap in a proper light-mode logo file instead if you have one, and
  remove the `brightness-0 invert` classes in `Navbar.tsx` / `Footer.tsx`.
- **Photography:** every image is currently a licensed Unsplash placeholder,
  referenced directly in `lib/constants.ts` and a few page files. Replace the
  URLs with your own project photography (upload to `/public/images` or a
  CDN) once available — `next/image` will optimize whatever you point it at.
- **Copy:** site-wide text lives in `lib/constants.ts`; page-specific copy is
  in each `app/**/page.tsx` file.
- **Individual project / service pages:** `FEATURED_PROJECTS` and `SERVICES`
  in `lib/constants.ts` already have `slug`s ready for detail pages at
  `app/projects/[slug]/page.tsx` and `app/services/[slug]/page.tsx` — these
  dynamic routes aren't built yet and are the natural next step.

## Deployment

Built for Vercel. Push to a Git repo, import into Vercel, add the environment
variables above in the project settings, and deploy — no additional
configuration required.

## Performance notes

- Fonts and the hero image are optimized/preloaded for a fast LCP.
- All non-hero images lazy-load by default via `next/image`.
- Tailwind's JIT compiler ships only the CSS actually used.
- Animations are GPU-friendly (`transform`/`opacity` only) and disabled for
  users with `prefers-reduced-motion` set.
