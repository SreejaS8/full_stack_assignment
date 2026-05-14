export function getFinalWinner(scores, players) {
  if (scores.player1 === scores.player2) {
    return { id: 'draw', name: 'Draw Match' };
  }

  const id = scores.player1 > scores.player2 ? 'player1' : 'player2';
  return { id, name: players[id] };
}

export function getRopeOffset(scores, totalRounds) {
  const diff = scores.player2 - scores.player1;
  const maxOffset = 150;
  const normalized = Math.max(-1, Math.min(1, diff / Math.max(totalRounds, 1)));
  return normalized * maxOffset;
}

export function getPlayerAccuracy(history, playerId) {
  const answered = history.filter((round) => round.submissions[playerId]);
  if (!answered.length) return 0;
  const correct = answered.filter((round) => round.winner === playerId).length;
  return Math.round((correct / answered.length) * 100);
}
