const express = require ("express")
const songRoutes  = require("./routes/song.routes")
const cors = require("cors");
const app = express()
app.use(cors())
app.use(express.json())



app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Moody-Player backend is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use(("/",songRoutes))














module.exports = app;