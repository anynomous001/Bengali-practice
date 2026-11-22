// The list of lessons the teacher can attach a PDF to, grouped by course and module. Server-only (read by the admin page).
import { COURSES } from "@/data/curriculum";

export type PickerLesson = { id: string; title: string };
export type PickerGroup = { label: string; lessons: PickerLesson[] };

export function lessonPickerGroups(): PickerGroup[] {
  return COURSES.flatMap((c) => c.modules.map((m) => ({ label: `${c.title} · ${m.title}`, lessons: m.lessons.map((l) => ({ id: l.id, title: `${m.title}: ${l.title}` })) })));
}
