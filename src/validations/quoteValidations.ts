import { z } from "zod";
import {
  PAYMENT_METHODS,
  QUOTE_TYPES,
  VALIDATION,
  COORDINATES,
  CUIL_CUIT,
  ERROR_MESSAGES,
} from "../constants";

// Base schemas for reusable components
export const coordinatesSchema = z.object({
  lat: z.number().min(COORDINATES.MIN_LATITUDE).max(COORDINATES.MAX_LATITUDE),
  lng: z.number().min(COORDINATES.MIN_LONGITUDE).max(COORDINATES.MAX_LONGITUDE),
});

export const addressSchema = z.object({
  address: z
    .string()
    .min(VALIDATION.MIN_FULL_NAME_LENGTH, "Address is required"),
  coordinates: coordinatesSchema.optional(),
});

export const contactInfoSchema = z
  .object({
    email: z.string().email(ERROR_MESSAGES.VALIDATION.INVALID_EMAIL).optional(),
    phoneNumber: z
      .string()
      .min(VALIDATION.MIN_PHONE_LENGTH, "Phone number is required")
      .optional(),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: ERROR_MESSAGES.VALIDATION.CONTACT_INFO_REQUIRED,
    path: ["contactInfo"],
  });

export const productDetailsSchema = z.object({
  name: z
    .string()
    .min(
      VALIDATION.MIN_PRODUCT_NAME_LENGTH,
      ERROR_MESSAGES.VALIDATION.PRODUCT_NAME_REQUIRED
    ),
  description: z
    .string()
    .min(
      VALIDATION.MIN_PRODUCT_DESCRIPTION_LENGTH,
      ERROR_MESSAGES.VALIDATION.PRODUCT_DESCRIPTION_REQUIRED
    ),
  url: z.string().url(ERROR_MESSAGES.VALIDATION.INVALID_URL).optional(),
  serialNumber: z
    .string()
    .min(VALIDATION.MIN_FULL_NAME_LENGTH, "Serial number is required")
    .optional(),
});

export const paymentMethodSchema = z.enum([
  PAYMENT_METHODS.LOCAL_CASH,
  PAYMENT_METHODS.OFFSHORE_CASH,
  PAYMENT_METHODS.WIRE,
  PAYMENT_METHODS.LETTER_OFF_CREDIT,
]);

// Base quote schema with common fields
export const baseQuoteSchema = z.object({
  fullName: z
    .string()
    .min(
      VALIDATION.MIN_FULL_NAME_LENGTH,
      ERROR_MESSAGES.VALIDATION.FULL_NAME_REQUIRED
    )
    .max(VALIDATION.MAX_FULL_NAME_LENGTH, "Full name too long"),
  companyName: z
    .string()
    .max(VALIDATION.MAX_COMPANY_NAME_LENGTH, "Company name too long")
    .optional(),
  cuilCuit: z
    .string()
    .regex(CUIL_CUIT.FORMAT_REGEX, CUIL_CUIT.FORMAT_MESSAGE)
    .optional(),
  address: addressSchema.optional(),
  hasReferencePrice: z.boolean(),
  referencePriceDescription: z
    .string()
    .max(
      VALIDATION.MAX_REFERENCE_PRICE_DESCRIPTION_LENGTH,
      "Reference price description too long"
    )
    .optional(),
  referencePriceFileURL: z
    .string()
    .url(ERROR_MESSAGES.VALIDATION.INVALID_URL)
    .optional(),
  paymentMethod: paymentMethodSchema.optional(),
  contactInfo: contactInfoSchema,
  comments: z
    .string()
    .min(
      VALIDATION.MIN_COMMENTS_LENGTH,
      ERROR_MESSAGES.VALIDATION.COMMENTS_REQUIRED
    )
    .max(VALIDATION.MAX_COMMENTS_LENGTH, "Comments too long"),
});

// Catalog quote schema
export const catalogQuoteSchema = baseQuoteSchema.extend({
  catalogId: z.number().int().positive("Catalog ID must be a positive integer"),
});

