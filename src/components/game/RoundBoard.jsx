import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import QuestionCard from './QuestionCard.jsx';
import RopeArena from './RopeArena.jsx';
import RoundStatus from './RoundStatus.jsx';
import TimerBar from './TimerBar.jsx';

function RoundBoard({
  currentRound,
  difficulty,
  lastRoundWinner,
  players,
  question,
  ropeOffset,
  status,
  timer,
  totalRounds,
}) {
  const navigate = useNavigate();

  return (
    <section className="glass flex min-h-[520px] flex-col justify-between rounded-[2rem] p-5 shadow-2xl shadow-slate-950/10">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Round {currentRound} / {totalRounds}
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">Solve First</h2>
          </div>
          <div className="rounded-2xl bg-amber-300 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-200">
            {difficulty}
          </div>
        </div>

        <QuestionCard question={question} />
        <TimerBar progress={timer.progress} remaining={timer.remaining} />
      </div>

      <div className="mt-5 space-y-4">
        <RopeArena lastRoundWinner={lastRoundWinner} offset={ropeOffset} players={players} />
        <RoundStatus lastRoundWinner={lastRoundWinner} players={players} status={status} />
        <Button className="w-full lg:hidden" variant="secondary" onClick={() => navigate('/')}>
          Exit Match
        </Button>
      </div>
    </section>
  );
}

export default memo(RoundBoard);
