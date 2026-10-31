import Link from "next/link";
import { notFound } from "next/navigation";
import { getKidTopic, KID_TOPICS } from "@/data/kids";
import { requireAccess } from "@/lib/access";
import KidCard from "../../KidCard";
import "../../kids.css";

export function generateStaticParams() {
  return KID_TOPICS.map((t) => ({ topic: t.id }));
}

export default async function KidTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  await requireAccess();
  const t = getKidTopic((await params).topic);
  if (!t) notFound();
  return (
    <main className="kids" data-seg="kids">
      <Link href="/learn/kids/cards" className="k-back" aria-label="Back to kids home">← <span lang="bn">ছোটদের</span></Link>
      <h1 className="k-title" lang="bn">{t.bn}</h1>
      <p className="k-sub">Tap a card to hear it. Tap again to hear it slowly.</p>
      <div className="k-cards">
        {t.words.map((w) => <KidCard key={w.id} word={w} tone={t.tone} />)}
      </div>
      <p className="k-credit">Pictures: <a href="https://github.com/jdecked/twemoji" target="_blank" rel="noopener">Twemoji</a>, CC-BY 4.0.</p>
    </main>
  );
}
