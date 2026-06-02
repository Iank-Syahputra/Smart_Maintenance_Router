import express from "express";

import { authenticate } from "../middleware/authMiddleware.js";

import { requireAdmin } from "../middleware/adminMiddleware.js";

import { createComment } from "../controllers/commentController.js";
import { upvoteReport } from "../controllers/upvoteController.js";
import {
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus,
  updateReportUrgency
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/", getAllReports);

router.get("/:id", getReportById);

router.post(
  "/:id/comments",
  authenticate,
  createComment
);

router.post(
  "/:id/upvote",
  authenticate,
  upvoteReport
);

router.post(
  "/",
  authenticate,
  createReport
);

router.patch(
  "/:id/status",
  authenticate,
  requireAdmin,
  updateReportStatus
);

router.patch(
  "/:id/urgency",
  authenticate,
  requireAdmin,
  updateReportUrgency
);

export default router;