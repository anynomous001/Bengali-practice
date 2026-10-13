import { requireAccess } from "@/lib/access";
import LessonFrame from "../../LessonFrame";
import ImpromptuMachine from "./ImpromptuMachine";

export default async function ImpromptuPage() {
  await requireAccess();
  return (
    <LessonFrame lessonId="speaking/impromptu">
      <h1>Impromptu topics</h1>
      <ImpromptuMachine />
    </LessonFrame>
  );
}
