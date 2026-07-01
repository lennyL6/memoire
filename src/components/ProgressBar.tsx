type Props = { index: number; total: number };

export default function ProgressBar({ index, total }: Props) {
  const pct = ((index + 1) / total) * 100;
  return (
    <div className="no-print fixed bottom-0 left-0 right-0 z-40 h-1 bg-fiducial-anthracite/10">
      <div className="h-full bg-fiducial-deep transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  );
}
