import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findLesson } from "@/data/curriculum";
import { getUser } from "@/lib/auth";
import { allFiles, fmtSize } from "@/lib/lesson-files";
import { lessonPickerGroups } from "@/lib/lesson-picker";
import { fileStoreReady } from "@/lib/storage";
import Icon from "../../learn/Icon";
import Toast from "../../Toast";
import { deleteLessonFile } from "../actions";
import FileUploader from "./FileUploader";
import RetagForm from "./RetagForm";

export const metadata: Metadata = { title: "PDFs for lessons", robots: { index: false } };

export default async function FilesPage({ searchParams }: { searchParams: Promise<{ notice?: string }> }) {
  const { notice } = await searchParams;
  const user = await getUser();
  if (!user?.isAdmin) notFound();
  const files = await allFiles();
  const groups = lessonPickerGroups();
  const day = (d: Date) => new Date(d).toLocaleDateString("en-GB", { dateStyle: "medium" });
  return (
    <div className="page adm">
      <Toast message={notice} kind="good" clearParam="notice" />
      <header className="adm-head">
        <div>
          <p className="eyebrow">Teacher area</p>
          <h1>PDFs for lessons</h1>
        </div>
        <div className="adm-head-links">
          <Link href="/admin" className="navbtn"><Icon name="prev" size={16} />Admin</Link>
        </div>
      </header>

      {!fileStoreReady() && <p className="msg bad" role="status">File storage isn&apos;t set up on this site yet, so uploads will not work.</p>}
      <FileUploader groups={groups} />

      <section className="adm-card flush" aria-label="Uploaded PDFs">
        <h2 className="adm-pad">Uploaded PDFs ({files.length})</h2>
        {files.length === 0 && <p className="muted adm-pad">Nothing uploaded yet.</p>}
        {files.map((f) => (
          <div key={f.id} className="adm-file">
            <div className="adm-file-top">
              <div>
                <b>{f.title}</b>
                <small className="muted"> {f.filename} · {fmtSize(f.size)} · {day(f.created_at)}</small>
              </div>
              <div className="adm-actions">
                <a className="btn ghost small" href={`/api/files/${f.id}`} target="_blank" rel="noopener">Open</a>
                <form action={deleteLessonFile}><input type="hidden" name="id" value={f.id} /><button className="btn ghost small" aria-label={`Remove ${f.title}`}>Remove</button></form>
              </div>
            </div>
            <p className="adm-file-lessons">
              <span className="muted">Shown in:</span>{" "}
              {f.lessons.map((l) => <Link key={l.id} className="lpk-chip static" href={findLesson(l.id)?.lesson.href ?? "/learn"}>{l.title}</Link>)}
            </p>
            <details>
              <summary>Change the lessons</summary>
              <RetagForm id={f.id} groups={groups} initial={f.lessons.map((l) => l.id)} />
            </details>
          </div>
        ))}
      </section>
    </div>
  );
}
