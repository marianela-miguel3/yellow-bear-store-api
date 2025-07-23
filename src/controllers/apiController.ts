import { Request, Response } from "express";

export const getApiInfo = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json({
      message: "Welcome to Yellow Bear Store API",
      version: "1.0.0",
      endpoints: {
        health: "/api/health",
        health_ping: "/api/health/ping",
        quotes: "/api/quotes",
        quotes_catalog: "/api/quotes/catalog",
        quotes_custom: "/api/quotes/custom",
      },
      documentation: "See API.md for detailed documentation",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
