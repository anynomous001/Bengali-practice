import { TENSE_SETS } from "@/data/tense-sets";
import { requireAccess } from "@/lib/access";
import LessonFrame from "../../LessonFrame";
import TenseSetPractice from "../../TenseSetPractice";

export default async function Page() {
  await requireAccess();
  return (
    <LessonFrame lessonId="grammar/mixed-translate">
      <h1>Translate: mixed tenses</h1>
      <TenseSetPractice kind="translate" sets={TENSE_SETS} />
    </LessonFrame>
  );
}
