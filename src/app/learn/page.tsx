import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { SEGMENTS, type Segment } from "@/data/segments";

const ICON: Record<Segment, string> = { reading: "পড়", speaking: "বল", writing: "লিখ" };

export default async function Dashboard() {
  const user = await requireAccess();
  return (
    <main>
      <h1>Welcome back</h1>
      {user.expiresAt && !user.isAdmin ? (
        <p className="muted">Your access runs until {user.expiresAt.toLocaleDateString("en-GB", { dateStyle: "long" })}.</p>
      ) : (
        <p className="muted">Pick what you want to practise today.</p>
      )}
      <div className="menu">
        {(Object.keys(SEGMENTS) as Segment[]).map((k) => {
          const s = SEGMENTS[k];
          return (
            <Link key={k} href={`/learn/${k}`} className="card segment" data-seg={k}>
              <span className="seg-icon" aria-hidden>{ICON[k]}</span>
              <div className="seg-body">
                <b>{s.title}<span className="bn">{s.bn}</span></b>
                <span>{s.blurb}</span>
                <span className="chips">
                  {s.activities.map((a) => <span key={a.href} className="chip">{a.title}</span>)}
                </span>
              </div>
              <span className="arrow" aria-hidden>›</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
