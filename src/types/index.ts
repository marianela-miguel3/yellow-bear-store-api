export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  memory: {
    used: number;
    total: number;
  };
  services: {
    database: string;
    cache: string;
  };
}

// Quote Types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address?: string;
  coordinates?: Coordinates | undefined;
}

export interface ContactInfo {
  email?: string | undefined;
  phoneNumber?: string | undefined;
}

export interface ReferencePrice {
  hasReferencePrice: boolean;
  referencePriceDescription?: string;
  referencePriceFileURL?: string;
}

import { PAYMENT_METHODS } from "../constants";

export type PaymentMethod =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

export interface ProductDetails {
  name: string;
  description: string;
  url?: string | undefined;
  serialNumber?: string | undefined;
}

// Base Quote interface with common fields
export interface BaseQuote {
  id?: number;
  fullName?: string;
  companyName?: string;
  cuilCuit?: string;
  address?: Address;
  hasReferencePrice: boolean;
  referencePriceDescription?: string;
  referencePriceFileURL?: string;
  paymentMethod?: PaymentMethod;
  contactInfo: ContactInfo;
  comments: string;
  createdAt?: string;
  updatedAt?: string;
}

// Catalog Quote
export interface CatalogQuote extends BaseQuote {
  catalogId: number;
}

// Custom Quote
export interface CustomQuote extends BaseQuote {
  productDetails: ProductDetails;
  hasReferencePrice: boolean;
  referencePriceDescription?: string;
  referencePriceFileURL?: string;
}

// Catalog Quote Response
export interface CatalogQuoteResponse {
  id: number;
  type: "catalog";
  catalogId: number;
  fullName?: string;
  companyName?: string;
  cuilCuit?: string;
  address?: Address;
  hasReferencePrice: boolean;
  referencePriceDescription?: string;
  referencePriceFileURL?: string;
  paymentMethod?: PaymentMethod;
  contactInfo: ContactInfo;
  comments: string;
  createdAt: string;
  updatedAt?: string;
}

// Custom Quote Response
export interface CustomQuoteResponse {
  id: number;
  type: "custom";
  productDetails: ProductDetails;
  fullName?: string;
  companyName?: string;
  cuilCuit?: string;
  address?: Address;
  hasReferencePrice: boolean;
  referencePriceDescription?: string;
  referencePriceFileURL?: string;
  paymentMethod?: PaymentMethod;
  contactInfo: ContactInfo;
  comments: string;
  createdAt: string;
  updatedAt?: string;
}

// Union type for both quote responses
export type QuoteResponse = CatalogQuoteResponse | CustomQuoteResponse;

// Quote Filters
export interface QuoteFilters extends PaginationParams {
  type?: "catalog" | "custom";
  productId?: number;
  catalogId?: number;
  fullName?: string;
  companyName?: string;
  paymentMethod?: PaymentMethod;
  dateFrom?: string;
  dateTo?: string;
}

// Quote List Response
export interface QuotesResponse {
  quotes: QuoteResponse[];
  pagination: PaginationInfo;
}
