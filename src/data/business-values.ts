import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(1),
  postalCode: z.string().min(1),
  locality: z.string().min(1),
  country: z.string().min(1),
});

const openingHoursSchema = z.object({
  days: z.string().min(1),
  opens: z.string().regex(/^\d{2}:\d{2}$/),
  closes: z.string().regex(/^\d{2}:\d{2}$/),
});

const serviceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  currency: z.literal("EUR"),
});

export const businessValuesSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  heroHeadingLine1: z.string().min(1),
  heroHeadingLine2: z.string().min(1),
  intro: z.string().min(1),
  servicesIntro: z.string().min(1),
  phone: z.string().min(1),
  businessId: z.string().min(1),
  bookingLink: z.string(),
  notice: z.string(),
  address: addressSchema,
  openingHours: z.array(openingHoursSchema).min(1),
  services: z.array(serviceSchema).min(1),
});

export type BusinessValues = z.infer<typeof businessValuesSchema>;

export function parseBusinessValues(data: unknown): BusinessValues {
  const result = businessValuesSchema.safeParse(data);
  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid src/content/business.json: ${message}`);
  }
  return result.data;
}
