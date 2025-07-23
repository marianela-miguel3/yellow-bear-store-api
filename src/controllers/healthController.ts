import { Request, Response } from "express";
import { HealthResponse } from "../types";
import { HealthModel } from "../models/healthModel";

export const getHealth = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const healthModel = new HealthModel();

    // Check database connectivity
    const isDatabaseHealthy = await healthModel.healthCheck();

    const healthData: HealthResponse = {
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env["NODE_ENV"] || "development",
      version: "1.0.0",
      memory: {
        used:
          Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) /
          100,
        total:
          Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) /
          100,
      },
      services: {
        database: isDatabaseHealthy ? "OK" : "ERROR",
        cache: "OK", // You can add actual cache health checks here
      },
    };

    // Optionally save health check data to database
    try {
      await healthModel.saveHealthCheck({
        status: healthData.status,
        timestamp: healthData.timestamp,
        uptime: healthData.uptime,
        environment: healthData.environment,
        memoryUsage: healthData.memory,
        services: healthData.services,
      });
    } catch (saveError) {
      console.warn("Failed to save health check data:", saveError);
      // Don't fail the health check if saving fails
    }

    res.status(200).json(healthData);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getPing = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ status: "pong" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
