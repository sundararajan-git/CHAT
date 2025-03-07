import dotenv, { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import { app, server } from "./sockets/socket.js";
import userRoutes from "./routes/userRoutes.js";
import chatsRoutes from "./routes/chatRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

config();

const PORT = process.env.PORT || 8080;

const whiteList = ["http://localhost:5173"]

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/chat", chatsRoutes);


app.use(errorHandler)

server.listen(PORT, () => {
  connectDB();
  console.log("Server is running on " + PORT);
});

