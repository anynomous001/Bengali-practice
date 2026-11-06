import { CONJ_CATEGORIES, CONJUNCTS } from "@/data/conjuncts";
import { requireAccess } from "@/lib/access";
import ConjunctQuiz from "../../../ConjunctQuiz";
import LessonFrame from "../../../LessonFrame";

export default async function Page() {
  await requireAccess();
  return (
    <LessonFrame lessonId="reading/conj-quiz">
      <h1>Conjunct quiz <span lang="bn">যুক্তাক্ষর</span></h1>
      <p className="lede">Choose the groups you want to practice, then how to practice. Pick one group to drill it, a few to mix them, or all of them for a full test. Seven in ten completes the lesson.</p>
      <ConjunctQuiz all={CONJUNCTS} categories={CONJ_CATEGORIES} completes />
    </LessonFrame>
  );
}
