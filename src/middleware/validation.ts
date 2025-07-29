import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  catalogQuoteSchema,
  customQuoteSchema,
  quoteUpdateSchema,
  quoteFiltersSchema,
  idParamSchema,
} from "../schemas/quoteSchemas";

// Validation middleware factory
const createValidationMiddleware = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");

        res.status(400).json({
          success: false,
          error: `Validation failed: ${errorMessages}`,
        });
        return;
      }

      res.status(400).json({
        success: false,
        error: "Invalid request data",
      });
      return;
    }
  };
};

// Query validation middleware factory
const createQueryValidationMiddleware = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.query);
      req.query = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");

        res.status(400).json({
          success: false,
          error: `Query validation failed: ${errorMessages}`,
        });
        return;
      }

      res.status(400).json({
        success: false,
        error: "Invalid query parameters",
      });
      return;
    }
  };
};

// Params validation middleware factory
const createParamsValidationMiddleware = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.params);
      req.params = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");

        res.status(400).json({
          success: false,
          error: `Parameter validation failed: ${errorMessages}`,
        });
        return;
      }

      res.status(400).json({
        success: false,
        error: "Invalid parameters",
      });
      return;
    }
  };
};

// Export specific validation middlewares
export const validateCatalogQuote =
  createValidationMiddleware(catalogQuoteSchema);
export const validateCustomQuote =
  createValidationMiddleware(customQuoteSchema);
export const validateQuoteUpdate =
  createValidationMiddleware(quoteUpdateSchema);
export const validateQuoteFilters =
  createQueryValidationMiddleware(quoteFiltersSchema);
export const validateIdParam = createParamsValidationMiddleware(idParamSchema);
