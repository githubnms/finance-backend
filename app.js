const express = require("express");
require("dotenv").config();

const app = express(); // FIRST create app

// THEN use middleware
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/records", recordRoutes);
app.use("/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});