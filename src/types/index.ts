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
  address: string;
  coordinates?: Coordinates;
}

export interface ContactInfo {
  email?: string;
  phoneNumber?: string;
}

export interface ReferencePrice {
  hasReferencePrice: boolean;
  referencePriceDescription?: string;
  referencePriceFileURL?: string;
}

export type PaymentMethod =
  | "LOCAL_CASH"
  | "OFFSHORE_CASH"
  | "WIRE"
  | "LETTER_OFF_CREDIT";

export interface ProductDetails {
  name?: string;
  url?: string;
  description?: string;
  serialNumber?: string;
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
}

// Quote Response
export interface QuoteResponse {
  id: number;
  type: "catalog" | "custom";
  catalogId?: number;
  productDetails?: ProductDetails;
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
