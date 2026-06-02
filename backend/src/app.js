import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";
import axios from "axios";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { authenticate }
from "./middleware/authMiddleware.js";

import { requireAdmin }
from "./middleware/adminMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Smart Maintenance Router Backend Running"
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const totalUsers = await prisma.profile.count();

    res.json({
      success: true,
      message: "Database connected",
      totalUsers
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get("/test-ai", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      {
        text: "AC ruang kelas mati total dan ruangan sangat panas"
      }
    );

    res.json(response.data);

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get(
  "/admin-test",
  authenticate,
  requireAdmin,
  (req, res) => {

    res.json({
      success: true,
      message: "Admin middleware works"
    });

  }
);

app.use("/reports", reportRoutes);

app.use("/auth", authRoutes);

export default app;