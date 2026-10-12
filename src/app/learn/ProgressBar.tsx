/** Accessible progress bar. `value` and `max` are counts; the label is read by screen readers. */
export default function ProgressBar({ value, max, label, size = "md" }: { value: number; max: number; label: string; size?: "sm" | "md" | "lg" }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className={`pbar ${size}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={label}>
      <i style={{ width: `${pct}%` }} />
    </div>
  );
}
