"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PickerGroup } from "@/lib/lesson-picker";
import LessonPicker from "./LessonPicker";

const CHUNK = 3 * 1024 * 1024;
const MAX = 30 * 1024 * 1024;

/** Upload a PDF in pieces (so a big scan gets through the host's request limit) and attach it to lessons. */
export default function FileUploader({ groups }: { groups: PickerGroup[] }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [lessons, setLessons] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [pct, setPct] = useState(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function pick(f: File | null) {
    setMsg(null); setFile(f);
    if (f && !title) setTitle(f.name.replace(/\.pdf$/i, "").replace(/[_-]+/g, " ").trim());
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (!file) return setMsg({ ok: false, text: "Choose a PDF first." });
    if (!/\.pdf$/i.test(file.name) && file.type !== "application/pdf") return setMsg({ ok: false, text: "That file isn't a PDF." });
    if (file.size > MAX) return setMsg({ ok: false, text: "That PDF is over 30 MB. Compress it first, then upload again." });
    if (!title.trim()) return setMsg({ ok: false, text: "Give the PDF a title." });
    if (!lessons.length) return setMsg({ ok: false, text: "Choose at least one lesson for it to appear in." });
    setBusy(true); setPct(0); setMsg(null);
    try {
      const upload = crypto.randomUUID();
      const parts = Math.max(1, Math.ceil(file.size / CHUNK));
      for (let i = 0; i < parts; i++) {
        const r = await fetch(`/api/admin/files/part?upload=${upload}&n=${i}`, { method: "POST", headers: { "content-type": "application/octet-stream" }, body: file.slice(i * CHUNK, (i + 1) * CHUNK) });
        if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error ?? "Upload failed. Please try again.");
        setPct(Math.round(((i + 1) / (parts + 1)) * 100));
      }
      const done = await fetch("/api/admin/files", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ upload, parts, title: title.trim(), filename: file.name, lessons }) });
      if (!done.ok) throw new Error((await done.json().catch(() => ({}))).error ?? "Upload failed. Please try again.");
      setPct(100);
      setMsg({ ok: true, text: "Uploaded. It now shows in the lessons you chose." });
      setTitle(""); setFile(null); setLessons([]); if (input.current) input.current.value = "";
      router.refresh();
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Upload failed. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="adm-card stack" aria-busy={busy}>
      <h2>Upload a PDF</h2>
      <p className="muted">Pick the PDF, name it, and choose where it should show up. Students see it inside those lessons, and it opens right there on the page.</p>
      <label>PDF file<input ref={input} type="file" accept="application/pdf,.pdf" onChange={(e) => pick(e.target.files?.[0] ?? null)} disabled={busy} /></label>
      <label>Title students will see<input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} placeholder="For example: Tens worksheet" disabled={busy} /></label>
      <div>
        <b>Show it in these lessons</b>
        <LessonPicker groups={groups} value={lessons} onChange={setLessons} />
      </div>
      <div>
        <button className="btn" disabled={busy}>{busy ? `Uploading… ${pct}%` : "Upload PDF"}</button>
      </div>
      {msg && <p className={"msg " + (msg.ok ? "good" : "bad")} role="status">{msg.text}</p>}
    </form>
  );
}
