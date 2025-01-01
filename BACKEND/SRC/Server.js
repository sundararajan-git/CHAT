import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./DB/connectDB.js";
import { app, server } from "./SCOKET/socket.js";

import userRoutes from "./ROUTES/userRoutes.js";
import chatsRoutes from "./ROUTES/chatRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

//  MIDDLEWEARES
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

// ALLOWED ORIGINS
app.use(cors(corsOptions));

// ALLOW THE JSON DATA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ENABLE COOKIES PARSING
app.use(cookieParser());

// USER ROUTES
app.use("/api/users", userRoutes);

// CHATS ROUTES
app.use("/api/chat", chatsRoutes);

server.listen(PORT, () => {
  connectDB();
  console.log("Server is running on " + PORT);
});



server.on("request", (req, res) => {
  console.log("Incoming request:", req.url);
});


server.on("upgrade", (req, socket, head) => {
  console.log("Upgrade request received");
});
