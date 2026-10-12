import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadStoryProgress } from "@/lib/progress";
import { STORIES } from "@/data/stories";
import StoryReader from "./StoryReader";
import LessonFrame from "../../../LessonFrame";

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAccess();
  const { id } = await params;
  const story = STORIES.find((s) => s.id === id);
  if (!story) notFound();
  const best = (await loadStoryProgress())[story.id] ?? null;
  return (
    <LessonFrame lessonId={`reading/story-${story.id}`}>
      <StoryReader story={story} best={best} />
    </LessonFrame>
  );
}
