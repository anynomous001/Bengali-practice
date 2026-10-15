import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import { VOCAB_QUIZ_LEN } from "@/data/vocabulary";
import { DEV_READING } from "@/data/devotional";
import LessonFrame from "../../../LessonFrame";
import VocabTopic from "../../../vocabulary/[id]/VocabTopic";

export default async function DevotionalReadingPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAccess();
  const { id } = await params;
  const topic = DEV_READING.find((t) => t.id === id);
  if (!topic) notFound();
  const toc = [
    { id: "sec-words", label: "Read" },
    ...topic.sections.map((s, i) => ({ id: `sec-w${i}`, label: s.title })),
    ...(topic.phrases.length ? [{ id: "sec-phrases", label: "Phrases" }] : []),
    { id: "sec-practice", label: "Practice" },
  ];
  const best = (await loadGrammarProgress())[`v-${topic.id}`] ?? null;
  return (
    <LessonFrame lessonId={topic.lessonId} toc={toc}>
      <VocabTopic topic={topic} best={best} quizLen={VOCAB_QUIZ_LEN} devotional />
    </LessonFrame>
  );
}
