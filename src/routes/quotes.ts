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

const router = Router();

// POST /api/quotes/catalog - Create a catalog quote
router.post("/catalog", createCatalogQuote);

// POST /api/quotes/custom - Create a custom quote
router.post("/custom", createCustomQuote);

// GET /api/quotes - Get all quotes with filters and pagination
router.get("/", getQuotes);

// GET /api/quotes/:id - Get quote by ID
router.get("/:id", getQuoteById);

// PUT /api/quotes/catalog/:id - Update catalog quote
router.put("/catalog/:id", updateCatalogQuote);

// PUT /api/quotes/custom/:id - Update custom quote
router.put("/custom/:id", updateCustomQuote);

// DELETE /api/quotes/:id - Delete quote
router.delete("/:id", deleteQuote);

export default router;
