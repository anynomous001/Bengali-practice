import Link from "next/link";

/** The five stages as steps, in order. The current one is marked. */
export default function StageSteps({ stages, current }: { stages: { id: number; title: string }[]; current?: number }) {
  return (
    <nav className="kt-steps" aria-label="Stages">
      <ol>
        {stages.map((s) => (
          <li key={s.id}>
            <Link href={`/learn/kitchen/stage/${s.id}`} className={current === s.id ? "on" : ""} aria-current={current === s.id ? "step" : undefined}>
              <b>{s.id}</b><span>{s.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
