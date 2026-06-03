import { Router } from "express";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/commentController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router({ mergeParams: true });

router.get("/", authenticate, getComments);
router.post("/", authenticate, createComment);
router.delete("/:commentId", authenticate, deleteComment);

export default router;
