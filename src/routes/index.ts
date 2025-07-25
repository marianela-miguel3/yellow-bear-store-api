import { Router } from "express";
import healthRoutes from "./health";
import quotesRoutes from "./quotes";
import swaggerRoutes from "./swagger";
import { getApiInfo } from "../controllers/apiController";

const router = Router();

// Mount routes
router.use("/health", healthRoutes);
router.use("/quotes", quotesRoutes);
router.use("/docs", swaggerRoutes);

// API info endpoint
router.get("/", getApiInfo);

export default router;
