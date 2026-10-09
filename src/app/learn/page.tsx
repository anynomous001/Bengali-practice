import Link from "next/link";
import { getUser } from "@/lib/auth";
import { SEGMENTS, type Segment } from "@/data/segments";

export default async function Dashboard() {
  const user = await getUser();
  return (
    <main>
      <h1>Welcome</h1>
      {user?.expiresAt && !user.isAdmin && (
        <p className="muted">Access until {user.expiresAt.toLocaleDateString("en-GB", { dateStyle: "long" })}.</p>
      )}
      <div className="menu">
        {(Object.keys(SEGMENTS) as Segment[]).map((k) => {
          const s = SEGMENTS[k];
          return (
            <Link key={k} href={`/learn/${k}`} className="card segment">
              <b>{s.icon} {s.title} <span className="bn">{s.bn}</span></b>
              <span>{s.blurb}</span>
              <span>{s.activities.map((a) => a.title).join(" · ")}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
