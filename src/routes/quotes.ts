import { Router } from "express";
import {
  createCatalogQuote,
  createCustomQuote,
  getQuotes,
  getQuoteById,
  updateCatalogQuote,
  updateCustomQuote,
  deleteQuote,
} from "../controllers/quoteController";
import {
  validateCatalogQuote,
  validateCustomQuote,
  validateQuoteUpdate,
  validateQuoteFilters,
  validateIdParam,
} from "../middleware/validation";

const router = Router();

// POST /api/quotes/catalog - Create a catalog quote
router.post("/catalog", validateCatalogQuote, createCatalogQuote);

// POST /api/quotes/custom - Create a custom quote
router.post("/custom", validateCustomQuote, createCustomQuote);

// GET /api/quotes - Get all quotes with filters and pagination
router.get("/", validateQuoteFilters, getQuotes);

// GET /api/quotes/:id - Get quote by ID
router.get("/:id", validateIdParam, getQuoteById);

// PUT /api/quotes/catalog/:id - Update catalog quote
router.put(
  "/catalog/:id",
  validateIdParam,
  validateQuoteUpdate,
  updateCatalogQuote
);

// PUT /api/quotes/custom/:id - Update custom quote
router.put(
  "/custom/:id",
  validateIdParam,
  validateQuoteUpdate,
  updateCustomQuote
);

// DELETE /api/quotes/:id - Delete quote
router.delete("/:id", validateIdParam, deleteQuote);

export default router;
