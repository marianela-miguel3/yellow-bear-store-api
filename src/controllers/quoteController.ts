import { Request, Response } from "express";
import { QuoteModel } from "../models/quoteModel";
import {
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
    const quoteModel = new QuoteModel();

    const newQuote = await quoteModel.createCatalogQuote(req.body);

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
    const quoteModel = new QuoteModel();
    const newQuote = await quoteModel.createCustomQuote(req.body);

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
    const quoteModel = new QuoteModel();
    const result = await quoteModel.getQuotes(req.query);

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
    const quoteModel = new QuoteModel();
    const quote = await quoteModel.getQuoteById(
      req.params["id"] as unknown as number
    );

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
    const quoteModel = new QuoteModel();
    const updatedQuote = await quoteModel.updateCatalogQuote(
      req.params["id"] as unknown as number,
      req.body
    );

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
    const quoteModel = new QuoteModel();
    const updatedQuote = await quoteModel.updateCustomQuote(
      req.params["id"] as unknown as number,
      req.body
    );

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
    const quoteModel = new QuoteModel();
    const deleted = await quoteModel.deleteQuote(
      req.params["id"] as unknown as number
    );

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
