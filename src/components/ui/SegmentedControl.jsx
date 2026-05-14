import { motion } from 'framer-motion';

export default function SegmentedControl({ value, onChange, options }) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white/50 p-1 ring-1 ring-slate-200">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`relative min-h-12 rounded-xl px-4 text-sm font-bold transition ${
              active ? 'text-white' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            {active ? (
              <motion.span
                layoutId="difficulty-pill"
                className="absolute inset-0 rounded-xl bg-slate-950 shadow-lg shadow-slate-950/15"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
