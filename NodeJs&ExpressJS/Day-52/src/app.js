import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { logger } from "./middleware/logger.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Global Middleware

// Parse JSON request bodies
app.use(express.json());

// Custom logger
app.use(logger);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    environment: process.env.NODE_ENV
  });
});


// Routes
app.use(
  "/api/users",
  userRoutes
);

// 404 Handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

export default app;