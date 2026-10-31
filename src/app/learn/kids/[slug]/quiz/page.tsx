import { notFound } from "next/navigation";
import { getKidTopic, kidTopicBySlug } from "@/data/kids-topics";
import { requireAccess } from "@/lib/access";
import LessonFrame from "../../../LessonFrame";
import KidsQuiz from "../../KidsQuiz";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAccess();
  const id = kidTopicBySlug((await params).slug);
  const t = id && getKidTopic(id);
  if (!t) notFound();
  return (
    <LessonFrame lessonId={t.quizLesson}>
      <h1>{t.question.en.replace("?", "")} <span lang="bn">{t.question.bn}</span></h1>
      <KidsQuiz topic={t.id} items={t.words} question={t.question} />
    </LessonFrame>
  );
}
