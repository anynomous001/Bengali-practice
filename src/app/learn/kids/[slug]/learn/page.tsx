import { notFound } from "next/navigation";
import { getKidTopic, kidLessonIds, kidTopicBySlug } from "@/data/kids-topics";
import { requireAccess } from "@/lib/access";
import LessonFrame from "../../../LessonFrame";
import KidsCards from "../../KidsCards";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAccess();
  const id = kidTopicBySlug((await params).slug);
  const t = id && getKidTopic(id);
  if (!t) notFound();
  if (!t.ready) return <LessonFrame lessonId={kidLessonIds(t.id).learn}><h1>{t.title} <span lang="bn">{t.bn}</span></h1><p className="lede">The pictures for this lesson are being added. Check back soon.</p></LessonFrame>;
  return (
    <LessonFrame lessonId={kidLessonIds(t.id).learn}>
      <h1>{t.title} <span lang="bn">{t.bn}</span></h1>
      <p className="lede">Tap a card to hear the word. Tap again to hear it slowly. Say it back out loud.</p>
      <KidsCards items={t.words} />
    </LessonFrame>
  );
}
