import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import connectToMongoDb from './db/connectToMongoDb.js';
import cookieParser from 'cookie-parser';
import path from  'path'
import userRoutes from './routes/user.route.js'
import { app, server } from './socket/socket.js';
import cors from 'cors';


const PORT = process.env.PORT || 5000

dotenv.config();  


// app.get('/', (req, res) => {
//   res.send("Hello World...!")
// })

const __dirname = path.resolve()

app.use(
  cors({
    origin: 'https://mern-chat-app-three-omega.vercel.app', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // For cookies or auth headers
  })
);



app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/users", userRoutes)
app.get('/test', (req, res) => {
  res.send('Auth route is working!');
});



app.use(express.static(path.join(__dirname, "/dist")))
app.get("*", (req, res)=>{
  res.sendFile(path.join(__dirname,  "dist", "index.html"))
})

server.listen(PORT, ()=> {
  connectToMongoDb();
  console.log(`Port is listening on ${PORT}`)
})