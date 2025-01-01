import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Uncomment and configure this with your frontend's URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// STORE THE ONLINE USERS
const userSockets = {};

// GET RECEIVER SOCKET ID
const getReceiverSocketId = (userId) => {
  return userSockets[userId];
};

// Corrected event name
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Get userId from handshake query
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSockets[userId] = socket.id;
    console.log("User connected with ID:", userId);
  }

  // Emit the list of online users
  io.emit("getOnlineUsers", Object.keys(userSockets));

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // Find and remove the userId associated with the socket
    for (const id in userSockets) {
      if (userSockets[id] === socket.id) {
        delete userSockets[id];
        break;
      }
    }

    // Emit the updated list of online users
    io.emit("getOnlineUsers", Object.keys(userSockets));
  });
});

export { io, app, server };
