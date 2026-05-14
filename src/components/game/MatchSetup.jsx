import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa6';
import { ROUND_COUNT_OPTIONS } from '../../constants/game.js';
import Button from '../ui/Button.jsx';
import GlassPanel from '../ui/GlassPanel.jsx';

export default function MatchSetup({ difficulty, onStart }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    player1: 'Nova',
    player2: 'Orion',
    rounds: 7,
  });

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onStart({
      difficulty,
      player1: form.player1.trim() || 'Player 1',
      player2: form.player2.trim() || 'Player 2',
      totalRounds: Number(form.rounds),
    });
    navigate('/game');
  };

  return (
    <GlassPanel className="p-5">
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Player 1</span>
          <input
            className="h-12 w-full rounded-xl border border-slate-200 bg-white/80 px-4 font-bold outline-none focus:border-slate-950 focus:ring-4 focus:ring-slate-950/10"
            value={form.player1}
            onChange={(event) => update('player1', event.target.value)}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Player 2</span>
          <input
            className="h-12 w-full rounded-xl border border-slate-200 bg-white/80 px-4 font-bold outline-none focus:border-slate-950 focus:ring-4 focus:ring-slate-950/10"
            value={form.player2}
            onChange={(event) => update('player2', event.target.value)}
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Rounds</span>
          <select
            className="h-12 w-full rounded-xl border border-slate-200 bg-white/80 px-4 font-bold outline-none focus:border-slate-950 focus:ring-4 focus:ring-slate-950/10 sm:w-28"
            value={form.rounds}
            onChange={(event) => update('rounds', event.target.value)}
          >
            {ROUND_COUNT_OPTIONS.map((rounds) => (
              <option key={rounds} value={rounds}>
                {rounds}
              </option>
            ))}
          </select>
        </label>
        <Button className="sm:col-span-3" icon={FaPlay} type="submit">
          Launch Match
        </Button>
      </form>
    </GlassPanel>
  );
}
