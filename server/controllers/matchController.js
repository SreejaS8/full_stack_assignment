import mongoose from 'mongoose';
import crypto from 'node:crypto';
import Match from '../models/Match.js';

function createMatchId(payload) {
  return crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}

export async function createMatch(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database connection is not available. Configure MONGODB_URI to persist matches.',
      });
    }

    const payload = {
      ...req.body,
      matchId: req.body.matchId || createMatchId(req.body),
    };

    const match = await Match.findOneAndUpdate(
      { matchId: payload.matchId },
      { $setOnInsert: payload },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
    );

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

    const matches = await Match.find().sort({ createdAt: -1 }).limit(25).lean();
    return res.json(matches);
  } catch (error) {
    return next(error);
  }
}
