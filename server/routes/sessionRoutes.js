import express from 'express';
import Session from '../models/Session.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { topic, time, aiCount, realCount } = req.body;
  const roomId = Date.now().toString();
  const session = await Session.create({ topic, time, aiCount, realCount, roomId });
  res.json({ success: true, roomId });
});

router.get('/:roomId', async (req, res) => {
  const session = await Session.findOne({ roomId: req.params.roomId });
  res.json(session);
});

export default router;
