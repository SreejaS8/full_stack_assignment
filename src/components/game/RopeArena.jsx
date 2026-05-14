import { memo } from 'react';
import { motion } from 'framer-motion';
import { spring } from '../../constants/animation.js';

const ARENA_VIEWBOX = '0 0 900 360';

function RopeArena({ lastRoundWinner, offset, players }) {
  const pull = Math.max(-1, Math.min(1, offset / 150));
  const winnerPull = lastRoundWinner === 'player1' ? -1 : lastRoundWinner === 'player2' ? 1 : null;
  const ropeX = (winnerPull ?? pull) * 96;
  const p1Lean = -6 - Math.max(0, -pull) * 5;
  const p2Lean = 6 + Math.max(0, pull) * 5;

  return (
    <div className="arena-stage relative h-60 w-full overflow-hidden rounded-[1.75rem] ring-1 ring-white/70">
      <svg
        className="h-full w-full"
        role="img"
        aria-label="Animated tug of war arena"
        viewBox={ARENA_VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="arena-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.22" />
          </filter>
          <linearGradient id="p1-shirt" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="p2-shirt" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <pattern id="ropePattern" width="36" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
            <rect width="36" height="20" fill="#8a552d" />
            <rect x="0" width="14" height="20" fill="#d79a56" />
            <rect x="24" width="8" height="20" fill="#5f351d" />
          </pattern>
        </defs>

        <rect width="900" height="360" fill="transparent" />
        <ellipse cx="450" cy="295" rx="360" ry="34" fill="#064e3b" opacity="0.12" />
        <line x1="450" x2="450" y1="42" y2="310" stroke="#0f172a" strokeOpacity="0.18" strokeWidth="3" />
        <motion.g
          animate={{ scale: [0.92, 1.05, 0.92], opacity: [0.28, 0.85, 0.28] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <line x1="450" x2="450" y1="130" y2="230" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <line x1="400" x2="500" y1="180" y2="180" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <line x1="416" x2="484" y1="146" y2="214" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
          <line x1="484" x2="416" y1="146" y2="214" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        </motion.g>

        <motion.g
          className="will-change-transform"
          animate={{ x: ropeX }}
          transition={spring.gentle}
          style={{ transformOrigin: '450px 178px' }}
        >
          <SimpleKnotRope />
        </motion.g>

        <motion.g
          filter="url(#arena-shadow)"
          animate={{ rotate: p1Lean, y: [0, -3, 0] }}
          transition={{ ...spring.gentle, y: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ transformOrigin: '230px 248px' }}
        >
          <ArenaPlayer facing="right" label={players.player1} stroke="#0f172a" x={74} />
        </motion.g>

        <motion.g
          filter="url(#arena-shadow)"
          animate={{ rotate: p2Lean, y: [0, -3, 0] }}
          transition={{ ...spring.gentle, y: { duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.08 } }}
          style={{ transformOrigin: '670px 248px' }}
        >
          <ArenaPlayer facing="left" label={players.player2} stroke="#0f766e" x={596} />
        </motion.g>

        <g>
          <rect x="391" y="22" width="118" height="34" rx="17" fill="#020617" />
          <text x="450" y="44" textAnchor="middle" className="fill-white text-[15px] font-black tracking-[0.2em]">
            CENTER
          </text>
        </g>

        <text x="98" y="326" className="fill-slate-900 text-[18px] font-black tracking-[0.18em]">
          P1 PULL
        </text>
        <text x="686" y="326" className="fill-slate-900 text-[18px] font-black tracking-[0.18em]">
          P2 PULL
        </text>
      </svg>
    </div>
  );
}

function SimpleKnotRope() {
  return (
    <g>
      <rect x="210" y="168" width="480" height="20" rx="10" className="fallback-rope" stroke="#4b2d17" strokeWidth="4" />
      <ellipse cx="450" cy="178" rx="34" ry="25" fill="#d79a56" stroke="#4b2d17" strokeWidth="5" />
      <path d="M426 166c14 14 34 14 48 0" fill="none" stroke="#5f351d" strokeWidth="6" strokeLinecap="round" />
      <path d="M426 190c14-14 34-14 48 0" fill="none" stroke="#5f351d" strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

function ArenaPlayer({ facing, label, stroke, x }) {
  const flip = facing === 'left' ? 'scale(-1 1)' : '';
  const originX = facing === 'left' ? x + 230 : x;
  const badgeX = facing === 'left' ? x + 22 : x + 18;
  const playerId = facing === 'left' ? 'P2' : 'P1';

  return (
    <g>
      <g transform={`translate(${originX} 0) ${flip}`}>
        <ellipse cx="116" cy="292" rx="88" ry="16" fill="#020617" opacity="0.14" />
        <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="104" cy="108" r="26" fill="#fff7ed" strokeWidth="7" />
          <path d="M104 136l-12 82" strokeWidth="12" />
          <path d="M96 166l-54 20" strokeWidth="11" />
          <path d="M96 168l104 22" strokeWidth="11" />
          <path d="M92 218l-42 62" strokeWidth="12" />
          <path d="M92 218l66 60" strokeWidth="12" />
          <path d="M50 280h-32" strokeWidth="10" />
          <path d="M158 278h34" strokeWidth="10" />
        </g>
        <path d="M86 101h36" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
        <circle cx="96" cy="113" r="4" fill="#020617" />
        <circle cx="114" cy="113" r="4" fill="#020617" />
        <path d="M96 124c8 5 16 5 23 0" fill="none" stroke="#020617" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="186" r="10" fill="#fff7ed" stroke={stroke} strokeWidth="5" />
        <circle cx="200" cy="190" r="10" fill="#fff7ed" stroke={stroke} strokeWidth="5" />
        <rect x="76" y="144" width="56" height="24" rx="12" fill="#ffffff" stroke={stroke} strokeWidth="4" />
        <text x="104" y="161" textAnchor="middle" className="fill-slate-950 text-[13px] font-black">
          {playerId}
        </text>
      </g>

      <g transform={`translate(${badgeX} 30)`}>
        <rect width="180" height="38" rx="19" fill="#ffffff" opacity="0.9" />
        <rect width="180" height="38" rx="19" fill="none" stroke="#0f172a" strokeOpacity="0.1" />
        <text x="90" y="25" textAnchor="middle" className="fill-slate-950 text-[18px] font-black">
          {label}
        </text>
      </g>
    </g>
  );
}

export default memo(RopeArena);
