import { Router } from "express";
import { register, login, me, updateProfile, uploadAvatar } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { uploadAvatar as uploadAvatarMiddleware } from "../middleware/upload.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, me);
router.patch("/profile", authenticate, updateProfile);
router.post("/avatar", authenticate, uploadAvatarMiddleware.single("avatar"), uploadAvatar);

export default router;
