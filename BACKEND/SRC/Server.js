import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "../SRC/ROUTES/userRoutes.js";
import { connectDB } from "./DB/connectDB.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

//  MIDDLEWEARES
const corsOptions = {
  origin: "http://localhost:5173",
  Credential: true,
  optionsSuccessStatus: 200,
};

// ALLOWED ORIGINS
app.use(cors(corsOptions));

// ALLOW THE JSON DATA
app.use(express.json());

// ENABLE COOKIES PARSING
app.use(cookieParser());

// USER ROUTES
app.use('api/users', userRoutes);

//  CHATS ROUTES
// app.use("api/chat", () => {});

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on " + PORT);
});
