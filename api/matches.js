import connectDB from '../server/config/db.js';
import Match from '../server/models/Match.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    await connectDB();
    const matches = await Match.find().sort({ createdAt: -1 }).limit(25).lean();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
