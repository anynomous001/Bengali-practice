import Link from "next/link";
import { getUser } from "@/lib/auth";
import { filesForLesson, fmtSize } from "@/lib/lesson-files";
import PdfItem from "./PdfItem";

/** The PDFs the teacher attached to this lesson. Nothing shows when there are none. */
export default async function LessonFiles({ lessonId }: { lessonId: string }) {
  let files;
  try { files = await filesForLesson(lessonId); } catch { return null; } // a page must never fail because of the extras
  if (!files.length) return null;
  const admin = !!(await getUser())?.isAdmin;
  const day = (d: Date) => new Date(d).toLocaleDateString("en-GB", { dateStyle: "medium" });
  return (
    <section className="lf" aria-label="PDFs for this lesson">
      <div className="lf-head">
        <h2>PDFs for this lesson</h2>
        {admin && <Link href="/admin/files" className="lf-manage">Manage PDFs</Link>}
      </div>
      <ul className="lf-list">
        {files.map((f) => <PdfItem key={f.id} id={f.id} title={f.title} size={fmtSize(f.size)} date={day(f.created_at)} />)}
      </ul>
    </section>
  );
}