// Custom quote schema
export const customQuoteSchema = baseQuoteSchema.extend({
  productDetails: productDetailsSchema,
});

// Quote filters schema
export const quoteFiltersSchema = z.object({
  page: z.number().int().min(1, "Page must be at least 1").default(1),
  limit: z
    .number()
    .int()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .default(10),
  type: z.enum([QUOTE_TYPES.CATALOG, QUOTE_TYPES.CUSTOM]).optional(),
  catalogId: z.number().int().positive().optional(),
  fullName: z.string().min(1).optional(),
  companyName: z.string().min(1).optional(),
  paymentMethod: paymentMethodSchema.optional(),
  dateFrom: z.string().datetime("Invalid date format").optional(),
  dateTo: z.string().datetime("Invalid date format").optional(),
});

// Quote update schema (all fields optional except id)
export const quoteUpdateSchema = z.object({
  fullName: z
    .string()
    .min(
      VALIDATION.MIN_FULL_NAME_LENGTH,
      ERROR_MESSAGES.VALIDATION.FULL_NAME_REQUIRED
    )
    .max(VALIDATION.MAX_FULL_NAME_LENGTH, "Full name too long")
    .optional(),
  companyName: z
    .string()
    .max(VALIDATION.MAX_COMPANY_NAME_LENGTH, "Company name too long")
    .optional(),
  cuilCuit: z
    .string()
    .regex(CUIL_CUIT.FORMAT_REGEX, CUIL_CUIT.FORMAT_MESSAGE)
    .optional(),
  address: addressSchema.optional(),
  hasReferencePrice: z.boolean().optional(),
  referencePriceDescription: z
    .string()
    .max(
      VALIDATION.MAX_REFERENCE_PRICE_DESCRIPTION_LENGTH,
      "Reference price description too long"
    )
    .optional(),
  referencePriceFileURL: z
    .string()
    .url(ERROR_MESSAGES.VALIDATION.INVALID_URL)
    .optional(),
  paymentMethod: paymentMethodSchema.optional(),
  contactInfo: contactInfoSchema.optional(),
  comments: z
    .string()
    .min(
      VALIDATION.MIN_COMMENTS_LENGTH,
      ERROR_MESSAGES.VALIDATION.COMMENTS_REQUIRED
    )
    .max(VALIDATION.MAX_COMMENTS_LENGTH, "Comments too long")
    .optional(),
  // For catalog quotes
  catalogId: z
    .number()
    .int()
    .positive("Catalog ID must be a positive integer")
    .optional(),
  // For custom quotes
  productDetails: productDetailsSchema.optional(),
});

// Type exports for use in other files
export type CatalogQuoteInput = z.infer<typeof catalogQuoteSchema>;
export type CustomQuoteInput = z.infer<typeof customQuoteSchema>;
export type QuoteFiltersInput = z.infer<typeof quoteFiltersSchema>;
export type QuoteUpdateInput = z.infer<typeof quoteUpdateSchema>;

// Validation functions
export const validateCatalogQuote = (data: unknown): CatalogQuoteInput => {
  return catalogQuoteSchema.parse(data);
};

export const validateCustomQuote = (data: unknown): CustomQuoteInput => {
  return customQuoteSchema.parse(data);
};

export const validateQuoteFilters = (data: unknown): QuoteFiltersInput => {
  return quoteFiltersSchema.parse(data);
};

export const validateQuoteUpdate = (data: unknown): QuoteUpdateInput => {
  return quoteUpdateSchema.parse(data);
};

// Safe validation functions (return validation result instead of throwing)
export const safeValidateCatalogQuote = (data: unknown) => {
  return catalogQuoteSchema.safeParse(data);
};

export const safeValidateCustomQuote = (data: unknown) => {
  return customQuoteSchema.safeParse(data);
};

export const safeValidateQuoteFilters = (data: unknown) => {
  return quoteFiltersSchema.safeParse(data);
};

export const safeValidateQuoteUpdate = (data: unknown) => {
  return quoteUpdateSchema.safeParse(data);
};
