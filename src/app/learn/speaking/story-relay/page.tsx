import { requireAccess } from "@/lib/access";
import { CARDS, GLOSSARY, HELPERS, HOOKS, OPENINGS, RULES, SAMPLE_A, THEMES, WRAP } from "@/data/story-relay";
import LessonFrame from "../../LessonFrame";
import StoryRelay from "./StoryRelay";

export default async function StoryRelayPage() {
  await requireAccess();
  const toc = [
    { id: "sec-meaning", label: "What it means" },
    { id: "sec-rules", label: "The rules" },
    { id: "sec-helpers", label: "Helper words" },
    { id: "sec-hooks", label: "Hooks" },
    { id: "sec-a", label: "Option A: free" },
    { id: "sec-sample", label: "A full sample story" },
    { id: "sec-b", label: "Option B: tense cards" },
    { id: "sec-wrap", label: "Wrap-up" },
    { id: "sec-practice", label: "Play" },
  ];
  return (
    <LessonFrame lessonId="speaking/story-relay" toc={toc}>
      <StoryRelay glossary={GLOSSARY} rules={RULES} helpers={HELPERS} hooks={HOOKS} themes={THEMES} openings={OPENINGS} sampleA={SAMPLE_A} cards={CARDS} wrap={WRAP} />
    </LessonFrame>
  );
}
