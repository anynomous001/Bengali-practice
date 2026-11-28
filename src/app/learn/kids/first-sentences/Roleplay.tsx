"use client";

import { useEffect, useRef, useState } from "react";
import { finishFirstSentences } from "../../../actions";
import type { FirstSentences, Line as DialogueLine } from "@/data/kids-first-sentences";
import { Btn, PartNav, SayButton, Toggle } from "./Shared";

export default function Roleplay({ data }: { data: FirstSentences }) {
  const { speakers, lines } = data.roleplay;
  const [shown, setShown] = useState(1);                    // how many lines are on the page
  const [hideNeel, setHideNeel] = useState(false);          // the child says Neel's lines out loud first
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [withBonus, setWithBonus] = useState(true);
  const end = useRef<HTMLDivElement>(null);
  const saved = useRef(false);
  const list = withBonus ? lines : lines.filter((l) => !l.optional);
  const atEnd = shown >= list.length;

  useEffect(() => {
    if (shown > 1) end.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
  }, [shown]);
  useEffect(() => {
    if (atEnd && !saved.current) { saved.current = true; void finishFirstSentences("roleplay"); }
  }, [atEnd]);

  const restart = () => { setShown(1); setRevealed(new Set()); };
  const reveal = (id: string) => setRevealed((r) => new Set(r).add(id));

  const bubble = (l: DialogueLine) => {
    const who = speakers[l.speaker];
    const covered = hideNeel && l.speaker === "neel" && !revealed.has(l.id);
    return (
      <li key={l.id} className={`fs-bubble ${l.speaker}`}>
        <span className="fs-who" aria-hidden>{who.name[0]}</span>
        <div className="fs-bubble-body">
          <p className="fs-speaker"><b>{who.name}</b> <span lang="bn">{who.bengali}</span>{l.optional && <span className="fs-tag">bonus</span>}</p>
          {l.action && <p className="fs-action">{l.action}</p>}
          {covered ? (
            <>
              <p className="fs-turn">Your turn! Say it in Bengali:</p>
              <p className="fs-en big">{l.english}</p>
              <Btn kind="ghost" onClick={() => reveal(l.id)}>Show me</Btn>
            </>
          ) : (
            <div className="fs-line m">
              <div className="fs-line-text">
                <p className="fs-bn" lang="bn">{l.bengali}</p>
                <p className="fs-ro">{l.roman}</p>
                <p className="fs-en">{l.english}</p>
              </div>
              <SayButton id={l.id} bengali={l.bengali} />
            </div>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="fs">
      <PartNav cheatSheet={data.cheatSheet} />
      <h2>{data.roleplay.title}</h2>
      <p className="fs-help">{data.roleplay.intro}</p>
      <div className="fs-toggles">
        <Toggle label="Hide Neel's lines so I can say them" checked={hideNeel} onChange={(v) => { setHideNeel(v); setRevealed(new Set()); }} />
        <Toggle label="Include the bonus line" checked={withBonus} onChange={(v) => { setWithBonus(v); setShown((s) => Math.min(s, v ? lines.length : lines.filter((l) => !l.optional).length)); }} />
      </div>
      <ol className="fs-chat" aria-live="polite" aria-label="The talk between Ma and Neel">
        {list.slice(0, shown).map(bubble)}
      </ol>
      <div ref={end} />
      <div className="fs-actions">
        {!atEnd ? (
          <Btn onClick={() => setShown((s) => s + 1)}>Next line ({shown} of {list.length})</Btn>
        ) : (
          <>
            <p className="fs-done" role="status"><b lang="bn">শাবাশ!</b> <span>Shabash! You read the whole talk.</span></p>
            <Btn onClick={restart}>Start again</Btn>
          </>
        )}
      </div>
    </div>
  );
}
