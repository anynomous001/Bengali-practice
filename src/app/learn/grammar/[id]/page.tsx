import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import { GRAMMAR } from "@/data/grammar";
import LessonReader from "../../LessonReader";

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAccess();
  const { id } = await params;
  const topic = GRAMMAR.find((t) => t.id === id);
  if (!topic) notFound();
  const best = (await loadGrammarProgress())[topic.id] ?? null;
  return (
    <main data-seg="grammar">
      <Link href="/learn/grammar" className="back">← Grammar</Link>
      <LessonReader topic={topic} best={best} />
    </main>
  );
}
