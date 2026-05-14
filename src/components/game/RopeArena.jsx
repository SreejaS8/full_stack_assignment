import { memo } from 'react';
import { motion } from 'framer-motion';
import { spring } from '../../constants/animation.js';

const ARENA_VIEWBOX = '0 0 900 360';
const TUG_IMAGE = '/assets/tug_of_war.png';

function RopeArena({ lastRoundWinner, offset }) {
  const pull = Math.max(-1, Math.min(1, offset / 150));
  const p1Wins = lastRoundWinner === 'player1';
  const p2Wins = lastRoundWinner === 'player2';
  const tugX = pull * 118;
  const leftPlayerX = tugX + (p1Wins ? -8 : p2Wins ? 8 : 0);
  const rightPlayerX = tugX + (p1Wins ? -8 : p2Wins ? 8 : 0);
  const leftBounce = p1Wins ? -4 : 0;
  const rightBounce = p2Wins ? -4 : 0;

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
          <clipPath id="left-player-clip">
            <rect x="-48" y="-42" width="500" height="444" />
          </clipPath>
          <clipPath id="right-player-clip">
            <rect x="448" y="-42" width="500" height="444" />
          </clipPath>
        </defs>

        <rect width="900" height="360" fill="transparent" />
        <ellipse cx="450" cy="295" rx="360" ry="34" fill="#064e3b" opacity="0.12" />

        <motion.g animate={{ x: leftPlayerX, y: [0, leftBounce, 0] }} transition={spring.gentle} clipPath="url(#left-player-clip)" filter="url(#arena-shadow)">
          <image href={TUG_IMAGE} x="-48" y="-42" width="996" height="444" preserveAspectRatio="xMidYMid meet" />
        </motion.g>
        <motion.g animate={{ x: rightPlayerX, y: [0, rightBounce, 0] }} transition={spring.gentle} clipPath="url(#right-player-clip)" filter="url(#arena-shadow)">
          <image href={TUG_IMAGE} x="-48" y="-42" width="996" height="444" preserveAspectRatio="xMidYMid meet" />
        </motion.g>
      </svg>
    </div>
  );
}

export default memo(RopeArena);
