import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import { READING_LESSONS } from "@/data/reading-lessons";
import LessonReader from "../../LessonReader";

export default async function MatrasPage() {
  await requireAccess();
  const topic = READING_LESSONS.find((t) => t.id === "matras");
  if (!topic) notFound();
  const best = (await loadGrammarProgress())[topic.id] ?? null;
  return (
    <main data-seg="reading">
      <Link href="/learn/reading" className="back">← Reading</Link>
      <LessonReader topic={topic} best={best} />
    </main>
  );
}
