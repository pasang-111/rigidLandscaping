import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  projectType: z.string().trim().min(1, "Select a project type"),
  budget: z.string().trim().min(1, "Select a budget range"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Photo uploads are handled client-side via a signed upload to S3/Cloudinary;
  // this field carries the resulting URLs, not raw files (see README).
  photoUrls: z.array(z.string().url()).max(10).optional(),
  // Honeypot field — real users never fill this in.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const PROJECT_TYPES = [
  "Landscape Design",
  "Hardscape & Construction",
  "Planting & Softscape",
  "Irrigation & Lighting",
  "Pool Landscaping",
  "Maintenance",
  "Other",
];

export const BUDGET_RANGES = [
  "Under $25,000",
  "$25,000 – $75,000",
  "$75,000 – $150,000",
  "$150,000+",
  "Not sure yet",
];
