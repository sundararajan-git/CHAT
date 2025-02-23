import express from "express"
import { verifyToken } from "../middleware/validUser.js"
import { getUsers, getMessage, sendMessage } from "../controllers/chatController.js"
const router = express.Router()


// get registers user
router.get("/user", verifyToken, getUsers)

// get user chats
router.get("/:id", verifyToken, getMessage)

// send chats
router.post("/send/:id", verifyToken, sendMessage)


export default router