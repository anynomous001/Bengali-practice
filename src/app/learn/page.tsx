import Link from "next/link";
import { getUser } from "@/lib/auth";

const MODULES = [
  { href: "/learn/alphabet", title: "Alphabet", blurb: "Vowels, consonants and special signs, with quizzes.", ready: true },
  { title: "Pronunciation", blurb: "Listen and repeat.", ready: false },
  { title: "Basic conversations", blurb: "Greetings, introductions, shopping.", ready: false },
  { title: "Numbers & money", blurb: "Counting and rupee denominations.", ready: false },
  { title: "Directions", blurb: "Asking for and giving directions.", ready: false },
  { title: "Role-play", blurb: "Practice real situations.", ready: false },
];

export default async function Dashboard() {
  const user = await getUser();
  return (
    <main>
      <h1>Welcome</h1>
      {user?.expiresAt && !user.isAdmin && (
        <p className="muted">Access until {user.expiresAt.toLocaleDateString("en-GB", { dateStyle: "long" })}.</p>
      )}
      <div className="menu">
        {MODULES.map((m) =>
          m.ready ? (
            <Link key={m.title} href={m.href!} className="card">
              <b>{m.title}</b><span>{m.blurb}</span>
            </Link>
          ) : (
            <div key={m.title} className="card disabled">
              <b>{m.title}</b><span>{m.blurb} Coming soon.</span>
            </div>
          ),
        )}
      </div>
    </main>
  );
}
