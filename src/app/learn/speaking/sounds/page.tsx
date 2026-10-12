import Alphabet from "../../reading/alphabet/Alphabet";
import { requireAccess } from "@/lib/access";
import { loadProgress } from "@/lib/progress";
import { GROUPS, LETTERS } from "@/data/letters";
import LessonFrame from "../../LessonFrame";

export default async function SoundsPage() {
  await requireAccess();
  return (
    <LessonFrame lessonId="speaking/sounds">
      <Alphabet initialProgress={await loadProgress()} segment="speaking" letters={LETTERS} groups={GROUPS} />
    </LessonFrame>
  );
}
