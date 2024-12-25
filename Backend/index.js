import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import connectToMongoDb from './db/connectToMongoDb.js';
import userRoutes from './routes/user.route.js'
import cors from 'cors';
import { app, server } from './socket/socket.js';


const PORT = process.env.PORT || '5000'

dotenv.config();  

app.use(cors({
  origin: 'https://chat-app-frontend-plum.vercel.app',
  methods: ["GET", "POST"]
}))

app.use(express.json());


app.use("/auth", authRoutes)
app.use("/message", messageRoutes)
app.use("/users", userRoutes)

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