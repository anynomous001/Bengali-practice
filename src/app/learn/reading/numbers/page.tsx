import { requireAccess } from "@/lib/access";
import { NUMBERS } from "@/data/numbers";
import NumberQuiz from "../../NumberQuiz";
import LessonFrame from "../../LessonFrame";

export default async function Page() {
  await requireAccess();
  return (
    <LessonFrame lessonId="reading/numbers">
      <h1>Numbers &amp; money</h1>
      <NumberQuiz numbers={NUMBERS} />
    </LessonFrame>
  );
}
