import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { SEGMENTS, type Segment } from "@/data/segments";

export default async function SegmentHub({ segment }: { segment: Segment }) {
  await requireAccess();
  const s = SEGMENTS[segment];
  return (
    <main data-seg={segment}>
      <Link href="/learn" className="back">← All segments</Link>
      <h1>{s.icon} {s.title}<span className="bn">{s.bn}</span></h1>
      <p className="muted">{s.blurb}</p>
      <div className="menu">
        {s.activities.map((a) => (
          <Link key={a.href} href={a.href} className="card activity">
            <b>{a.title}</b>
            <span>{a.blurb}</span>
          </Link>
        ))}
        {s.soon.map((a) => (
          <div key={a.title} className="card disabled">
            <b>{a.title} <span className="chip">Soon</span></b>
            <span>{a.blurb}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
