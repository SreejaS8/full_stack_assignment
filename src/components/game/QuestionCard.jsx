import { memo } from 'react';
import { motion } from 'framer-motion';
import { spring } from '../../constants/animation.js';

const OPERATOR_LABELS = {
  '*': 'x',
  '/': '/',
};

function formatQuestion(prompt = '') {
  return prompt.replaceAll('*', OPERATOR_LABELS['*']).replaceAll('/', OPERATOR_LABELS['/']);
}

function QuestionCard({ question }) {
  return (
    <motion.div
      key={question?.id}
      className="my-6 rounded-[1.75rem] bg-slate-950 px-5 py-8 text-center text-white shadow-glow ring-1 ring-white/10 will-change-transform"
      initial={{ scale: 0.96, opacity: 0, y: 8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={spring.snappy}
    >
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/45">Question</p>
      <p className="mt-3 text-6xl font-black tracking-normal sm:text-7xl">
        {formatQuestion(question?.prompt)}
      </p>
    </motion.div>
  );
}

export default memo(QuestionCard);
