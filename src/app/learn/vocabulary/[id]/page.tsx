import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import { VOCAB, VOCAB_QUIZ_LEN } from "@/data/vocabulary";
import LessonFrame from "../../LessonFrame";
import VocabTopic from "./VocabTopic";

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAccess();
  const { id } = await params;
  const topic = VOCAB.find((t) => t.id === id);
  if (!topic) notFound();
  const toc = [
    { id: "sec-words", label: "Words" },
    ...topic.sections.map((s, i) => ({ id: `sec-w${i}`, label: s.title })),
    { id: "sec-phrases", label: "Phrases" },
    { id: "sec-practice", label: "Practice" },
  ];
  const best = (await loadGrammarProgress())[`v-${topic.id}`] ?? null;
  return (
    <LessonFrame lessonId={`vocabulary/${topic.id}`} toc={toc}>
      <VocabTopic topic={topic} best={best} quizLen={VOCAB_QUIZ_LEN} flashHref={`/learn/vocabulary/flashcards?deck=vocab-${topic.id}`} />
    </LessonFrame>
  );
}
