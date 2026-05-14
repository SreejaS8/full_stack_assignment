import { useEffect, useMemo, useRef, useState } from 'react';

export default function useTimer({ active, duration, onExpire, resetKey }) {
  const [remainingMs, setRemainingMs] = useState(duration * 1000);
  const animationFrame = useRef(null);
  const expiresAt = useRef(null);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    setRemainingMs(duration * 1000);
    expiresAt.current = Date.now() + duration * 1000;
  }, [duration, resetKey]);

  useEffect(() => {
    if (!active) return undefined;

    expiresAt.current = Date.now() + duration * 1000;
    const tick = () => {
      const next = Math.max(0, expiresAt.current - Date.now());
      setRemainingMs(next);

      if (next === 0) {
        onExpireRef.current?.();
        return;
      }

      animationFrame.current = window.requestAnimationFrame(tick);
    };

    animationFrame.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrame.current) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [active, duration, resetKey]);

  return useMemo(
    () => ({
      remaining: Math.ceil(remainingMs / 1000),
      progress: (remainingMs / (duration * 1000)) * 100,
    }),
    [duration, remainingMs],
  );
}
