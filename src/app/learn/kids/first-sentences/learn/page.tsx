import { requireAccess } from "@/lib/access";
import { FIRST_SENTENCES } from "@/data/kids-first-sentences";
import LessonFrame from "../../../LessonFrame";
import Learn from "../Learn";

export default async function Page() {
  await requireAccess();
  return (
    <LessonFrame lessonId="kids/fs-learn">
      <h1>{FIRST_SENTENCES.title} <span lang="bn">{FIRST_SENTENCES.titleBn}</span></h1>
      <p className="lede">{FIRST_SENTENCES.subtitle}</p>
      <Learn data={FIRST_SENTENCES} />
    </LessonFrame>
  );
}
