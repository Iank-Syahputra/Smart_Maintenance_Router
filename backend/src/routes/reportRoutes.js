import express from "express";

import {
  authenticate
} from "../middleware/authMiddleware.js";

import {
  requireAdmin
} from "../middleware/adminMiddleware.js";

import {
  createComment,
  updateComment,
  deleteComment
} from "../controllers/commentController.js";

import {
  upvoteReport,
  removeUpvote
} from "../controllers/upvoteController.js";

import {
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus,
  updateReportUrgency,
  searchReports,
  getTrendingReports
} from "../controllers/reportController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/*
  IMPORTANT:
  route khusus HARUS di atas "/:id"
*/

router.get(
  "/search",
  searchReports
);

router.get(
  "/trending",
  getTrendingReports
);

router.get(
  "/",
  getAllReports
);

router.get(
  "/:id",
  getReportById
);

router.post(
  "/",
  authenticate,
  upload.single("image"),
  createReport
);

router.post(
  "/:id/comments",
  authenticate,
  createComment
);
router.patch(
  "/comments/:id",
  authenticate,
  updateComment
);

router.delete(
  "/comments/:id",
  authenticate,
  deleteComment
);

router.post(
  "/:id/upvote",
  authenticate,
  upvoteReport
);

router.delete(
  "/:id/upvote",
  authenticate,
  removeUpvote
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