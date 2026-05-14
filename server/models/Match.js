import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    player1: { type: Number, required: true, min: 0 },
    player2: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const roundHistorySchema = new mongoose.Schema(
  {
    round: { type: Number, required: true, min: 1 },
    question: { type: String, required: true, trim: true },
    answer: { type: Number, required: true },
    winner: { type: String, default: null, trim: true },
    responseTime: { type: Number, default: null },
  },
  { _id: false },
);

const matchSchema = new mongoose.Schema(
  {
    matchId: { type: String, required: true, trim: true },
    player1: { type: String, required: true, trim: true },
    player2: { type: String, required: true, trim: true },
    winner: { type: String, required: true, trim: true },
    rounds: { type: Number, required: true, min: 1 },
    score: { type: scoreSchema, required: true },
    stats: {
      fastestResponder: String,
      fastestTime: Number,
      accuracy: {
        player1: Number,
        player2: Number,
      },
      completedRounds: Number,
    },
    roundHistory: { type: [roundHistorySchema], default: [] },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

matchSchema.index({ createdAt: -1 });
matchSchema.index({ matchId: 1 }, { unique: true, sparse: true });

export default mongoose.model('Match', matchSchema, 'history');
