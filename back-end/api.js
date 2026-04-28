/**
 * Vercel-compatible entry point for the API
 * This file makes the Express server work as a Vercel serverless function
 */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(logger);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/Auth Routes"));
app.use("/api/dns", require("./routes/DNS Routes"));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "DNS Management API Running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
});

// Global error handler
app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

// Export for Vercel
module.exports = app;
