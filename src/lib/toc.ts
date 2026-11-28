import type { GrammarTopic } from "@/data/grammar";

export type TocItem = { id: string; label: string };

/** The "On this page" list for a lesson: its sections, then practice. Section elements carry id="sec-<id>". */
/** The tense lessons that carry their own translation practice, and the translation-drill tenses each one covers. */
export const TENSE_TOPIC_DRILLS: Record<string, string[]> = {
  "tense-present": ["pres", "cont", "perf", "perfcont"],
  "tense-past": ["past", "pastcont", "pastperf", "habit"],
  "tense-future": ["fut", "futcont", "futperf"],
};

export const topicToc = (t: Pick<GrammarTopic, "sections"> & { id?: string }): TocItem[] => [
  ...t.sections.map((s) => ({ id: `sec-${s.id}`, label: s.title })),
  { id: "sec-practice", label: "Practice" },
  ...(t.id && TENSE_TOPIC_DRILLS[t.id] ? [{ id: "sec-translate", label: "Translation practice" }] : []),
];
