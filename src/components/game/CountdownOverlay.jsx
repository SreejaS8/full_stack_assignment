import { AnimatePresence, motion } from 'framer-motion';
import { spring } from '../../constants/animation.js';

export default function CountdownOverlay({ message, value, visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute inset-0 z-20 grid place-items-center rounded-[2rem] bg-slate-950/45 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid place-items-center gap-5 text-center">
            {message ? (
              <motion.div
                className="rounded-3xl bg-white/92 px-6 py-4 shadow-2xl ring-1 ring-white/80"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring.snappy}
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Next round in</p>
                <p className="mt-1 text-2xl font-black text-slate-950">{message}</p>
              </motion.div>
            ) : null}
            <motion.div
              key={value}
              className="grid h-32 w-32 place-items-center rounded-full bg-amber-300 text-6xl font-black text-slate-950 shadow-2xl shadow-amber-500/25 ring-8 ring-white/70"
              initial={{ scale: 0.55, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 1.25, opacity: 0 }}
              transition={spring.snappy}
            >
              {value}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
