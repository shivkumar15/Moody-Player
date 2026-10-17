
const express = require("express");
const songRoutes = require("./routes/song.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Root route — fixes "Cannot GET /"
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Moody-Player API is running",
    health: "/health",
  });
});

// Health-check route for UptimeRobot
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Moody-Player backend is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Song API routes
app.use("/", songRoutes);

module.exports = app;
