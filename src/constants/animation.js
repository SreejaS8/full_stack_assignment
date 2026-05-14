export const pageTransition = {
  initial: { opacity: 0, y: 16, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.985 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

export const spring = {
  gentle: { type: 'spring', stiffness: 180, damping: 24, mass: 0.8 },
  snappy: { type: 'spring', stiffness: 260, damping: 26, mass: 0.7 },
};
