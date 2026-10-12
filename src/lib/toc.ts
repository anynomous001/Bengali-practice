import type { GrammarTopic } from "@/data/grammar";

export type TocItem = { id: string; label: string };

/** The "On this page" list for a lesson: its sections, then practice. Section elements carry id="sec-<id>". */
export const topicToc = (t: Pick<GrammarTopic, "sections">): TocItem[] => [
  ...t.sections.map((s) => ({ id: `sec-${s.id}`, label: s.title })),
  { id: "sec-practice", label: "Practice" },
];
