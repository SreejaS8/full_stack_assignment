import { memo } from 'react';
import { motion } from 'framer-motion';
import { spring } from '../../constants/animation.js';

const ARENA_VIEWBOX = '0 0 900 360';
const P1_svg = '/assets/P1_svg.svg';
const P2_svg = '/assets/P2_svg.svg';
const rope_svg = '/assets/rope_svg.svg';
const knot_svg = '/assets/knot_svg.svg';

function RopeArena({ offset, shakeKey }) {
  const pull = Math.max(-1, Math.min(1, offset / 150));
  const ropeX = pull * 96;
  const p1Lean = -6 - Math.max(0, -pull) * 5;
  const p2Lean = 6 + Math.max(0, pull) * 5;

  return (
    <div className="arena-stage relative h-56 w-full overflow-hidden rounded-[1.75rem] ring-1 ring-white/70">
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
          <pattern id="ropePattern" width="36" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
            <rect width="36" height="20" fill="#8a552d" />
            <rect x="0" width="14" height="20" fill="#d79a56" />
            <rect x="24" width="8" height="20" fill="#5f351d" />
          </pattern>
        </defs>

        <rect width="900" height="360" fill="transparent" />
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
          animate={{ x: ropeX, rotate: [0, pull ? -0.35 : 0, pull ? 0.35 : 0, 0] }}
          transition={spring.gentle}
          style={{ transformOrigin: '450px 178px' }}
        >
          <FallbackRope />
          <image href={rope_svg} x="210" y="159" width="480" height="38" preserveAspectRatio="none" />
          <motion.g
            key={shakeKey}
            animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ transformOrigin: '450px 178px' }}
          >
            <FallbackKnot />
            <image href={knot_svg} x="425" y="150" width="50" height="56" />
          </motion.g>
        </motion.g>

        <motion.g
          filter="url(#arena-shadow)"
          animate={{ rotate: p1Lean, y: [0, -3, 0] }}
          transition={{ ...spring.gentle, y: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ transformOrigin: '230px 248px' }}
        >
          <FallbackPlayer x={92} facing="right" />
          <image href={P1_svg} x="58" y="78" width="270" height="230" />
        </motion.g>

        <motion.g
          filter="url(#arena-shadow)"
          animate={{ rotate: p2Lean, y: [0, -3, 0] }}
          transition={{ ...spring.gentle, y: { duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.08 } }}
          style={{ transformOrigin: '670px 248px' }}
        >
          <FallbackPlayer x={578} facing="left" />
          <image href={P2_svg} x="572" y="78" width="270" height="230" />
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

function FallbackRope() {
  return (
    <rect
      x="210"
      y="168"
      width="480"
      height="20"
      rx="10"
      className="fallback-rope"
      stroke="#4b2d17"
      strokeWidth="4"
    />
  );
}

function FallbackKnot() {
  return <circle cx="450" cy="178" r="22" fill="#f7c06d" stroke="#4b2d17" strokeWidth="5" />;
}

function FallbackPlayer({ facing, x }) {
  const flip = facing === 'left' ? 'scale(-1 1)' : '';
  const originX = facing === 'left' ? x + 230 : x;

  return (
    <g transform={`translate(${originX} 0) ${flip}`}>
      <circle cx="72" cy="118" r="42" fill="#ffd0a8" stroke="#0f172a" strokeWidth="5" />
      <path d="M34 100c16-38 66-48 99-12-25-4-48-1-76 11z" fill="#8f4838" />
      <rect x="23" y="98" width="112" height="17" rx="8" fill="#e11d48" />
      <rect x="29" y="94" width="98" height="7" rx="4" fill="#fff" />
      <circle cx="57" cy="118" r="5" fill="#020617" />
      <circle cx="84" cy="118" r="5" fill="#020617" />
      <path d="M61 138c15 8 26 7 36-2" fill="none" stroke="#020617" strokeWidth="4" strokeLinecap="round" />
      <rect x="52" y="160" width="88" height="58" rx="22" fill="#ef233c" stroke="#0f172a" strokeWidth="5" />
      <path d="M28 174l174 42" stroke="#ffd0a8" strokeWidth="24" strokeLinecap="round" />
      <path d="M72 217l-36 66" stroke="#ffd0a8" strokeWidth="20" strokeLinecap="round" />
      <path d="M120 217l50 63" stroke="#ffd0a8" strokeWidth="20" strokeLinecap="round" />
      <path d="M64 217h68v42H64z" fill="#fff" />
    </g>
  );
}

export default memo(RopeArena);
