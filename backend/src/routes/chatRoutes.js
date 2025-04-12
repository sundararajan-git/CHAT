import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/validUser.js";
import {
  getUsers,
  getMessage,
  sendMessage,
} from "../controllers/chatController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/users", verifyToken, getUsers);

router.get("/:id", verifyToken, getMessage);

router.post("/send/:id", verifyToken, upload.single("file"), sendMessage);

export default router;
