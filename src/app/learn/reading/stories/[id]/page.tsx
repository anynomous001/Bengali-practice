import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadStoryProgress } from "@/lib/progress";
import { STORIES } from "@/data/stories";
import StoryReader from "./StoryReader";
import LessonFrame from "../../../LessonFrame";
import StoryConjuncts from "../../../StoryConjuncts";
import { GlossProvider } from "../../../GlossText";
import { glossFrom } from "@/lib/glossary";

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAccess();
  const { id } = await params;
  const story = STORIES.find((s) => s.id === id);
  if (!story) notFound();
  const best = (await loadStoryProgress())[story.id] ?? null;
  const gloss = glossFrom([...story.lines.map((l) => l[0]), ...(story.moral ? [story.moral[0]] : [])]);
  // The story's own word list says what a word means in this story, so it wins over the general list.
  for (const [bn, , en] of story.vocab) if (!/\s/.test(bn)) gloss[bn] = en;
  return (
    <LessonFrame lessonId={`reading/story-${story.id}`}>
      <GlossProvider gloss={gloss}><StoryReader story={story} best={best} /></GlossProvider>
      <StoryConjuncts story={story} />
    </LessonFrame>
  );
}
