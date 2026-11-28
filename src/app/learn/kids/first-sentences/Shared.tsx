"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CheatRow, Item } from "@/data/kids-first-sentences";
import { sayItem } from "@/lib/say-item";
import Icon from "../../Icon";
import "./first-sentences.css";

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="fs-toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

/** The app's buttons: the main action solid, the rest outlined. Tall enough for small fingers (56px). */
export function Btn({ kind = "primary", className = "", ...rest }: { kind?: "primary" | "ghost" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...rest} className={`btn fs-btn${kind === "ghost" ? " ghost" : ""} ${className}`} />;
}

/** True after the first client render. Shuffled content waits for it, so the server and the browser never disagree. */
export function useMounted(): boolean {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

export function SayButton({ id, bengali, label = "Hear it", className = "" }: { id: string; bengali: string; label?: string; className?: string }) {
  return (
    <button type="button" className={"fs-say " + className} aria-label={`${label}: ${bengali}`} onClick={() => sayItem(id, bengali)}>
      <Icon name="sound" size={26} />
    </button>
  );
}

/** Bengali script (large), Banglish and English, always together. */
export function Line({ item, size = "m", say = true }: { item: Item; size?: "s" | "m" | "l"; say?: boolean }) {
  return (
    <div className={`fs-line ${size}`}>
      <div className="fs-line-text">
        <p className="fs-bn" lang="bn">{item.bengali}</p>
        <p className="fs-ro">{item.roman}</p>
        <p className="fs-en">{item.english}</p>
      </div>
      {say && <SayButton id={item.id} bengali={item.bengali} />}
    </div>
  );
}

const PARTS = [
  { slug: "learn", label: "1 Learn" },
  { slug: "roleplay", label: "2 Roleplay" },
  { slug: "practice", label: "3 Practice" },
  { slug: "notes", label: "4 Notes" },
];

/** The four parts of the module, and the cheat sheet that can be opened from any of them. */
export function PartNav({ cheatSheet }: { cheatSheet: CheatRow[] }) {
  const path = usePathname();
  return (
    <div className="fs-nav">
      <nav aria-label="Parts of this lesson" className="fs-parts">
        {PARTS.map((p) => {
          const href = `/learn/kids/first-sentences/${p.slug}`;
          const on = path === href;
          return <Link key={p.slug} href={href} className={"fs-part" + (on ? " on" : "")} aria-current={on ? "page" : undefined}>{p.label}</Link>;
        })}
      </nav>
      <CheatSheetButton rows={cheatSheet} />
    </div>
  );
}

export function CheatTable({ rows }: { rows: CheatRow[] }) {
  return (
    <div className="fs-table-wrap">
      <table className="fs-table">
        <caption className="visually-hidden">Cheat sheet: what to say in each situation</caption>
        <thead><tr><th scope="col">When I want to…</th><th scope="col">I say</th><th scope="col">Example</th><th scope="col"><span className="visually-hidden">Hear it</span></th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <th scope="row">{r.situation}</th>
              <td className="fs-frame-cell">{r.frame}</td>
              <td>
                <span className="fs-bn s" lang="bn">{r.example.bengali}</span>
                <span className="fs-ro">{r.example.roman}</span>
                <span className="fs-en">{r.example.english}</span>
              </td>
              <td><SayButton id={r.example.id} bengali={r.example.bengali} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The cheat sheet in a pop-up (a native dialog: Esc closes it and focus stays inside while it is open). */
function CheatSheetButton({ rows }: { rows: CheatRow[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" className="btn ghost fs-cheat-btn" onClick={() => ref.current?.showModal?.()}><Icon name="list" size={20} /> Cheat sheet</button>
      <dialog ref={ref} className="fs-dialog" aria-label="Cheat sheet" onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}>
        <div className="fs-dialog-box">
          <div className="fs-dialog-head">
            <h2>Cheat sheet</h2>
            <button type="button" className="btn" onClick={() => ref.current?.close()}>Close</button>
          </div>
          <CheatTable rows={rows} />
        </div>
      </dialog>
    </>
  );
}

/** A burst of paper pieces. Pure CSS, positions fixed by index (no randomness), and it stays still when motion is reduced. */
export function Confetti() {
  const colours = ["#e5484d", "#f5a524", "#2f9e5b", "#2f6fe5", "#9b4dca", "#f06595"];
  return (
    <div className="fs-confetti" aria-hidden>
      {Array.from({ length: 28 }, (_, i) => (
        <span key={i} style={{ left: `${(i * 37) % 100}%`, background: colours[i % colours.length], animationDelay: `${(i % 7) * 0.12}s`, animationDuration: `${2.4 + (i % 5) * 0.3}s`, transform: `rotate(${(i * 53) % 360}deg)` }} />
      ))}
    </div>
  );
}
