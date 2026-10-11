import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import { WORKOUT } from "@/data/tense-workout";
import WorkoutReader from "./WorkoutReader";

export default async function RoundPage({ params }: { params: Promise<{ round: string }> }) {
  await requireAccess();
  const { round: id } = await params;
  const round = WORKOUT.find((r) => r.id === id);
  if (!round) notFound();
  const best = (await loadGrammarProgress())[`w-${round.id}`] ?? null;
  return (
    <main data-seg="grammar">
      <Link href="/learn/grammar/workout" className="back">← Tense workout</Link>
      <WorkoutReader round={round} best={best} />
    </main>
  );
}
