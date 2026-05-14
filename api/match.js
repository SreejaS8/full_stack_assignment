import { randomUUID } from 'node:crypto';
import connectDB from '../server/config/db.js';
import Match from '../server/models/Match.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    await connectDB();

    const payload = {
      ...req.body,
      matchId: req.body?.matchId || randomUUID(),
    };

    const match = await Match.findOneAndUpdate(
      { matchId: payload.matchId },
      { $setOnInsert: payload },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
    );

    res.status(201).json(match);
  } catch (error) {
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
}
