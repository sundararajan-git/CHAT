import express from "express"
import { verifyToken } from "../MIDDLEWARE/validUser.js"
import { getUsers, getMessage, sendMessage } from "../CONTROLLERS/chatController.js"
const router = express.Router()


// GET REGISTERED USERS
router.get("/user", verifyToken, getUsers)

// GET USERS CHATS
router.get("/:id", verifyToken, getMessage)

// SEND CHATS
router.post("/send/:id", verifyToken, sendMessage)


export default router