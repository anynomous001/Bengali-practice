import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { getListeningStory } from "@/data/listening-stories";
import LessonFrame from "../../../LessonFrame";
import StoryListening from "../../../StoryListening";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireAccess();
  const story = getListeningStory((await params).id);
  if (!story) notFound();
  return (
    <LessonFrame lessonId={`listening/story-${story.id}`}>
      <p className="eyebrow">Listening story <span className="pth-tag">{story.tag}</span></p>
      <h1>{story.title[2]}</h1>
      <p className="lede">{story.blurb}</p>
      <StoryListening story={story} />
    </LessonFrame>
  );
}
