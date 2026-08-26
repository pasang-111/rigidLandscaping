import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

// ---------------------------------------------------------------------------
// Resend is intentionally disabled for now so Vercel deploys without
// RESEND_API_KEY / CONTACT_* env vars. The client form is static and does not
// call this route. When you're ready to send email:
//
//   1. Set RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL in Vercel
//   2. Uncomment the Resend block below
//   3. Point ContactForm back to fetch("/api/contact", ...)
// ---------------------------------------------------------------------------

// import { Resend } from "resend";
// import ContactEmail, { ContactAutoReplyEmail } from "@/emails/ContactEmail";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // Honeypot
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  // Static success — no email provider called.
  console.log("[contact] Static submit (Resend disabled):", {
    name: parsed.data.name,
    email: parsed.data.email,
    projectType: parsed.data.projectType,
  });

  return NextResponse.json({ ok: true, mode: "static" });

  /*
  // ---- Resend (enable when env vars are set) ----
  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!process.env.RESEND_API_KEY || !toEmail || !fromEmail) {
    return NextResponse.json(
      { error: "The contact form isn't configured yet." },
      { status: 500 }
    );
  }

  const { name, email, phone, address, projectType, budget, message, photoUrls } =
    parsed.data;

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `New enquiry — ${name}`,
    react: ContactEmail({
      name,
      email,
      phone,
      address,
      projectType,
      budget,
      message,
      photoUrls,
    }),
  });

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "We received your enquiry — Rigid Landscaping",
    react: ContactAutoReplyEmail({ name }),
  });

  return NextResponse.json({ ok: true });
  */
}
