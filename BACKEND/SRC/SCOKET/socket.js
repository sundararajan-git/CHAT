import express from "express"
import { Server } from "socket.io"
import http from "http"

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})


// STORE THE ONLINE USERS 
const userSockets = {}

// GET RECIVER SOCKET ID
const getReciverSocketId = (userId) => {
    return userSockets[userId]
}


io.on("connnection", (socket) => {
    console.log("A user connected", socket.id)

    const userId = socket.handshake.query.userId

    if (userId) {
        userSockets[userId] = socket.id
    }

    io.emit("getOnlineUsers", Object.keys(userSockets))


    socket.on("disconnect", () => {
        console.log("A user is disconnected", socket.id)
        delete userSockets[userId]
        io.emit("getOnlineUsers", Object.keys(userSockets))
    })

})


export { io, app, server }