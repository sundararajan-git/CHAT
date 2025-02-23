import express from "express";
const router = express.Router();

import {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile,
  verifyEmail,
  isValidUser,
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/validUser.js";

// check if user valid or not
router.get("/isvaliduser", verifyToken, isValidUser);

// user register
router.post("/signup", signUp);

// user verification
router.post("/verify", verifyEmail);

//  user login
router.post("/login", login);

// user logout
router.post("/logout", logout);

// user profile update
router.put("/updateprofile", updateProfile);

// user password update
router.put("/resetpassword/:token", resetPassword);

//  user forgot password
router.post("/forgotpassword", forgotPassword);

export default router;
