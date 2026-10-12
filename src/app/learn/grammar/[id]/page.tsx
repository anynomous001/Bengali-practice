import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import { GRAMMAR } from "@/data/grammar";
import LessonReader from "../../LessonReader";
import { topicToc } from "@/lib/toc";
import LessonFrame from "../../LessonFrame";

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAccess();
  const { id } = await params;
  const topic = GRAMMAR.find((t) => t.id === id);
  if (!topic) notFound();
  const best = (await loadGrammarProgress())[topic.id] ?? null;
  return (
    <LessonFrame lessonId={`grammar/${topic.id}`} toc={topicToc(topic)}>
      <LessonReader topic={topic} best={best} />
    </LessonFrame>
  );
}
