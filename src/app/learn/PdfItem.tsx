"use client";

import { useState } from "react";
import Icon from "./Icon";

/** One lesson PDF: a title, and a button that opens it right on the page. The file loads only when opened. */
export default function PdfItem({ id, title, size, date }: { id: number; title: string; size: string; date: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="lf-item">
      <div className="lf-row">
        <div className="lf-name">
          <b>{title}</b>
          <small>PDF · {size} · added {date}</small>
        </div>
        <div className="lf-actions">
          <button type="button" className="btn small" aria-expanded={open} aria-controls={`pdf-${id}`} onClick={() => setOpen((o) => !o)}>{open ? "Hide" : "View here"}</button>
          <a className="btn ghost small" href={`/api/files/${id}`} target="_blank" rel="noopener">Open in new tab</a>
          <a className="btn ghost small" href={`/api/files/${id}?download=1`}>Download</a>
        </div>
      </div>
      {open && (
        <div id={`pdf-${id}`} className="lf-view">
          <iframe src={`/api/files/${id}#view=FitH`} title={title} loading="lazy" />
          <p className="muted lf-fallback">If the PDF does not show here, use <a href={`/api/files/${id}`} target="_blank" rel="noopener">Open in new tab</a>.</p>
        </div>
      )}
    </li>
  );
}
