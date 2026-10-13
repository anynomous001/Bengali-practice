import { requireAccess } from "@/lib/access";
import { CARDS, HELPERS, OPENINGS, SAMPLE_A, SAMPLE_B } from "@/data/story-relay";
import LessonFrame from "../../LessonFrame";
import StoryRelay from "./StoryRelay";

export default async function StoryRelayPage() {
  await requireAccess();
  const toc = [
    { id: "sec-rules", label: "How it works" },
    { id: "sec-helpers", label: "Helper words" },
    { id: "sec-a", label: "Option A: free" },
    { id: "sec-b", label: "Option B: with tenses" },
    { id: "sec-wrap", label: "Wrap-up" },
    { id: "sec-practice", label: "Play" },
  ];
  return (
    <LessonFrame lessonId="speaking/story-relay" toc={toc}>
      <StoryRelay helpers={HELPERS} openings={OPENINGS} cards={CARDS} sampleA={SAMPLE_A} sampleB={SAMPLE_B} />
    </LessonFrame>
  );
}
