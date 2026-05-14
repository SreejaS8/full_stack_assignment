import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    player1: { type: Number, required: true, min: 0 },
    player2: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const matchSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default mongoose.model('Match', matchSchema);
