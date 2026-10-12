import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import LessonFrame from "../../LessonFrame";
import TranslationDrill from "../../TranslationDrill";

export default async function TranslatePage() {
  await requireAccess();
  const b = (await loadGrammarProgress())["translate"] ?? null;
  return (
    <LessonFrame lessonId="grammar/translate">
      <h1>Quick translation</h1>
      <TranslationDrill best={b ? { score: b.score, total: b.total } : null} />
    </LessonFrame>
  );
}
