require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB, sequelize } = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

// ======================================
// MIDDLEWARE
// ======================================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ======================================
// BASIC ROUTES
// ======================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FitBuddy API is running 🚀"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FitBuddy backend is healthy",
    database: "MariaDB",
    timestamp: new Date().toISOString()
  });
});

// ======================================
// START SERVER
// ======================================

const startServer = async () => {
  try {
    await connectDB();

    await sequelize.sync();

    console.log("✅ Database tables synchronized");

    app.listen(PORT, () => {
      console.log("");
      console.log("=================================");
      console.log("       FITBUDDY BACKEND 🚀");
      console.log("=================================");
      console.log(`Server: http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/api/health`);
      console.log("Database: MariaDB");
      console.log("=================================");
      console.log("");
    });
  } catch (error) {
    console.error("");
    console.error("❌ Failed to start FitBuddy backend");
    console.error(error.message);
    console.error("");

    process.exit(1);
  }
};

startServer();