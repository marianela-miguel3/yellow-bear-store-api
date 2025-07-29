import { z } from "zod";
import { PAYMENT_METHODS } from "../constants";

// Zod schemas for validation
export const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const addressSchema = z.object({
  address: z.string().optional(),
  coordinates: coordinatesSchema.optional(),
});

export const contactInfoSchema = z
  .object({
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message:
      "At least one contact method (email or phoneNumber) must be provided",
    path: ["contactInfo"],
  });

export const productDetailsSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  url: z.string().url().optional(),
  serialNumber: z.string().optional(),
});

export const paymentMethodSchema = z.enum([
  PAYMENT_METHODS.LOCAL_CASH,
  PAYMENT_METHODS.OFFSHORE_CASH,
  PAYMENT_METHODS.WIRE,
  PAYMENT_METHODS.LETTER_OFF_CREDIT,
]);

// Base quote schema for common fields
export const baseQuoteSchema = z.object({
  fullName: z.string().optional(),
  companyName: z.string().optional(),
  cuilCuit: z
    .string()
    .regex(/^\d{2}-\d{8}-\d{1}$/, "Invalid CUIL/CUIT format")
    .optional(),
  address: addressSchema.optional(),
  hasReferencePrice: z.boolean(),
  referencePriceDescription: z.string().optional(),
  referencePriceFileURL: z.string().url().optional(),
  paymentMethod: paymentMethodSchema.optional(),
  contactInfo: contactInfoSchema,
  comments: z.string().min(1, "Comments are required"),
});

// Catalog quote schema
export const catalogQuoteSchema = baseQuoteSchema.extend({
  catalogId: z.number().positive("Catalog ID must be a positive number"),
});

// Custom quote schema
export const customQuoteSchema = baseQuoteSchema.extend({
  productDetails: productDetailsSchema,
});

// Quote update schema (all fields optional)
export const quoteUpdateSchema = z.object({
  catalogId: z.number().positive().optional(),
  productDetails: productDetailsSchema.partial().optional(),
  fullName: z.string().optional(),
  companyName: z.string().optional(),
  cuilCuit: z
    .string()
    .regex(/^\d{2}-\d{8}-\d{1}$/)
    .optional(),
  address: addressSchema.optional(),
  hasReferencePrice: z.boolean().optional(),
  referencePriceDescription: z.string().optional(),
  referencePriceFileURL: z.string().url().optional(),
  paymentMethod: paymentMethodSchema.optional(),
  contactInfo: contactInfoSchema.optional(),
  comments: z.string().optional(),
});

// Quote filters schema
export const quoteFiltersSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().positive().optional()),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().positive().max(100).optional()),
  type: z.enum(["catalog", "custom"]).optional(),
  catalogId: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().positive().optional()),
  productId: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().positive().optional()),
  fullName: z.string().optional(),
  companyName: z.string().optional(),
  paymentMethod: paymentMethodSchema.optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

// ID parameter schema
export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
});
