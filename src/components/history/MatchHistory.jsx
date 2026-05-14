import { useEffect, useState } from 'react';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { getMatches } from '../../services/api.js';
import { formatMatchDate, formatSeconds } from '../../utils/gameHelpers.js';
import GlassPanel from '../ui/GlassPanel.jsx';

export default function MatchHistory() {
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;

    getMatches()
      .then((data) => {
        if (!active) return;
        setMatches(Array.isArray(data) ? data : []);
        setStatus('ready');
      })
      .catch(() => {
        if (!active) return;
        setStatus('offline');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <GlassPanel className="p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Class Record</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Recent Matches</h2>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-700/20">
          <FaClockRotateLeft />
        </div>
      </div>

      {status === 'loading' ? (
        <p className="rounded-2xl bg-white/64 px-4 py-4 text-sm font-bold text-slate-500 ring-1 ring-white/80">
          Loading match history...
        </p>
      ) : null}

      {status === 'offline' ? (
        <p className="rounded-2xl bg-white/64 px-4 py-4 text-sm font-bold text-slate-500 ring-1 ring-white/80">
          Match history will appear here when the API and MongoDB are running.
        </p>
      ) : null}

      {status === 'ready' && matches.length === 0 ? (
        <p className="rounded-2xl bg-white/64 px-4 py-4 text-sm font-bold text-slate-500 ring-1 ring-white/80">
          No saved matches yet. Finish a game to start the record.
        </p>
      ) : null}

      {matches.length > 0 ? (
        <div className="max-h-72 space-y-3 overflow-auto pr-1">
          {matches.map((match) => (
            <article
              key={match._id}
              className="rounded-2xl bg-white/72 p-4 shadow-sm ring-1 ring-white/90"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-950">
                    {match.player1} vs {match.player2}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    {formatMatchDate(match.createdAt)}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 px-3 py-2 text-center text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">Score</p>
                  <p className="text-lg font-black">
                    {match.score?.player1 ?? 0}-{match.score?.player2 ?? 0}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-xl bg-slate-100 px-3 py-2">Winner: {match.winner}</span>
                <span className="rounded-xl bg-amber-100 px-3 py-2">
                  Best: {formatSeconds(match.stats?.fastestTime ?? null)}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </GlassPanel>
  );
}
