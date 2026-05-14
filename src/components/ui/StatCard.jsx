export default function StatCard({ label, value, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-950 text-white',
    teal: 'bg-teal-600 text-white',
    amber: 'bg-amber-500 text-slate-950',
    white: 'bg-white/70 text-slate-950 ring-1 ring-slate-200',
  };

  return (
    <div className={`rounded-2xl p-4 shadow-innerGlow ${tones[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}
