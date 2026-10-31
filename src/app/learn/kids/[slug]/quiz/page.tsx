import { notFound } from "next/navigation";
import { getKidTopic, kidLessonIds, kidTopicBySlug } from "@/data/kids-topics";
import { requireAccess } from "@/lib/access";
import LessonFrame from "../../../LessonFrame";
import KidsQuiz from "../../KidsQuiz";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAccess();
  const id = kidTopicBySlug((await params).slug);
  const t = id && getKidTopic(id);
  if (!t) notFound();
  if (!t.ready) return <LessonFrame lessonId={kidLessonIds(t.id).quiz}><h1>{t.title} <span lang="bn">{t.bn}</span></h1><p className="lede">The pictures for this lesson are being added. Check back soon.</p></LessonFrame>;
  return (
    <LessonFrame lessonId={kidLessonIds(t.id).quiz}>
      <h1>{t.question.en.replace("?", "")} <span lang="bn">{t.question.bn}</span></h1>
      <KidsQuiz topic={t.id} items={t.words} question={t.question} />
    </LessonFrame>
  );
}
