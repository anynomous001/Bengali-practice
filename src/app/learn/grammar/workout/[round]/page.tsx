import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import { WORKOUT } from "@/data/tense-workout";
import WorkoutReader from "./WorkoutReader";
import LessonFrame from "../../../LessonFrame";

export default async function RoundPage({ params }: { params: Promise<{ round: string }> }) {
  await requireAccess();
  const { round: id } = await params;
  const round = WORKOUT.find((r) => r.id === id);
  if (!round) notFound();
  const best = (await loadGrammarProgress())[`w-${round.id}`] ?? null;
  return (
    <LessonFrame lessonId={`grammar/w-${round.id}`}>
      <WorkoutReader round={round} best={best} />
    </LessonFrame>
  );
}
