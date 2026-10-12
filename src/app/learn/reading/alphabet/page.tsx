import { requireAccess } from "@/lib/access";
import { loadProgress } from "@/lib/progress";
import { GROUPS, LETTERS } from "@/data/letters";
import Alphabet from "./Alphabet";
import LessonFrame from "../../LessonFrame";

export default async function AlphabetPage() {
  await requireAccess();
  return (
    <LessonFrame lessonId="reading/alphabet">
      <Alphabet initialProgress={await loadProgress()} segment="reading" letters={LETTERS} groups={GROUPS} />
    </LessonFrame>
  );
}
