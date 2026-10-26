// What is new, so the app can show a "New" tag. Add an id and the date it went live; the tag disappears by itself
// after NEW_FOR_DAYS days. Lesson ids are the ones in curriculum.ts. Goal ids are written "goal:<id>".

export const NEW_FOR_DAYS = 30;

export const ADDED: Record<string, string> = {
  "goal:passion": "2026-10-22",
  "goal:clinical": "2026-10-24",
  "goal:bangladesh": "2026-10-28",
  "vocabulary/bangladesh-words": "2026-10-28",
  "speaking/roleplay-bangladesh-inlaws": "2026-10-28",
  "vocabulary/mouth-voice": "2026-10-24",
  "vocabulary/speech-language": "2026-10-24",
  "vocabulary/therapy-practice": "2026-10-24",
  "speaking/roleplay-clinical-intake": "2026-10-24",
  "speaking/roleplay-clinical-session": "2026-10-24",
  "speaking/roleplay-clinical-home": "2026-10-24",
  "vocabulary/film-tv": "2026-10-25",
  "vocabulary/art-craft": "2026-10-25",
  "vocabulary/science-brain": "2026-10-25",
  "vocabulary/clinical-history": "2026-10-25",
  "vocabulary/swallow-check": "2026-10-26",
  "vocabulary/memory-check": "2026-10-26",
  "speaking/roleplay-clinical-swallow": "2026-10-26",
  "speaking/roleplay-clinical-memory": "2026-10-26",
  "vocabulary/patient-chat": "2026-10-27",
  "speaking/roleplay-clinical-chat": "2026-10-27",
  "speaking/listen-patient": "2026-10-27",
  "speaking/listen-memory": "2026-10-27",
};

/** True for a lesson or goal that went live in the last NEW_FOR_DAYS days. */
export function isNew(id: string, now: number = Date.now()): boolean {
  const added = ADDED[id];
  if (!added) return false;
  const age = (now - new Date(added + "T00:00:00Z").getTime()) / 86_400_000;
  return age < NEW_FOR_DAYS;
}
