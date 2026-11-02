import { TENSE_SETS } from "@/data/tense-sets";
import { requireAccess } from "@/lib/access";
import LessonFrame from "../../LessonFrame";
import TenseSetPractice from "../../TenseSetPractice";

export default async function Page() {
  await requireAccess();
  return (
    <LessonFrame lessonId="grammar/fill-blanks">
      <h1>Fill in the blanks: mixed tenses</h1>
      <TenseSetPractice kind="fill" sets={TENSE_SETS} />
    </LessonFrame>
  );
}
