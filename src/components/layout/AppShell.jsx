export default function AppShell({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-4 text-slate-950 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-grid arena-grid opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/65 to-transparent" />
      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl items-center">
        {children}
      </div>
    </main>
  );
}
