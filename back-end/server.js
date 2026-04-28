const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(logger); // Request logging
app.use(cors()); // CORS enabled
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/Auth Routes"));
app.use("/api/dns", require("./routes/DNS Routes"));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "DNS Management Server Running 🚀",
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

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});