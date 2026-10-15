import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { query } from "@/lib/db";
import { DECKS } from "@/data/decks";
import type { Segment } from "@/data/segments";
import Session from "./Session";
import LessonFrame from "./LessonFrame";
import Icon from "./Icon";

const NEW_PER_SESSION = 10;
const MAX_PER_SESSION = 25;

export default async function FlashcardsView({ segment, deckId }: { segment: Segment | "vocabulary"; deckId?: string }) {
  const user = await requireAccess();
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

  const deckCard = ({ deck, fresh, due, learned }: (typeof stats)[number]) => {
    const fresher = Math.min(fresh.length, NEW_PER_SESSION);
    return (
      <Link key={deck.id} href={`${base}?deck=${deck.id}`} className="card">
        <b>{deck.title}{deck.devotional && <span className="dev-tag">Devotional</span>}</b>
        <span>{deck.blurb}</span>
        <span>
          {due.length + fresher > 0 ? `${due.length + fresher} to review (${due.length} due, ${fresher} new)` : "All caught up"}
          {" · "}{learned}/{deck.cards.length} learned
        </span>
      </Link>
    );
  };
  const chosen = stats.find((s) => s.deck.id === deckId);
  if (chosen) {
    const queue = [...chosen.due, ...chosen.fresh.slice(0, NEW_PER_SESSION)].slice(0, MAX_PER_SESSION);
    const body = (
      <>
        <Link href={base} className="back"><Icon name="prev" size={16} />Decks</Link>
        {chosen.deck.devotional && <p><span className="dev-tag">Devotional</span></p>}
        <h1>{chosen.deck.title}</h1>
        <Session cards={queue} hint={chosen.deck.hint} autoSpeak={chosen.deck.autoSpeak} backHref={base} />
      </>
    );
    // A devotional deck is not part of the main flashcards lesson, so it gets no lesson frame or completion button.
    if (chosen.deck.devotional) return <main data-seg={segment} className="lesson-page"><div className="lp-content">{body}</div></main>;
    return <LessonFrame lessonId={`${segment}/flashcards`}>{body}</LessonFrame>;
  }

  return (
    <LessonFrame lessonId={`${segment}/flashcards`}>
      <h1>Flashcards</h1>
      <p className="muted">Cards you miss come back sooner; cards you know come back after longer gaps (1, 3, 7, 14, then 30 days).</p>
      <div className="menu">{stats.filter((s) => !s.deck.devotional).map(deckCard)}</div>
      {stats.some((s) => s.deck.devotional) && (
        <>
          <h2 className="learn-h">Devotional decks <span className="dev-tag">Devotional</span></h2>
          <div className="menu">{stats.filter((s) => s.deck.devotional).map(deckCard)}</div>
        </>
      )}
    </LessonFrame>
  );
}
