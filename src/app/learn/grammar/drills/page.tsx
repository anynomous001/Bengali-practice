import { requireAccess } from "@/lib/access";
import { DRILL_TENSES } from "@/data/translation-drills";
import LessonFrame from "../../LessonFrame";
import TranslationDrills from "../../TranslationDrills";

export default async function DrillsPage() {
  await requireAccess();
  return (
    <LessonFrame lessonId="grammar/drills">
      <h1>Translation drills by tense</h1>
      <TranslationDrills tenses={DRILL_TENSES} />
    </LessonFrame>
  );
}
