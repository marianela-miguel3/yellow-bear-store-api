import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import routes from "./routes/index";
import errorHandler from "./middleware/errorHandler";
import notFoundHandler from "./middleware/notFoundHandler";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env["PORT"] || "3005", 10);
const NODE_ENV: string = process.env["NODE_ENV"] || "development";

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin:
      NODE_ENV === "production"
        ? ["https://yourdomain.com"]
        : [`http://localhost:${PORT}`],
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// Compression middleware
app.use(compression());

// Logging middleware
if (NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API routes
app.use("/api", routes);

// 404 handler
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🌍 Hello World!`);
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
});

export default app;
