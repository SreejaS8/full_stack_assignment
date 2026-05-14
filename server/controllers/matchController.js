import mongoose from 'mongoose';
import Match from '../models/Match.js';

export async function createMatch(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database connection is not available. Configure MONGODB_URI to persist matches.',
      });
    }

    const match = await Match.create(req.body);
    return res.status(201).json(match);
  } catch (error) {
    return next(error);
  }
}

export async function getMatches(_req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }

    const matches = await Match.find().sort({ createdAt: -1 }).limit(25);
    return res.json(matches);
  } catch (error) {
    return next(error);
  }
}
