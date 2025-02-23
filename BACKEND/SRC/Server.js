import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import { app, server } from "./sockets/socket.js";
import userRoutes from "./routes/userRoutes.js";
import chatsRoutes from "./routes/chatRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

//  middlewares
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

// allowed origins
app.use(cors(corsOptions));

// allow json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable cookis parsing
app.use(cookieParser());

// user routes
app.use("/api/users", userRoutes);

// chat routes
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
