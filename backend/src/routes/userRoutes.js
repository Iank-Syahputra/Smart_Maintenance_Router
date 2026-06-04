import express from "express";

import { getAllUsers }
from "../controllers/userController.js";

import { authenticate }
from "../middleware/authMiddleware.js";

import { requireAdmin }
from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  requireAdmin,
  getAllUsers
);

export default router;