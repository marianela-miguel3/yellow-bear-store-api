import { BaseModel } from "./baseModel";
import {
  CatalogQuoteResponse,
  QuotesResponse,
  PaginationInfo,
  CustomQuoteResponse,
  QuoteResponse,
  ContactInfo,
} from "../types";
import {
  validateCatalogQuote,
  validateCustomQuote,
  validateQuoteFilters,
  validateQuoteUpdate,
  CatalogQuoteInput,
  CustomQuoteInput,
  QuoteFiltersInput,
  QuoteUpdateInput,
} from "../validations/quoteValidations";
import { QUOTE_TYPES } from "../constants";

// TODO: Remove this after the database is implemented
const mockCatalogQuotes: CatalogQuoteResponse[] = [];
const mockCustomQuotes: CustomQuoteResponse[] = [];

export class QuoteModel extends BaseModel<QuoteResponse> {
  protected tableName = "quotes";

  // Create a catalog quote
  async createCatalogQuote(quoteData: unknown): Promise<CatalogQuoteResponse> {
    try {
      // Validate input data using Zod
      const validatedData = this.validateCatalogQuote(quoteData);

      // In a real implementation, you would:
      // 1. Insert the quote data into the database
      // 2. Return the created record with ID

      const newQuote: CatalogQuoteResponse = {
        id: Date.now(), // Simulate auto-generated ID
        type: QUOTE_TYPES.CATALOG,
        catalogId: validatedData.catalogId,
        hasReferencePrice: validatedData.hasReferencePrice,
        contactInfo: validatedData.contactInfo as ContactInfo,
        comments: validatedData.comments,
        createdAt: new Date().toISOString(),
        ...(validatedData.fullName && { fullName: validatedData.fullName }),
        ...(validatedData.companyName && {
          companyName: validatedData.companyName,
        }),
        ...(validatedData.cuilCuit && { cuilCuit: validatedData.cuilCuit }),
        ...(validatedData.address && { address: validatedData.address }),
        ...(validatedData.paymentMethod && {
          paymentMethod: validatedData.paymentMethod,
        }),
      };
      // TODO: Remove this after the database is implemented
      mockCatalogQuotes.push(newQuote);

      console.log("Catalog quote created:", newQuote);
      return newQuote;
    } catch (error) {
      console.error("Failed to create catalog quote:", error);
      throw error;
    }
  }

  // Create a custom quote
  async createCustomQuote(quoteData: unknown): Promise<CustomQuoteResponse> {
    try {
      // Validate input data using Zod
      const validatedData = this.validateCustomQuote(quoteData);

      // In a real implementation, you would:
      // 1. Insert the quote data into the database
      // 2. Return the created record with ID

      const newQuote: CustomQuoteResponse = {
        id: Date.now(), // Simulate auto-generated ID
        type: QUOTE_TYPES.CUSTOM,
        productDetails: validatedData.productDetails,
        hasReferencePrice: validatedData.hasReferencePrice,
        contactInfo: validatedData.contactInfo,
        comments: validatedData.comments,
        createdAt: new Date().toISOString(),
        ...(validatedData.fullName && { fullName: validatedData.fullName }),
        ...(validatedData.companyName && {
          companyName: validatedData.companyName,
        }),
        ...(validatedData.cuilCuit && { cuilCuit: validatedData.cuilCuit }),
        ...(validatedData.address && { address: validatedData.address }),
        ...(validatedData.referencePriceDescription && {
          referencePriceDescription: validatedData.referencePriceDescription,
        }),
        ...(validatedData.referencePriceFileURL && {
          referencePriceFileURL: validatedData.referencePriceFileURL,
        }),
        ...(validatedData.paymentMethod && {
          paymentMethod: validatedData.paymentMethod,
        }),
      };

      // TODO: Remove this after the database is implemented
      mockCustomQuotes.push(newQuote);

      console.log("Custom quote created:", newQuote);
      return newQuote;
    } catch (error) {
      console.error("Failed to create custom quote:", error);
      throw error;
    }
  }

  // Get quotes with filters and pagination
  async getQuotes(filters: unknown): Promise<QuotesResponse> {
    try {
      // Validate filters using Zod
      const validatedFilters = this.validateQuoteFilters(filters);

      // In a real implementation, you would:
      // 1. Build SQL query based on filters
      // 2. Execute query with pagination
      // 3. Return results with pagination info

      const pagination: PaginationInfo = {
        currentPage: validatedFilters.page,
        totalPages: 1,
        totalItems: mockCatalogQuotes.length,
        itemsPerPage: validatedFilters.limit,
      };

      return {
        quotes: mockCatalogQuotes,
        pagination,
      };
    } catch (error) {
      console.error("Failed to get quotes:", error);
      throw error;
    }
  }

