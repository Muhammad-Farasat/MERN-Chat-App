import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

import express from 'express';
import path from 'path';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';
import connectToMongoDb from './db/connectToMongoDb.js';
import { app, server } from './socket/socket.js'; // Import app and server from socket.js

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/auth', authRoutes);
app.use('/message', messageRoutes);
app.use('/users', userRoutes);

// app.use(express.static(path.join(__dirname, '/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// Start Server
server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server is listening on port ${PORT}`);
});
