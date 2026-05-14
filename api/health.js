import mongoose from 'mongoose';
import connectDB from '../server/config/db.js';

export default async function handler(_req, res) {
  try {
    await connectDB();
    res.status(200).json({
      ok: true,
      mongoReadyState: mongoose.connection.readyState,
      dbName: mongoose.connection.name,
      hasMongoUri: Boolean(process.env.MONGODB_URI),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
      hasMongoUri: Boolean(process.env.MONGODB_URI),
    });
  }
}
