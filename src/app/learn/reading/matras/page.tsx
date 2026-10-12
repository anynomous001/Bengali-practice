import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import { READING_LESSONS } from "@/data/reading-lessons";
import LessonReader from "../../LessonReader";
import LessonFrame from "../../LessonFrame";

export default async function MatrasPage() {
  await requireAccess();
  const topic = READING_LESSONS.find((t) => t.id === "matras");
  if (!topic) notFound();
  const best = (await loadGrammarProgress())[topic.id] ?? null;
  return (
    <LessonFrame lessonId="reading/matras">
      <LessonReader topic={topic} best={best} />
    </LessonFrame>
  );
}
