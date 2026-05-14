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
    roundHistory: state.history.map((round) => ({
      round: round.round,
      question: round.question.prompt,
      answer: round.question.answer,
      winner: round.winner ? state.players[round.winner] : null,
      responseTime: round.responseTime,
    })),
  };
}

export function formatSeconds(value) {
  if (value === null || Number.isNaN(value)) return 'N/A';
  return `${value.toFixed(2)}s`;
}

export function formatMatchDate(value) {
  if (!value) return 'Recent';

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}
