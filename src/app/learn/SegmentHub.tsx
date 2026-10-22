import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { SEGMENTS, type Segment } from "@/data/segments";
import Icon, { IconTile } from "./Icon";

export default async function SegmentHub({ segment }: { segment: Segment }) {
  await requireAccess();
  const s = SEGMENTS[segment];
  return (
    <main data-seg={segment} className="wide">
      <header className="page-head">
        <IconTile name={segment} size={60} />
        <div>
          <p className="eyebrow" lang="bn">{s.bn}</p>
          <h1>{s.title}</h1>
          <p className="lede">{s.blurb}</p>
        </div>
      </header>
      <div className="menu">
        {s.activities.map((a, i) => (
          <Link key={a.href} href={a.href} className="card activity">
            <span className="idx">{String(i + 1).padStart(2, "0")}</span>
            <b>{a.title}</b>
            <span>{a.blurb}</span>
            <span className="go">Open <Icon name="next" size={15} /></span>
          </Link>
        ))}
      </div>
      {s.soon.length > 0 && (
        <>
          <h2 className="section-title">Coming soon</h2>
          <div className="menu soon">
            {s.soon.map((a) => (
              <div key={a.title} className="card disabled">
                <b>{a.title}</b>
                <span>{a.blurb}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
