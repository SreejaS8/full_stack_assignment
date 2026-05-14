import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaLock, FaPaperPlane, FaUnlock } from 'react-icons/fa6';
import Button from '../ui/Button.jsx';

function PlayerPanel({
  accent,
  align = 'left',
  answer,
  disabled,
  locked,
  name,
  onAnswerChange,
  onSubmit,
  score,
  streak,
}) {
  const isRight = align === 'right';
  const normalizedAnswer = answer.replace(/[^\d-]/g, '');

  return (
    <motion.form
      onSubmit={onSubmit}
      className={`glass player-card flex h-full min-h-[520px] flex-col justify-between rounded-3xl p-5 ${
        isRight ? 'text-right' : 'text-left'
      }`}
      animate={{ borderColor: locked ? 'rgba(15,23,42,0.22)' : accent }}
      initial={false}
      transition={{ duration: 0.25 }}
    >
      <div>
        <div className={`flex items-start gap-3 ${isRight ? 'flex-row-reverse' : ''}`}>
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-xl font-black text-white shadow-lg ring-4 ring-white/70" style={{ backgroundColor: accent }}>
            {name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              {isRight ? 'Player 2' : 'Player 1'}
            </p>
            <h2 className="truncate text-2xl font-black text-slate-950">{name}</h2>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <motion.div
            className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200"
            animate={{ scale: [1, 1.04, 1] }}
            key={score}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Score</p>
            <p className="mt-1 text-5xl font-black text-slate-950">{score}</p>
          </motion.div>
          <div className="rounded-2xl bg-slate-950 p-4 text-white shadow-lg shadow-slate-950/15">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Streak</p>
            <p className="mt-2 inline-flex items-center gap-2 text-3xl font-black">
              <FaBolt className="text-amber-300" />
              {streak}x
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className={`flex items-center gap-2 text-sm font-bold ${isRight ? 'justify-end' : ''} ${locked ? 'text-slate-500' : 'text-emerald-600'}`}>
          {locked ? <FaLock /> : <FaUnlock />}
          {locked ? 'Answer locked' : 'Ready to answer'}
        </div>
        <input
          className="no-spinner h-16 w-full rounded-2xl border border-slate-200 bg-white/84 px-5 text-center text-3xl font-black text-slate-950 outline-none transition placeholder:text-slate-300 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/10 disabled:bg-slate-100 disabled:text-slate-400"
          type="text"
          inputMode="numeric"
          pattern="-?[0-9]*"
          value={normalizedAnswer}
          onChange={(event) => onAnswerChange(event.target.value.replace(/[^\d-]/g, ''))}
          placeholder="?"
          disabled={disabled || locked}
          aria-label={`${name} answer`}
        />
        <Button
          className="w-full"
          icon={FaPaperPlane}
          variant={isRight ? 'accent' : 'primary'}
          disabled={disabled || locked || answer === ''}
          type="submit"
        >
          Submit Answer
        </Button>
      </div>
    </motion.form>
  );
}

export default memo(PlayerPanel);
