import { notFound } from "next/navigation";
import { KITCHEN } from "@/data/kitchen/content";
import { requireAccess } from "@/lib/access";
import LessonFrame from "../../../LessonFrame";
import StageBody, { stageToc } from "../../StageBody";

export function generateStaticParams() {
  return KITCHEN.stages.map((s) => ({ n: String(s.id) }));
}

export default async function StagePage({ params }: { params: Promise<{ n: string }> }) {
  await requireAccess();
  const n = Number((await params).n);
  if (!KITCHEN.stages.some((s) => s.id === n)) notFound();
  return (
    <LessonFrame lessonId={`kitchen/stage-${n}`} toc={stageToc(n)}>
      <StageBody n={n} />
    </LessonFrame>
  );
}
