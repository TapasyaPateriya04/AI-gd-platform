import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  topic: String,
  time: String,
  aiCount: Number,
  realCount: Number,
  roomId: String,
});

export default mongoose.model('Session', sessionSchema);
