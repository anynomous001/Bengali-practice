import { requireAccess } from "@/lib/access";
import { loadProgress } from "@/lib/progress";
import { GROUPS, LETTERS } from "@/data/letters";
import Alphabet from "./Alphabet";
import LessonFrame from "../../LessonFrame";

export default async function AlphabetPage() {
  await requireAccess();
  const toc = GROUPS.map((g) => ({ id: `sec-${g.id}`, label: g.title }));
  return (
    <LessonFrame lessonId="reading/alphabet" toc={toc}>
      <Alphabet initialProgress={await loadProgress()} segment="reading" letters={LETTERS} groups={GROUPS} />
    </LessonFrame>
  );
}
