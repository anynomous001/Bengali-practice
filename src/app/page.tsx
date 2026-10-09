import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function Home() {
  if (await getUser()) redirect("/learn");
  return (
    <main className="page narrow">
      <div className="hero">
        <span className="bn-big">বাংলা</span>
        <h1>Bengali Practice</h1>
        <p className="lead">A private practice space for my students: read, speak and write Bengali, a little every day.</p>
        <div className="cta">
          <Link className="btn" href="/login">Student sign in</Link>
          <Link className="btn ghost" href="/buy">Get access</Link>
        </div>
        <div className="seg-row">
          <span className="chip">📖 Reading</span>
          <span className="chip">🗣️ Speaking</span>
          <span className="chip">✍️ Writing</span>
        </div>
      </div>
    </main>
  );
}
