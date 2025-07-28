// Payment Method Constants
export const PAYMENT_METHODS = {
  LOCAL_CASH: "LOCAL_CASH",
  OFFSHORE_CASH: "OFFSHORE_CASH",
  WIRE: "WIRE",
  LETTER_OFF_CREDIT: "LETTER_OFF_CREDIT",
} as const;

// Quote Type Constants
export const QUOTE_TYPES = {
  CATALOG: "catalog",
  CUSTOM: "custom",
} as const;

// Quote Status Constants
export const QUOTE_STATUSES = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  COMPLETED: "completed",
} as const;

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_PAGE: 1,
  MIN_LIMIT: 1,
} as const;

// Validation Constants
export const VALIDATION = {
  MAX_FULL_NAME_LENGTH: 255,
  MAX_COMPANY_NAME_LENGTH: 255,
  MAX_COMMENTS_LENGTH: 1000,
  MAX_REFERENCE_PRICE_DESCRIPTION_LENGTH: 500,
  MAX_PRODUCT_NAME_LENGTH: 255,
  MAX_PRODUCT_DESCRIPTION_LENGTH: 1000,
  MAX_SERIAL_NUMBER_LENGTH: 100,
  MAX_URL_LENGTH: 500,
  MAX_ADDRESS_LENGTH: 500,
  MAX_PHONE_LENGTH: 50,
  MAX_EMAIL_LENGTH: 255,
  MIN_FULL_NAME_LENGTH: 1,
  MIN_COMMENTS_LENGTH: 1,
  MIN_PRODUCT_NAME_LENGTH: 1,
  MIN_PRODUCT_DESCRIPTION_LENGTH: 1,
  MIN_PHONE_LENGTH: 1,
} as const;

// Coordinate Constants
export const COORDINATES = {
  MIN_LATITUDE: -90,
  MAX_LATITUDE: 90,
  MIN_LONGITUDE: -180,
  MAX_LONGITUDE: 180,
} as const;

// CUIL/CUIT Format Constants
export const CUIL_CUIT = {
  FORMAT_REGEX: /^\d{2}-\d{8}-\d{1}$/,
  FORMAT_MESSAGE: "CUIL/CUIT must be in format XX-XXXXXXXX-X",
} as const;

// API Response Constants
export const API_RESPONSES = {
  SUCCESS: true,
  FAILURE: false,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED_FIELD: "Field is required",
    INVALID_EMAIL: "Invalid email format",
    INVALID_URL: "Invalid URL format",
    INVALID_CUIL_CUIT: CUIL_CUIT.FORMAT_MESSAGE,
    INVALID_COORDINATES: "Invalid coordinates",
    CONTACT_INFO_REQUIRED: "At least email or phone number must be provided",
    CATALOG_ID_REQUIRED: "Catalog ID is required",
    PRODUCT_DETAILS_REQUIRED: "Product details are required",
    COMMENTS_REQUIRED: "Comments are required",
    FULL_NAME_REQUIRED: "Full name is required",
    PRODUCT_NAME_REQUIRED: "Product name is required",
    PRODUCT_DESCRIPTION_REQUIRED: "Product description is required",
  },
  DATABASE: {
    CONNECTION_FAILED: "Database connection failed",
    QUERY_FAILED: "Database query failed",
    RECORD_NOT_FOUND: "Record not found",
    DUPLICATE_RECORD: "Duplicate record",
  },
  SERVER: {
    INTERNAL_ERROR: "Internal server error",
    NOT_FOUND: "Resource not found",
    BAD_REQUEST: "Bad request",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  QUOTE: {
    CREATED: "Quote created successfully",
    UPDATED: "Quote updated successfully",
    DELETED: "Quote deleted successfully",
    RETRIEVED: "Quote retrieved successfully",
    LIST_RETRIEVED: "Quotes retrieved successfully",
  },
  HEALTH: {
    OK: "Service is healthy",
    PONG: "pong",
  },
} as const;
