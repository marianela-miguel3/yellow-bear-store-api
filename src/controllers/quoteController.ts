import { Request, Response } from "express";
import { QuoteModel } from "../models/quoteModel";
import {
  CatalogQuote,
  CustomQuote,
  QuoteFilters,
  ApiResponse,
  CatalogQuoteResponse,
  CustomQuoteResponse,
  QuoteResponse,
  QuotesResponse,
} from "../types";
import { SUCCESS_MESSAGES } from "../constants";

export const createCatalogQuote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const quoteData: CatalogQuote = req.body;
    const quoteModel = new QuoteModel();

    const newQuote = await quoteModel.createCatalogQuote(quoteData);

    const response: ApiResponse<CatalogQuoteResponse> = {
      success: true,
      data: newQuote,
      message: SUCCESS_MESSAGES.QUOTE.CREATED,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating catalog quote:", error);

    const response: ApiResponse<null> = {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create catalog quote",
    };

    res.status(400).json(response);
  }
};

export const createCustomQuote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const quoteData: CustomQuote = req.body;
    const quoteModel = new QuoteModel();

    const newQuote = await quoteModel.createCustomQuote(quoteData);

    const response: ApiResponse<CustomQuoteResponse> = {
      success: true,
      data: newQuote,
      message: SUCCESS_MESSAGES.QUOTE.CREATED,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating custom quote:", error);

    const response: ApiResponse<null> = {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create custom quote",
    };

    res.status(400).json(response);
  }
};

export const getQuotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters: QuoteFilters = {
      page: parseInt(req.query["page"] as string) || 1,
      limit: parseInt(req.query["limit"] as string) || 10,
      ...(req.query["type"] && {
        type: req.query["type"] as "catalog" | "custom",
      }),
      ...(req.query["productId"] && {
        productId: parseInt(req.query["productId"] as string),
      }),
      ...(req.query["catalogId"] && {
        catalogId: parseInt(req.query["catalogId"] as string),
      }),
      ...(req.query["fullName"] && {
        fullName: req.query["fullName"] as string,
      }),
      ...(req.query["companyName"] && {
        companyName: req.query["companyName"] as string,
      }),
      ...(req.query["paymentMethod"] && {
        paymentMethod: req.query["paymentMethod"] as any,
      }),
      ...(req.query["dateFrom"] && {
        dateFrom: req.query["dateFrom"] as string,
      }),
      ...(req.query["dateTo"] && { dateTo: req.query["dateTo"] as string }),
    };

    const quoteModel = new QuoteModel();
    const result = await quoteModel.getQuotes(filters);

    const response: ApiResponse<QuotesResponse> = {
      success: true,
      data: result,
      message: SUCCESS_MESSAGES.QUOTE.LIST_RETRIEVED,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error getting quotes:", error);

    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get quotes",
    };

    res.status(500).json(response);
  }
};

export const getQuoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params["id"] || "");

    if (isNaN(id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Invalid quote ID",
      };
      res.status(400).json(response);
      return;
    }

    const quoteModel = new QuoteModel();
    const quote = await quoteModel.getQuoteById(id);

    if (!quote) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Quote not found",
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<QuoteResponse> = {
      success: true,
      data: quote,
      message: SUCCESS_MESSAGES.QUOTE.RETRIEVED,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error getting quote by ID:", error);

    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get quote",
    };

    res.status(500).json(response);
  }
};

export const updateCatalogQuote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params["id"] || "");

    if (isNaN(id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Invalid quote ID",
      };
      res.status(400).json(response);
      return;
    }

    const quoteData = req.body;
    const quoteModel = new QuoteModel();
    const updatedQuote = await quoteModel.updateCatalogQuote(id, quoteData);

    if (!updatedQuote) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Catalog quote not found",
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<CatalogQuoteResponse> = {
      success: true,
      data: updatedQuote,
      message: SUCCESS_MESSAGES.QUOTE.UPDATED,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating catalog quote:", error);

    const response: ApiResponse<null> = {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update catalog quote",
    };

    res.status(500).json(response);
  }
};

export const updateCustomQuote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params["id"] || "");

    if (isNaN(id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Invalid quote ID",
      };
      res.status(400).json(response);
      return;
    }

    const quoteData = req.body;
    const quoteModel = new QuoteModel();
    const updatedQuote = await quoteModel.updateCustomQuote(id, quoteData);

    if (!updatedQuote) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Custom quote not found",
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<CustomQuoteResponse> = {
      success: true,
      data: updatedQuote,
      message: SUCCESS_MESSAGES.QUOTE.UPDATED,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating custom quote:", error);

    const response: ApiResponse<null> = {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update custom quote",
    };

    res.status(500).json(response);
  }
};

export const deleteQuote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params["id"] || "");

    if (isNaN(id)) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Invalid quote ID",
      };
      res.status(400).json(response);
      return;
    }

    const quoteModel = new QuoteModel();
    const deleted = await quoteModel.deleteQuote(id);

    if (!deleted) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Quote not found",
      };
      res.status(404).json(response);
      return;
    }

    const response: ApiResponse<null> = {
      success: true,
      message: SUCCESS_MESSAGES.QUOTE.DELETED,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting quote:", error);

    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete quote",
    };

    res.status(500).json(response);
  }
};
