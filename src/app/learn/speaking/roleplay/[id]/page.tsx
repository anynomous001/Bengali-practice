import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { getScenario } from "@/data/roleplay";
import LessonFrame from "../../../LessonFrame";
import RolePlay from "./RolePlay";

export default async function RolePlayPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAccess();
  const { id } = await params;
  const s = getScenario(id);
  if (!s) notFound();
  const toc = [
    { id: "sec-situation", label: "The situation" },
    { id: "sec-words", label: "Words" },
    { id: "sec-say", label: "Phrases you say" },
    { id: "sec-hear", label: "What you hear" },
    { id: "sec-demos", label: "Examples" },
    { id: "sec-practice", label: "Now you speak" },
  ];
  return (
    <LessonFrame lessonId={`speaking/roleplay-${s.id}`} toc={toc}>
      <RolePlay scenario={s} />
    </LessonFrame>
  );
}
