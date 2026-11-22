// PDFs the teacher uploads and attaches to lessons. Server-only.
import { findLesson } from "@/data/curriculum";
import { query } from "./db";

export const MAX_PDF_BYTES = 30 * 1024 * 1024;
export const CHUNK_BYTES = 3 * 1024 * 1024; // each piece stays under the host's 4.5 MB request limit

export type LessonFile = { id: number; title: string; filename: string; size: number; created_at: Date };
export type LessonFileWithLessons = LessonFile & { lessons: { id: string; title: string }[] };

/** The PDFs attached to one lesson, newest first. */
export async function filesForLesson(lessonId: string): Promise<LessonFile[]> {
  return query<LessonFile>(
    `SELECT f.id, f.title, f.filename, f.size, f.created_at FROM lesson_files f
     JOIN lesson_file_links l ON l.file_id = f.id WHERE l.lesson_id = $1 ORDER BY f.created_at DESC`,
    [lessonId],
  );
}

const lessonLabel = (id: string) => { const at = findLesson(id); return at ? `${at.module.title}: ${at.lesson.title}` : id; };

/** Every PDF with the lessons it is attached to, for the teacher's list. */
export async function allFiles(): Promise<LessonFileWithLessons[]> {
  const files = await query<LessonFile>("SELECT id, title, filename, size, created_at FROM lesson_files ORDER BY created_at DESC");
  const links = await query<{ file_id: number; lesson_id: string }>("SELECT file_id, lesson_id FROM lesson_file_links ORDER BY lesson_id");
  return files.map((f) => ({
    ...f,
    lessons: links.filter((l) => l.file_id === f.id).map((l) => ({ id: l.lesson_id, title: lessonLabel(l.lesson_id) })),
  }));
}

/** Only lesson ids that exist in the curriculum, once each. */
export const cleanLessonIds = (ids: unknown): string[] =>
  [...new Set((Array.isArray(ids) ? ids : []).map(String))].filter((id) => !!findLesson(id)).slice(0, 60);

export const fmtSize = (n: number) => (n >= 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
