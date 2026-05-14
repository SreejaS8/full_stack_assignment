export { ROUND_SECONDS } from '../constants/game.js';

export function buildMatchPayload(state, stats) {
  return {
    player1: state.players.player1,
    player2: state.players.player2,
    winner: state.winner.name,
    rounds: state.totalRounds,
    score: {
      player1: state.scores.player1,
      player2: state.scores.player2,
    },
    stats,
  };
}

export function formatSeconds(value) {
  if (value === null || Number.isNaN(value)) return 'N/A';
  return `${value.toFixed(2)}s`;
}
