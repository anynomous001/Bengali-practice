import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadStoryProgress } from "@/lib/progress";
import { getDevStory } from "@/data/devotional-stories";
import StoryReader from "../../../stories/[id]/StoryReader";
import LessonFrame from "../../../../LessonFrame";

export default async function DevotionalStoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAccess();
  const { id } = await params;
  const story = getDevStory(id);
  if (!story) notFound();
  const best = (await loadStoryProgress())[story.id] ?? null;
  return (
    <LessonFrame lessonId={`reading/${story.id}`}>
      <StoryReader story={story} best={best} />
    </LessonFrame>
  );
}
