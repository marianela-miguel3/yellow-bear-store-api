import { BaseModel } from "./baseModel";
import {
  QuoteResponse,
  CatalogQuote,
  CustomQuote,
  QuoteFilters,
  QuotesResponse,
  PaginationInfo,
} from "../types";

export class QuoteModel extends BaseModel<QuoteResponse> {
  protected tableName = "quotes";

  // Create a catalog quote
  async createCatalogQuote(quoteData: CatalogQuote): Promise<QuoteResponse> {
    try {
      // Validate required fields
      this.validateCatalogQuote(quoteData);

      // In a real implementation, you would:
      // 1. Insert the quote data into the database
      // 2. Return the created record with ID

      const newQuote = {
        id: Date.now(), // Simulate auto-generated ID
        type: "catalog" as const,
        catalogId: quoteData.catalogId,
        hasReferencePrice: quoteData.hasReferencePrice,
        contactInfo: quoteData.contactInfo,
        comments: quoteData.comments,
        createdAt: new Date().toISOString(),
        ...(quoteData.fullName && { fullName: quoteData.fullName }),
        ...(quoteData.companyName && { companyName: quoteData.companyName }),
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
      } as QuoteResponse;

      console.log("Catalog quote created:", newQuote);
      return newQuote;
    } catch (error) {
      console.error("Failed to create catalog quote:", error);
      throw new Error("Failed to create catalog quote");
    }
  }

  // Create a custom quote
  async createCustomQuote(quoteData: CustomQuote): Promise<QuoteResponse> {
    try {
      // Validate required fields
      this.validateCustomQuote(quoteData);

      // In a real implementation, you would:
      // 1. Insert the quote data into the database
      // 2. Return the created record with ID

      const newQuote = {
        id: Date.now(), // Simulate auto-generated ID
        type: "custom" as const,
        productDetails: quoteData.productDetails,
        hasReferencePrice: quoteData.hasReferencePrice,
        contactInfo: quoteData.contactInfo,
        comments: quoteData.comments,
        createdAt: new Date().toISOString(),
        ...(quoteData.fullName && { fullName: quoteData.fullName }),
        ...(quoteData.companyName && { companyName: quoteData.companyName }),
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
      } as QuoteResponse;

      console.log("Custom quote created:", newQuote);
      return newQuote;
    } catch (error) {
      console.error("Failed to create custom quote:", error);
      throw new Error("Failed to create custom quote");
    }
  }

  // Get quotes with filters and pagination
  async getQuotes(filters: QuoteFilters): Promise<QuotesResponse> {
    try {
      // In a real implementation, you would:
      // 1. Build SQL query based on filters
      // 2. Execute query with pagination
      // 3. Return results with pagination info

      // For now, return mock data
      const mockQuotes: QuoteResponse[] = [
        {
          id: 1,
          type: "catalog",
          catalogId: 123,
          fullName: "John Doe",
          companyName: "Test Company",
          hasReferencePrice: false,
          contactInfo: { email: "john@example.com" },
          comments: "Test catalog quote",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          type: "custom",
          productDetails: { name: "Custom Product" },
          fullName: "Jane Smith",
          hasReferencePrice: true,
          referencePriceDescription: "Reference price description",
          contactInfo: { phoneNumber: "+1234567890" },
          comments: "Test custom quote",
          createdAt: new Date().toISOString(),
        },
      ];

      const pagination: PaginationInfo = {
        currentPage: filters.page || 1,
        totalPages: 1,
        totalItems: mockQuotes.length,
        itemsPerPage: filters.limit || 10,
      };

      return {
        quotes: mockQuotes,
        pagination,
      };
    } catch (error) {
      console.error("Failed to get quotes:", error);
      throw new Error("Failed to get quotes");
    }
  }

  // Get quote by ID
  async getQuoteById(id: number): Promise<QuoteResponse | null> {
    try {
      // In a real implementation, you would:
      // 1. Query the database for the specific quote
      // 2. Return the quote or null if not found

      // For now, return mock data
      if (id === 1) {
        return {
          id: 1,
          type: "catalog",
          catalogId: 123,
          fullName: "John Doe",
          companyName: "Test Company",
          hasReferencePrice: false,
          contactInfo: { email: "john@example.com" },
          comments: "Test catalog quote",
          createdAt: new Date().toISOString(),
        };
      }

      return null;
    } catch (error) {
      console.error("Failed to get quote by ID:", error);
      throw new Error("Failed to get quote by ID");
    }
  }

  // Update quote
  async updateQuote(
    id: number,
    quoteData: Partial<QuoteResponse>
  ): Promise<QuoteResponse | null> {
    try {
      // In a real implementation, you would:
      // 1. Update the quote in the database
      // 2. Return the updated quote or null if not found

      const existingQuote = await this.getQuoteById(id);
      if (!existingQuote) {
        return null;
      }

      const updatedQuote: QuoteResponse = {
        ...existingQuote,
        ...quoteData,
        updatedAt: new Date().toISOString(),
      };

      console.log("Quote updated:", updatedQuote);
      return updatedQuote;
    } catch (error) {
      console.error("Failed to update quote:", error);
      throw new Error("Failed to update quote");
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

      console.log("Quote deleted:", id);
      return true;
    } catch (error) {
      console.error("Failed to delete quote:", error);
      throw new Error("Failed to delete quote");
    }
  }

  // Validation methods
  private validateCatalogQuote(quoteData: CatalogQuote): void {
    if (!quoteData.catalogId) {
      throw new Error("catalogId is required");
    }
    this.validateBaseQuote(quoteData);
  }

  private validateCustomQuote(quoteData: CustomQuote): void {
    if (!quoteData.productDetails) {
      throw new Error("productDetails is required");
    }

    const { name, url, description, serialNumber } = quoteData.productDetails;
    if (!name && !url && !description && !serialNumber) {
      throw new Error("At least one product detail field must be provided");
    }

    this.validateBaseQuote(quoteData);
  }

  private validateBaseQuote(quoteData: CatalogQuote | CustomQuote): void {
    const { contactInfo } = quoteData;
    if (!contactInfo) {
      throw new Error("contactInfo is required");
    }

    if (!contactInfo.email && !contactInfo.phoneNumber) {
      throw new Error(
        "At least one contact method (email or phoneNumber) must be provided"
      );
    }

    if (!quoteData.comments) {
      throw new Error("comments is required");
    }
  }
}
