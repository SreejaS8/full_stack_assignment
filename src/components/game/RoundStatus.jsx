import { memo } from 'react';

function RoundStatus({ lastRoundWinner, players, status }) {
  const message =
    status === 'roundResult' && lastRoundWinner
      ? `${players[lastRoundWinner]} wins the pull.`
      : status === 'roundResult'
        ? 'No correct answer this round.'
        : 'Both players can answer at the same time.';

  return (
    <div className="min-h-12 rounded-2xl bg-white/72 px-4 py-3 text-center text-sm font-black uppercase tracking-[0.08em] text-slate-700 shadow-sm ring-1 ring-white/80">
      {message}
    </div>
  );
}

export default memo(RoundStatus);
