import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadLeaderboard, RANGES, type Range } from "@/lib/leaderboard";
import Icon from "../Icon";

export default async function LeaderboardPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const user = await requireAccess();
  const { range: r } = await searchParams;
  const range: Range = RANGES.some((x) => x.id === r) ? (r as Range) : "week";
  const { rows, hidden, buddiesShown } = await loadLeaderboard(user.email, range);
  const top = rows.slice(0, 10);
  const meIdx = rows.findIndex((x) => x.you);
  const row = (x: (typeof rows)[number], i: number) => (
    <li key={i} className={(x.you ? "you " : "") + (i < 3 ? "podium" : "")}>
      <span className="rank">{i + 1}</span>
      <span className="who">{x.name}{x.you && " (you)"}{x.buddy && <span className="buddy-tag">Practice buddy</span>}</span>
      <span className="streak"><Icon name="flame" size={14} weight="fill" />{x.streak}</span>
      <b>{x.points}</b>
    </li>
  );
  return (
    <main className="wide">
      <header>
        <p className="eyebrow">Class</p>
        <h1>Leaderboard</h1>
        <p className="lede">Points from lessons, quizzes, flashcards and exams. A friendly way to keep each other practising.</p>
      </header>
      <div className="lb-tabs" role="tablist" aria-label="Time range">
        {RANGES.map((x) => <Link key={x.id} href={`/learn/leaderboard?range=${x.id}`} role="tab" aria-selected={range === x.id} className={range === x.id ? "on" : ""}>{x.label}</Link>)}
      </div>
      <ol className="board">
        {top.map(row)}
        {meIdx >= 10 && <><li className="gap" aria-hidden="true">…</li>{row(rows[meIdx], meIdx)}</>}
      </ol>
      {!rows.length && <p className="muted">Nobody is on the leaderboard yet.</p>}
      {hidden && <p className="msg">You are hidden from the leaderboard. You can show yourself again in <Link href="/learn/progress">My progress</Link>.</p>}
      {buddiesShown && <p className="muted">“Practice buddies” are example classmates, not real people. They keep the board lively while the class is small and disappear as more students join.</p>}
      <p className="muted">Students without a display name appear as “Student”. Choose your name or hide yourself in <Link href="/learn/progress">My progress</Link>.</p>
    </main>
  );
}
