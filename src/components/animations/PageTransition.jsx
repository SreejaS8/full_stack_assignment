import { motion } from 'framer-motion';
import { pageTransition } from '../../constants/animation.js';

export default function PageTransition({ children, className = '' }) {
  return (
    <motion.section
      className={className}
      {...pageTransition}
    >
      {children}
    </motion.section>
  );
}
