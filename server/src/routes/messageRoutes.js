import express from "express";
import { protectRoute } from "../middleware/middleware.js";
import {
  getUsersForSidebar,
  sendMessage,
  getMessages,
  deleteMessages,
} from "../controllers/messageCtrl.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);
router.delete("/delete", protectRoute, deleteMessages);

export default router;
