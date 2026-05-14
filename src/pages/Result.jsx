import { useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { FaArrowRotateLeft, FaChartSimple, FaTrophy } from 'react-icons/fa6';
import PageTransition from '../components/animations/PageTransition.jsx';
import Button from '../components/ui/Button.jsx';
import GlassPanel from '../components/ui/GlassPanel.jsx';
import StatCard from '../components/ui/StatCard.jsx';
import { useGame } from '../context/GameContext.jsx';
import { saveMatch } from '../services/api.js';
import { buildMatchPayload, formatSeconds } from '../utils/gameHelpers.js';

export default function Result() {
  const navigate = useNavigate();
  const game = useGame();
  const hasSavedMatch = useRef(false);
  const matchId = useRef(crypto.randomUUID());

  useEffect(() => {
    if (!game.winner) {
      navigate('/');
    }
  }, [game.winner, navigate]);

  useEffect(() => {
    if (!game.winner || hasSavedMatch.current) return undefined;

    hasSavedMatch.current = true;
    const payload = buildMatchPayload(game, game.stats, matchId.current);
    localStorage.setItem('last-tugmath-match', JSON.stringify(payload));

    saveMatch(payload).catch((error) => {
      console.error('[result] Unable to save match:', error);
    });

    return undefined;
  }, [game]);

  if (!game.winner) return null;

  const isDraw = game.winner.id === 'draw';
  const resultLabel = isDraw ? 'Draw Match' : `${game.winner.name} Wins`;

  return (
    <PageTransition className="relative w-full">
      {!isDraw ? <Confetti recycle={false} numberOfPieces={360} gravity={0.16} /> : null}
      <div className="grid w-full gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel className="flex min-h-[520px] flex-col justify-center p-8 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-amber-400 text-3xl text-slate-950 shadow-xl shadow-amber-600/20">
            <FaTrophy />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Final Result</p>
          <h1 className="mt-3 text-5xl font-black leading-none text-slate-950 sm:text-6xl">{resultLabel}</h1>
          <p className="mx-auto mt-5 max-w-md text-base font-medium leading-7 text-slate-600">
            {game.players.player1} and {game.players.player2} completed {game.totalRounds} rounds of rapid arithmetic.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <StatCard label={game.players.player1} value={game.scores.player1} tone="slate" />
            <StatCard label={game.players.player2} value={game.scores.player2} tone="teal" />
          </div>
          <Button
            className="mt-7 w-full"
            icon={FaArrowRotateLeft}
            onClick={() => {
              game.resetMatch();
              navigate('/');
            }}
          >
            Replay Match
          </Button>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">
              <FaChartSimple />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Match Statistics</p>
              <h2 className="text-2xl font-black text-slate-950">Performance Board</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Fastest" value={game.stats.fastestResponder} tone="white" />
            <StatCard label="Best Time" value={formatSeconds(game.stats.fastestTime)} tone="amber" />
            <StatCard label={`${game.players.player1} Accuracy`} value={`${game.stats.accuracy.player1}%`} tone="slate" />
            <StatCard label={`${game.players.player2} Accuracy`} value={`${game.stats.accuracy.player2}%`} tone="teal" />
          </div>

          <div className="mt-5 max-h-[290px] overflow-auto rounded-2xl bg-white/62 ring-1 ring-white/80">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-white text-xs uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Round</th>
                  <th className="px-4 py-3">Question</th>
                  <th className="px-4 py-3">Winner</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {game.history.map((round) => (
                  <tr key={round.round} className="border-t border-slate-200/70">
                    <td className="px-4 py-3 font-black">{round.round}</td>
                    <td className="px-4 py-3 font-bold">{round.question.prompt}</td>
                    <td className="px-4 py-3">{round.winner ? game.players[round.winner] : 'Timeout'}</td>
                    <td className="px-4 py-3">{formatSeconds(round.responseTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      </div>
    </PageTransition>
  );
}
