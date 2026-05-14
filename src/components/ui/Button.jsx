import { motion } from 'framer-motion';

export default function Button({ children, icon: Icon, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary:
      'bg-slate-950 text-white shadow-lg shadow-slate-950/20 hover:bg-slate-800 disabled:bg-slate-400',
    secondary:
      'bg-white/76 text-slate-900 ring-1 ring-slate-200 hover:bg-white disabled:text-slate-400',
    accent:
      'bg-teal-600 text-white shadow-lg shadow-teal-700/20 hover:bg-teal-500 disabled:bg-teal-300',
    danger:
      'bg-rose-600 text-white shadow-lg shadow-rose-700/20 hover:bg-rose-500 disabled:bg-rose-300',
  };

  return (
    <motion.button
      whileTap={{ scale: props.disabled ? 1 : 0.98 }}
      whileHover={{ y: props.disabled ? 0 : -1 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${styles[variant]} ${className}`}
      {...props}
    >
      {Icon ? <Icon className="text-lg" aria-hidden="true" /> : null}
      {children}
    </motion.button>
  );
}
