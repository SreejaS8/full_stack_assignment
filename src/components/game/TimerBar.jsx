import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function TimerBar({ progress, remaining }) {
  const prefersReducedMotion = useReducedMotion();
  const urgent = remaining <= 5;
  const scaleX = Math.max(progress, 0) / 100;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        <span>Round Timer</span>
        <motion.span
          animate={{ scale: urgent && !prefersReducedMotion ? [1, 1.08, 1] : 1 }}
          transition={{ repeat: urgent && !prefersReducedMotion ? Infinity : 0, duration: 0.8 }}
        >
          {remaining}s
        </motion.span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200/80">
        <motion.div
          className={`h-full origin-left rounded-full will-change-transform ${urgent ? 'bg-rose-500' : 'bg-teal-500'}`}
          animate={{ scaleX }}
          initial={false}
          transition={{ duration: prefersReducedMotion ? 0 : 0.08, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

export default memo(TimerBar);
