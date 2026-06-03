import { Router } from "express";
import {
  createReport,
  getReports,
  getReportById,
  deleteReport,
  updateReportStatus,
} from "../controllers/reportController.js";
import { authenticate, adminOnly } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", authenticate, getReports);
router.get("/:id", authenticate, getReportById);
router.post("/", authenticate, upload.single("image"), createReport);
router.delete("/:id", authenticate, deleteReport);
router.patch("/:id/status", authenticate, adminOnly, updateReportStatus);

export default router;
