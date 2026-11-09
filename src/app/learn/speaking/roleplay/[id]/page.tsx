import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { getScenario } from "@/data/roleplay";
import { getDevScenario } from "@/data/devotional";
import LessonFrame from "../../../LessonFrame";
import RolePlay from "./RolePlay";
import { GlossProvider } from "../../../GlossText";
import { glossFrom } from "@/lib/glossary";

export default async function RolePlayPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAccess();
  const { id } = await params;
  const s = getScenario(id) ?? getDevScenario(id);
  if (!s) notFound();
  const toc = [
    { id: "sec-situation", label: "The situation" },
    { id: "sec-words", label: "Words" },
    { id: "sec-say", label: "Phrases you say" },
    { id: "sec-hear", label: "What you hear" },
    { id: "sec-demos", label: "Examples" },
    { id: "sec-practice", label: "Now you speak" },
  ];
  const lines = [...s.say, ...s.hear].flatMap((g) => g.items.map((l) => l[0])).concat(s.demos.flatMap((d) => d.turns.map((t) => t.line[0])));
  const gloss = glossFrom(lines);
  return (
    <LessonFrame lessonId={`speaking/roleplay-${s.id}`} toc={toc}>
      <GlossProvider gloss={gloss}><RolePlay scenario={s} /></GlossProvider>
    </LessonFrame>
  );
}
