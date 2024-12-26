import { Server } from "socket.io";
import http from 'http'
import express from "express";

const app = express()


const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: '*',
        methods: ['GET', 'POST']
    }
})

export const getReceiverId = (receiverId) =>{
    return userSocketMap[receiverId];
} 

const userSocketMap = {}

io.on("connection", (socket)=>{
    console.log("User connected", socket.id);

    const userId = socket.handshake.query.userId
    console.log("This is userId from backend", userId);
    if(userId != "undefined") {
        userSocketMap[userId] = socket.id
    }
    io.emit("OnlineUser" , Object.keys(userSocketMap))

    socket.on("disconnect", ()=>{
        console.log("User disconnected", socket.id);

        delete userSocketMap[userId]
        io.emit("OnlineUser" ,Object.keys(userSocketMap))


    })

})

export {app, io, server}