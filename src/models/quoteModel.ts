import { BaseModel } from "./baseModel";
import {
  CatalogQuoteResponse,
  QuotesResponse,
  PaginationInfo,
  CustomQuoteResponse,
  QuoteResponse,
  QuoteFilters,
  CatalogQuote,
  CustomQuote,
} from "../types";

import { PAGINATION, QUOTE_TYPES } from "../constants";

// TODO: Remove this after the database is implemented
const mockCatalogQuotes: CatalogQuoteResponse[] = [];
const mockCustomQuotes: CustomQuoteResponse[] = [];

export class QuoteModel extends BaseModel<QuoteResponse> {
  protected tableName = "quotes";

  // Get quotes with filters and pagination
  async getQuotes(filters: QuoteFilters): Promise<QuotesResponse> {
    try {
      // In a real implementation, you would:
      // 1. Build SQL query based on filters
      // 2. Execute query with pagination
      // 3. Return results with pagination info

      const pagination: PaginationInfo = {
        currentPage: filters.page || PAGINATION.DEFAULT_PAGE,
        totalPages: 1,
        totalItems: mockCatalogQuotes.length,
        itemsPerPage: filters.limit || PAGINATION.DEFAULT_LIMIT,
      };

      // TODO: Remove this after the database is implemented
      return {
        quotes: [...mockCatalogQuotes, ...mockCustomQuotes],
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

  // Create a catalog quote
  async createCatalogQuote(
    quoteData: CatalogQuote
  ): Promise<CatalogQuoteResponse> {
    try {
      // In a real implementation, you would:
      // 1. Insert the quote data into the database
      // 2. Return the created record with ID

      const newQuote: CatalogQuoteResponse = {
        id: Date.now(), // Simulate auto-generated ID
        type: QUOTE_TYPES.CATALOG,
        catalogId: quoteData.catalogId,
        hasReferencePrice: quoteData.hasReferencePrice,
        contactInfo: quoteData.contactInfo,
        comments: quoteData.comments,
        createdAt: new Date().toISOString(),
        ...(quoteData.fullName && { fullName: quoteData.fullName }),
        ...(quoteData.companyName && {
          companyName: quoteData.companyName,
        }),
        ...(quoteData.cuilCuit && { cuilCuit: quoteData.cuilCuit }),
        ...(quoteData.address && { address: quoteData.address }),
        ...(quoteData.paymentMethod && {
          paymentMethod: quoteData.paymentMethod,
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
  async createCustomQuote(
    quoteData: CustomQuote
  ): Promise<CustomQuoteResponse> {
    try {
      // In a real implementation, you would:
      // 1. Insert the quote data into the database
      // 2. Return the created record with ID

      const newQuote: CustomQuoteResponse = {
        id: Date.now(), // Simulate auto-generated ID
        type: QUOTE_TYPES.CUSTOM,
        productDetails: quoteData.productDetails,
        hasReferencePrice: quoteData.hasReferencePrice,
        contactInfo: quoteData.contactInfo,
        comments: quoteData.comments,
        createdAt: new Date().toISOString(),
        ...(quoteData.fullName && { fullName: quoteData.fullName }),
        ...(quoteData.companyName && {
          companyName: quoteData.companyName,
        }),
        ...(quoteData.cuilCuit && { cuilCuit: quoteData.cuilCuit }),
        ...(quoteData.address && { address: quoteData.address }),
        ...(quoteData.referencePriceDescription && {
          referencePriceDescription: quoteData.referencePriceDescription,
        }),
        ...(quoteData.referencePriceFileURL && {
          referencePriceFileURL: quoteData.referencePriceFileURL,
        }),
        ...(quoteData.paymentMethod && {
          paymentMethod: quoteData.paymentMethod,
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

  // Update catalog quote
  async updateCatalogQuote(
    id: number,
    quoteData: Partial<CatalogQuote>
  ): Promise<CatalogQuoteResponse | null> {
    try {
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
        ...quoteData,
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
    quoteData: Partial<CustomQuote>
  ): Promise<CustomQuoteResponse | null> {
    try {
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
        ...quoteData,
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
}
