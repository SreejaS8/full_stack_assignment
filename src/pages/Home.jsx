import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaGraduationCap } from 'react-icons/fa6';
import MatchSetup from '../components/game/MatchSetup.jsx';
import PageTransition from '../components/animations/PageTransition.jsx';
import GlassPanel from '../components/ui/GlassPanel.jsx';
import SegmentedControl from '../components/ui/SegmentedControl.jsx';
import StatCard from '../components/ui/StatCard.jsx';
import { DIFFICULTY_OPTIONS } from '../constants/game.js';
import { useGame } from '../context/GameContext.jsx';

export default function Home() {
  const [difficulty, setDifficulty] = useState('medium');
  const { startMatch } = useGame();

  return (
    <PageTransition className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-teal-700 ring-1 ring-white/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaGraduationCap />
          Teaching panel multiplayer
        </motion.div>
        <motion.h1
          className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          TugMath Arena
        </motion.h1>
        <motion.p
          className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-600"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
        >
          A fast, head-to-head arithmetic match where the first correct answer pulls the rope and shifts the momentum.
        </motion.p>

        <div className="mt-7 grid max-w-2xl grid-cols-3 gap-3">
          <StatCard label="Mode" value="2P" tone="slate" />
          <StatCard label="Timer" value="15s" tone="teal" />
          <StatCard label="Input" value="Live" tone="amber" />
        </div>
      </div>

      <GlassPanel className="p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Match Control</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">Configure Arena</h2>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">
            <FaBolt />
          </div>
        </div>
        <SegmentedControl value={difficulty} onChange={setDifficulty} options={DIFFICULTY_OPTIONS} />
        <div className="mt-5">
          <MatchSetup difficulty={difficulty} onStart={startMatch} />
        </div>
      </GlassPanel>
    </PageTransition>
  );
}
