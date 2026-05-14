import { randomUUID } from 'node:crypto';
import Match from '../models/Match.js';

export async function createMatch(req, res, next) {
  try {
    const payload = {
      ...req.body,
      matchId: req.body.matchId || randomUUID(),
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
    const matches = await Match.find().sort({ createdAt: -1 }).limit(25).lean();
    return res.json(matches);
  } catch (error) {
    return next(error);
  }
}
