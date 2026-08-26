import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 pt-24 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
        404
      </p>
      <h1 className="mb-5 font-display text-3xl font-bold sm:text-4xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mb-8 max-w-sm text-sm font-light text-forest">
        The page you&apos;re looking for may have moved. Head back to the homepage or
        browse our projects.
      </p>
      <Link href="/" className="btn-primary !text-forest-deep">
        Back to Home
      </Link>
    </section>
  );
}
