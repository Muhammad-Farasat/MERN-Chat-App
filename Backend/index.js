import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import connectToMongoDb from './db/connectToMongoDb.js';
import cookieParser from 'cookie-parser';
import path from  'path'
import userRoutes from './routes/user.route.js'
import cors from 'cors';
import { app, server } from './socket/socket.js';


const PORT = process.env.PORT || 5000

dotenv.config();  



const allowedOrigins = [
  'http://localhost:3000', // Dev frontend
  'https://mern-chat-app-frontend-three.vercel.app', // Production frontend
];

const corsOptions = {
  origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
    },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());


app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/users", userRoutes)

app.get('/', (req, res) => {
  res.send("Hello World...!")
})

app.get('/test', (req, res) => {
  res.send("This is testing...!")
})


// app.use(express.static(path.join(__dirname, "/dist")))
// app.get("*", (req, res)=>{
//   res.sendFile(path.join(__dirname,  "dist", "index.html"))
// })

server.listen(PORT, ()=> {
  connectToMongoDb();
  console.log(`Port is listening on ${PORT}`)
})