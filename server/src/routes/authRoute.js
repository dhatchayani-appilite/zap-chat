import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/authentication.js";
import { protectRoute } from "../middleware/middleware.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

export default router;