  // Get quote by ID
  async getQuoteById(id: number): Promise<QuoteResponse | null> {
    try {
      // In a real implementation, you would:
      // 1. Query the database for the specific quote
      // 2. Return the quote or null if not found

      // For now, return mock data
      const quote = mockCatalogQuotes.find((quote) => quote.id === id);
      if (quote) {
        return quote;
      }

      const customQuote = mockCustomQuotes.find((quote) => quote.id === id);
      if (customQuote) {
        return customQuote;
      }

      return null;
    } catch (error) {
      console.error("Failed to get quote by ID:", error);
      throw new Error("Failed to get quote by ID");
    }
  }

  // Update catalog quote
  async updateCatalogQuote(
    id: number,
    quoteData: unknown
  ): Promise<CatalogQuoteResponse | null> {
    try {
      // Validate update data using Zod
      const validatedData = this.validateQuoteUpdate(quoteData);

      // In a real implementation, you would:
      // 1. Check if the quote exists and is a catalog quote
      // 2. Update the quote in the database
      // 3. Return the updated quote or null if not found

      const existingQuote = await this.getQuoteById(id);
      if (!existingQuote || existingQuote.type !== QUOTE_TYPES.CATALOG) {
        return null;
      }

      const updatedQuote = {
        ...existingQuote,
        ...validatedData,
        updatedAt: new Date().toISOString(),
      } as CatalogQuoteResponse;

      // TODO: Remove this after the database is implemented
      mockCatalogQuotes[mockCatalogQuotes.indexOf(existingQuote)] =
        updatedQuote;

      console.log("Catalog quote updated:", updatedQuote);

      return updatedQuote;
    } catch (error) {
      console.error("Failed to update catalog quote:", error);
      throw error;
    }
  }

  // Update custom quote
  async updateCustomQuote(
    id: number,
    quoteData: unknown
  ): Promise<CustomQuoteResponse | null> {
    try {
      // Validate update data using Zod
      const validatedData = this.validateQuoteUpdate(quoteData);

      // In a real implementation, you would:
      // 1. Check if the quote exists and is a custom quote
      // 2. Update the quote in the database
      // 3. Return the updated quote or null if not found

      const existingQuote = await this.getQuoteById(id);
      if (!existingQuote || existingQuote.type !== QUOTE_TYPES.CUSTOM) {
        return null;
      }

      const updatedQuote = {
        ...existingQuote,
        ...validatedData,
        updatedAt: new Date().toISOString(),
      } as CustomQuoteResponse;

      // TODO: Remove this after the database is implemented
      mockCustomQuotes[mockCustomQuotes.indexOf(existingQuote)] = updatedQuote;

      console.log("Custom quote updated:", updatedQuote);
      return updatedQuote;
    } catch (error) {
      console.error("Failed to update custom quote:", error);
      throw error;
    }
  }

  // Delete quote
  async deleteQuote(id: number): Promise<boolean> {
    try {
      // In a real implementation, you would:
      // 1. Delete the quote from the database
      // 2. Return true if successful, false if not found

      const existingQuote = await this.getQuoteById(id);
      if (!existingQuote) {
        return false;
      }

      // TODO: Remove this after the database is implemented
      if (existingQuote.type === QUOTE_TYPES.CATALOG) {
        mockCatalogQuotes.splice(mockCatalogQuotes.indexOf(existingQuote), 1);
      } else {
        mockCustomQuotes.splice(mockCustomQuotes.indexOf(existingQuote), 1);
      }

      console.log("Quote deleted:", id);
      return true;
    } catch (error) {
      console.error("Failed to delete quote:", error);
      throw new Error("Failed to delete quote");
    }
  }

  // Validation methods using Zod
  private validateCatalogQuote(quoteData: unknown): CatalogQuoteInput {
    try {
      return validateCatalogQuote(quoteData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Catalog quote validation failed: ${error.message}`);
      }
      throw new Error("Catalog quote validation failed");
    }
  }

  private validateCustomQuote(quoteData: unknown): CustomQuoteInput {
    try {
      return validateCustomQuote(quoteData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Custom quote validation failed: ${error.message}`);
      }
      throw new Error("Custom quote validation failed");
    }
  }

  private validateQuoteFilters(filters: unknown): QuoteFiltersInput {
    try {
      return validateQuoteFilters(filters);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Quote filters validation failed: ${error.message}`);
      }
      throw new Error("Quote filters validation failed");
    }
  }

  private validateQuoteUpdate(updateData: unknown): QuoteUpdateInput {
    try {
      return validateQuoteUpdate(updateData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Quote update validation failed: ${error.message}`);
      }
      throw new Error("Quote update validation failed");
    }
  }
}
