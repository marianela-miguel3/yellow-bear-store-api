import { Router } from "express";
import {
  createCatalogQuote,
  createCustomQuote,
  getQuotes,
  getQuoteById,
  updateQuote,
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

// PUT /api/quotes/:id - Update quote
router.put("/:id", updateQuote);

// DELETE /api/quotes/:id - Delete quote
router.delete("/:id", deleteQuote);

export default router;
