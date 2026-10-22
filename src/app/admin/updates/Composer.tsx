"use client";

import { useRef, useState, useTransition } from "react";
import { countAudience, previewHtml, sendTest, sendToStudents, type SendResult } from "./actions";

export type Template = { subject: string; heading: string; intro: string; bullets: string; closing: string; buttonLabel: string };

export default function Composer({ template, counts }: { template: Template; counts: { active: number; all: number } }) {
  const form = useRef<HTMLFormElement>(null);
  const [html, setHtml] = useState("");
  const [audience, setAudience] = useState<"active" | "all">("active");
  const [result, setResult] = useState<SendResult | null>(null);
  const [busy, start] = useTransition();
  const data = () => new FormData(form.current!);
  const n = counts[audience];

  const run = (fn: () => Promise<void>) => start(async () => { setResult(null); await fn(); });

  return (
    <div className="upd">
      <form ref={form} className="upd-form" onSubmit={(e) => e.preventDefault()}>
        <label>Subject line<input name="subject" defaultValue={template.subject} maxLength={150} required /></label>
        <label>Heading in the email<input name="heading" defaultValue={template.heading} maxLength={150} required /></label>
        <p className="muted upd-tip">Type {"{name}"} anywhere to use the student's first name. If they have not set a name, it becomes "there". The preview uses "Asha".</p>
        <label>Opening<textarea name="intro" defaultValue={template.intro} rows={3} maxLength={800} /></label>
        <label>What is new (one per line)<textarea name="bullets" defaultValue={template.bullets} rows={8} maxLength={4000} /></label>
        <label>Closing<textarea name="closing" defaultValue={template.closing} rows={2} maxLength={800} /></label>
        <label>Button text<input name="buttonLabel" defaultValue={template.buttonLabel} maxLength={40} /></label>

        <div className="upd-actions">
          <button type="button" className="btn ghost" disabled={busy} onClick={() => run(async () => setHtml(await previewHtml(data())))}>Preview</button>
          <button type="button" className="btn ghost" disabled={busy} onClick={() => run(async () => setResult(await sendTest(data())))}>Send a test to me</button>
        </div>

        <fieldset className="upd-send">
          <legend>Send to students</legend>
          <label className="upd-radio"><input type="radio" name="audience" value="active" checked={audience === "active"} onChange={() => setAudience("active")} /> Students with active access ({counts.active})</label>
          <label className="upd-radio"><input type="radio" name="audience" value="all" checked={audience === "all"} onChange={() => setAudience("all")} /> Everyone on the list, including expired ({counts.all})</label>
          <p className="muted">People who stopped update emails are left out of both counts.</p>
          <label className="upd-radio"><input type="checkbox" name="confirm" /> I checked the preview and want to send this to {n} {n === 1 ? "person" : "people"}.</label>
          <button type="button" className="btn" disabled={busy || n === 0} onClick={() => run(async () => { const r = await sendToStudents(data()); if (r) setResult(r); })}>
            {busy ? "Working…" : `Send to ${n}`}
          </button>
        </fieldset>
        {result && <p role="status" className={result.ok ? "upd-ok" : "upd-bad"}>{result.message}</p>}
      </form>

      <div className="upd-preview">
        <p className="eyebrow">Preview</p>
        {html ? <iframe title="Email preview" srcDoc={html} sandbox="" /> : <p className="muted">Press Preview to see the email.</p>}
      </div>
    </div>
  );
}
