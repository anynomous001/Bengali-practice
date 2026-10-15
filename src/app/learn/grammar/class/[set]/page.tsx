import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { getClasswork } from "@/data/classwork";
import { getDevClasswork } from "@/data/devotional";
import ClassworkReader from "./ClassworkReader";
import LessonFrame from "../../../LessonFrame";

export default async function ClassPage({ params }: { params: Promise<{ set: string }> }) {
  await requireAccess();
  const { set: id } = await params;
  const set = getClasswork(id) ?? getDevClasswork(id);
  if (!set) notFound();
  return (
    <LessonFrame lessonId={`grammar/class-${set.id}`}>
      <ClassworkReader set={set} />
    </LessonFrame>
  );
}
