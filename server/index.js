import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import sessionRoutes from './routes/sessionRoutes.js';
import { getAIResponse } from './ai/aiBot.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/sessions', sessionRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running')))
  .catch(err => console.error(err));

  import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Vite default
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId, userName) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', { userName, socketId: socket.id });
  });

  socket.on('send-message', ({ roomId, message, sender }) => {
    socket.to(roomId).emit('receive-message', { sender, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => console.log('Socket + Express Server running'));
socket.on('send-message', async ({ roomId, message, sender }) => {
  socket.to(roomId).emit('receive-message', { sender, message });

  if (roomId.includes('AI')) { // simple check for testing
    const aiReply = await getAIResponse(message, "leadership in tech");
    io.to(roomId).emit('receive-message', { sender: 'AI Bot', message: aiReply });
  }
});
