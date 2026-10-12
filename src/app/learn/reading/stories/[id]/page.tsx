import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadStoryProgress } from "@/lib/progress";
import { STORIES } from "@/data/stories";
import StoryReader from "./StoryReader";

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAccess();
  const { id } = await params;
  const story = STORIES.find((s) => s.id === id);
  if (!story) notFound();
  const best = (await loadStoryProgress())[story.id] ?? null;
  return (
    <main data-seg="reading">
      <Link href="/learn/reading/stories" className="back">← All stories</Link>
      <StoryReader story={story} best={best} />
    </main>
  );
}
