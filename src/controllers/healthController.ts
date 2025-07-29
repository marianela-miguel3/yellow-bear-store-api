import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getHealth = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      data: {
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env["NODE_ENV"] || "development",
        memory: process.memoryUsage(),
        services: {
          database: "OK",
          api: "OK",
        },
      },
      message: "Service is healthy",
    });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(503).json({
      success: false,
      data: {
        status: "ERROR",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env["NODE_ENV"] || "development",
        services: {
          database: "ERROR",
          api: "OK",
        },
      },
      message: "Service is unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getPing = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: {
        message: "pong",
        timestamp: new Date().toISOString(),
      },
      message: "Ping successful",
    });
  } catch (error) {
    console.error("Ping endpoint error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
