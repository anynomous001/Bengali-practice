import Link from "next/link";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { DECKS } from "@/data/decks";
import { SEGMENTS, type Segment } from "@/data/segments";
import Session from "./Session";

const NEW_PER_SESSION = 10;
const MAX_PER_SESSION = 25;

export default async function FlashcardsView({ segment, deckId }: { segment: Segment; deckId?: string }) {
  const user = await getUser();
  const base = `/learn/${segment}/flashcards`;
  const decks = DECKS.filter((d) => d.segment === segment);
  const rows = user
    ? await query<{ card_id: string; box: number; due: boolean }>(
        "SELECT card_id, box, due_at <= now() AS due FROM flashcards WHERE email = $1",
        [user.email],
      )
    : [];
  const state = new Map(rows.map((r) => [r.card_id, r]));

  const stats = decks.map((d) => {
    const fresh = d.cards.filter((c) => !state.has(c.id));
    const due = d.cards.filter((c) => state.get(c.id)?.due);
    const learned = d.cards.filter((c) => (state.get(c.id)?.box ?? 0) >= 3).length;
    return { deck: d, fresh, due, learned };
  });

  const chosen = stats.find((s) => s.deck.id === deckId);
  if (chosen) {
    const queue = [...chosen.due, ...chosen.fresh.slice(0, NEW_PER_SESSION)].slice(0, MAX_PER_SESSION);
    return (
      <main>
        <p><Link href={base}>← Decks</Link></p>
        <h1>{chosen.deck.title}</h1>
        <Session cards={queue} hint={chosen.deck.hint} autoSpeak={chosen.deck.autoSpeak} backHref={base} />
      </main>
    );
  }

  return (
    <main>
      <p><Link href={`/learn/${segment}`}>← {SEGMENTS[segment].title}</Link></p>
      <h1>Flashcards</h1>
      <p className="muted">Cards you miss come back sooner; cards you know come back after longer gaps (1, 3, 7, 14, then 30 days).</p>
      <div className="menu">
        {stats.map(({ deck, fresh, due, learned }) => {
          const fresher = Math.min(fresh.length, NEW_PER_SESSION);
          return (
            <Link key={deck.id} href={`${base}?deck=${deck.id}`} className="card">
              <b>{deck.title}</b>
              <span>{deck.blurb}</span>
              <span>
                {due.length + fresher > 0 ? `${due.length + fresher} to review (${due.length} due, ${fresher} new)` : "All caught up"}
                {" · "}{learned}/{deck.cards.length} learned
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
