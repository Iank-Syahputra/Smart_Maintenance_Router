import { Router } from "express";
import { toggleUpvote } from "../controllers/upvoteController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router({ mergeParams: true });

router.post("/", authenticate, toggleUpvote);

export default router;
