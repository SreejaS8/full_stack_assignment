import { AnimatePresence, motion } from 'framer-motion';
import { spring } from '../../constants/animation.js';

export default function CountdownOverlay({ value, visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute inset-0 z-20 grid place-items-center rounded-[2rem] bg-slate-950/35 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key={value}
            className="grid h-32 w-32 place-items-center rounded-full bg-white text-6xl font-black text-slate-950 shadow-2xl"
            initial={{ scale: 0.55, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 1.25, opacity: 0 }}
            transition={spring.snappy}
          >
            {value}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
