import { useEffect, useMemo, useState } from 'react';

type Props = { visible: boolean; targetMinutes?: number };

export default function Timer({ visible, targetMinutes = 36 }: Props) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  const label = useMemo(() => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [seconds]);
  const progress = Math.min(100, (seconds / (targetMinutes * 60)) * 100);
  if (!visible) return null;
  return (
    <div className="no-print fixed right-6 top-6 z-50 w-44 rounded-2xl border border-white/70 bg-white/80 p-3 shadow-glass backdrop-blur-xl">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[.18em] text-fiducial-deep">
        <span>Timer</span><span>{targetMinutes}m</span>
      </div>
      <div className="mt-1 text-3xl font-black tracking-[-0.04em] text-fiducial-anthracite">{label}</div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-fiducial-light">
        <div className="h-full rounded-full bg-fiducial-accent transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
