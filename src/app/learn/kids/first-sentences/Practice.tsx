"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { finishFirstSentences } from "../../../actions";
import type { BuildItem, FirstSentences, FixItem, MeaningItem, Word } from "@/data/kids-first-sentences";
import { buildTiles, checkBuild, checkFixChoice, checkFixTap, checkMeaningChoice, checkMeaningTyped, fixedSentence, meaningOptions, shuffled, wrongIndex, type Tile } from "@/lib/first-sentences";
import { sayItem } from "@/lib/say-item";
import Icon from "../../Icon";
import { Btn, Confetti, PartNav, SayButton, Toggle, useMounted } from "./Shared";

type Which = "fix" | "build" | "meaning";
const TABS: { id: Which; label: string; blurb: string }[] = [
  { id: "fix", label: "A Fix it!", blurb: "Find the word that does not match, then fix it." },
  { id: "build", label: "B Build it", blurb: "Put the words in order to make a sentence." },
  { id: "meaning", label: "C What does it mean?", blurb: "Read the Bengali. Pick what it means." },
];

/** The star and the cheer after a right answer. */
function Cheer({ text = "Shabash!" }: { text?: string }) {
  return <p className="fs-cheer" role="status"><Icon name="medal" size={28} /> <b>{text}</b> <span lang="bn">শাবাশ!</span></p>;
}
function Stars({ n, total }: { n: number; total: number }) {
  return <span className="fs-stars" role="img" aria-label={`${n} of ${total} stars`}>{Array.from({ length: total }, (_, i) => <span key={i} className={i < n ? "on" : ""} aria-hidden>★</span>)}</span>;
}
/** The end of one exercise: a cheer, the stars, confetti, and a way to go again or move on. */
function Finish({ stars, total, onAgain, onNext, nextLabel }: { stars: number; total: number; onAgain: () => void; onNext?: () => void; nextLabel?: string }) {
  return (
    <div className="fs-finish" role="status">
      <Confetti />
      <p className="fs-bn l" lang="bn">শাবাশ!</p>
      <p className="fs-ro">Shabash!</p>
      <p className="fs-en">You finished this one.</p>
      <Stars n={stars} total={total} />
      <div className="fs-actions">
        <Btn onClick={onAgain}>Play again</Btn>
        {onNext && <Btn kind="ghost" onClick={onNext}>{nextLabel}</Btn>}
      </div>
    </div>
  );
}

// ================================================================ A. Fix it!
function FixIt({ items, onDone }: { items: FixItem[]; onDone: (stars: number) => void }) {
  const [i, setI] = useState(0);
  const [stage, setStage] = useState<"tap" | "choose" | "fixed">("tap");
  const [shake, setShake] = useState<string | null>(null);   // the word or option that shakes
  const [msg, setMsg] = useState("");
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  const item = items[i];
  const options = useMemo(() => shuffled(item.options), [item]);
  const wake = (k: string) => { setShake(null); requestAnimationFrame(() => setShake(k)); };

  function tap(n: number) {
    if (stage !== "tap") return;
    if (checkFixTap(item, n)) { setStage("choose"); setMsg(""); setShake(null); }
    else { wake(`w${n}`); setMsg("Hmm, that one fits. Try another word."); }
  }
  function choose(o: Word) {
    if (stage !== "choose") return;
    if (checkFixChoice(item, o)) { setStage("fixed"); setMsg(""); setShake(null); setStars((s) => s + 1); }
    else { wake(`o${o.roman}`); setMsg("Not that one. Try again!"); }
  }
  function next() {
    if (i + 1 >= items.length) { setDone(true); onDone(stars); return; }
    setI(i + 1); setStage("tap"); setMsg(""); setShake(null);
  }
  const restart = () => { setI(0); setStage("tap"); setMsg(""); setStars(0); setDone(false); };
  if (done) return <Finish stars={stars} total={items.length} onAgain={restart} />;

  const sentence = stage === "fixed" ? fixedSentence(item) : item.sentence;
  const wi = wrongIndex(item);
  return (
    <div className="fs-card">
      <p className="fs-count">{i + 1} of {items.length} · <Stars n={stars} total={items.length} /></p>
      <p className="fs-prompt">Which word does not match?</p>
      <p className="fs-en big">“{item.english}”</p>
      <div className="fs-row" role="group" aria-label="The Bengali sentence. Tap a word.">
        {sentence.map((w, n) => (
          <button key={n} type="button" disabled={stage !== "tap"} className={"fs-tile" + (shake === `w${n}` ? " shake" : "") + (stage !== "tap" && n === wi ? (stage === "fixed" ? " good" : " mark") : "")} onClick={() => tap(n)}>
            <span className="fs-bn m" lang="bn">{w.bengali}</span><span className="fs-ro">{w.roman}</span>
          </button>
        ))}
      </div>
      {stage === "choose" && (
        <>
          <p className="fs-prompt">Which word should go there?</p>
          <div className="fs-row" role="group" aria-label="Choose the right word">
            {options.map((o) => (
              <button key={o.roman} type="button" className={"fs-tile choice" + (shake === `o${o.roman}` ? " shake" : "")} onClick={() => choose(o)}>
                <span className="fs-bn m" lang="bn">{o.bengali}</span><span className="fs-ro">{o.roman}</span>
              </button>
            ))}
          </div>
        </>
      )}
      <p className="fs-msg" role="status" aria-live="polite">{msg}</p>
      {stage === "fixed" && (
        <div className="fs-reward">
          <Cheer text="Right! A star for you." />
          <p className="fs-ro">{sentence.map((w) => w.roman).join(" ")}</p>
          <SayButton id={`fs-fix-${item.id}`} bengali={sentence.map((w) => w.bengali).join(" ")} label="Hear the sentence" />
          <Btn onClick={next}>{i + 1 >= items.length ? "Finish" : "Next"}</Btn>
        </div>
      )}
    </div>
  );
}

// ================================================================ B. Build the sentence
function BuildIt({ items, onDone }: { items: BuildItem[]; onDone: (stars: number) => void }) {
  const [i, setI] = useState(0);
  const item = items[i];
  const [pool, setPool] = useState<Tile[]>(() => buildTiles(items[0], () => 0.5));
  const [placed, setPlaced] = useState<Tile[]>([]);
  const [msg, setMsg] = useState("");
  const [shake, setShake] = useState(false);
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  const mounted = useMounted();
  const dragKey = useRef<string | null>(null);
  const result = checkBuild(item, placed);
  const solved = result === "correct";

  // a fresh shuffle for each sentence, once the page is in the browser
  useEffect(() => { setPool(buildTiles(item)); setPlaced([]); setMsg(""); }, [item]);

  function place(t: Tile, at?: number) {
    if (solved) return;
    const next = placed.slice();
    next.splice(at ?? next.length, 0, t);
    setPool((p) => p.filter((x) => x.key !== t.key));
    setPlaced(next);
    const r = checkBuild(item, next);
    if (r === "correct") { setMsg(""); setStars((s) => s + 1); }
    else if (r === "wrong") { setMsg("Almost! Tap a word to move it back, then try again."); setShake(true); setTimeout(() => setShake(false), 500); }
    else setMsg("");
  }
  function unplace(t: Tile) {
    if (solved) return;
    setPlaced((p) => p.filter((x) => x.key !== t.key));
    setPool((p) => [...p, t]);
    setMsg("");
  }
  const reset = () => { if (solved) return; setPool(buildTiles(item)); setPlaced([]); setMsg(""); };
  const find = (k: string) => [...pool, ...placed].find((t) => t.key === k);
  function next() { if (i + 1 >= items.length) { setDone(true); onDone(stars); } else setI(i + 1); }
  const restart = () => { setI(0); setStars(0); setDone(false); setPlaced([]); setPool(buildTiles(items[0])); setMsg(""); };
  if (done) return <Finish stars={stars} total={items.length} onAgain={restart} />;
  if (!mounted) return <div className="fs-card" aria-busy="true">Getting the words…</div>;

  return (
    <div className="fs-card">
      <p className="fs-count">{i + 1} of {items.length} · <Stars n={stars} total={items.length} /></p>
      <p className="fs-prompt">Put the words in order to make a sentence.</p>
      <div className={"fs-slots" + (shake ? " shake" : "") + (solved ? " good" : "")} role="group" aria-label="Your sentence"
        onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const t = dragKey.current && find(dragKey.current); if (t && pool.includes(t)) place(t); dragKey.current = null; }}>
        {placed.length === 0 && <span className="fs-slot-hint">Tap or drag the words here</span>}
        {placed.map((t, n) => (
          <button key={t.key} type="button" disabled={solved} className="fs-tile placed" draggable={!solved}
            onClick={() => unplace(t)} aria-label={`${t.word.roman}. Tap to move it back.`}
            onDragStart={() => { dragKey.current = t.key; }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); e.stopPropagation(); const d = dragKey.current && find(dragKey.current); if (d && pool.includes(d)) place(d, n); dragKey.current = null; }}>
            <span className="fs-bn m" lang="bn">{t.word.bengali}</span><span className="fs-ro">{t.word.roman}</span>
          </button>
        ))}
      </div>
      <div className="fs-row" role="group" aria-label="Words to use"
        onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const t = dragKey.current && find(dragKey.current); if (t && placed.includes(t)) unplace(t); dragKey.current = null; }}>
        {pool.map((t) => (
          <button key={t.key} type="button" className="fs-tile" draggable onClick={() => place(t)} onDragStart={() => { dragKey.current = t.key; }}>
            <span className="fs-bn m" lang="bn">{t.word.bengali}</span><span className="fs-ro">{t.word.roman}</span>
          </button>
        ))}
        {pool.length === 0 && !solved && <span className="fs-slot-hint">All the words are in the sentence.</span>}
      </div>
      <p className="fs-msg" role="status" aria-live="polite">{msg}</p>
      {!solved && placed.length > 0 && <Btn kind="ghost" onClick={reset}>Start over</Btn>}
      {solved && (
        <div className="fs-reward">
          <Cheer text="You built it! A star for you." />
          <p className="fs-bn l" lang="bn">{item.answer.bengali}</p>
          <p className="fs-ro">{item.answer.roman}</p>
          <p className="fs-en">{item.answer.english}</p>
          <div className="fs-actions">
            <Btn kind="ghost" onClick={() => sayItem(item.answer.id, item.answer.bengali)}><Icon name="sound" size={22} /> Read aloud</Btn>
            <Btn onClick={next}>{i + 1 >= items.length ? "Finish" : "Next"}</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ================================================================ C. What does it mean?
function Meaning({ items, onDone }: { items: MeaningItem[]; onDone: (stars: number) => void }) {
  const [i, setI] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const [typeIt, setTypeIt] = useState(false);       // off by default
  const [four, setFour] = useState(false);
  const [wrong, setWrong] = useState<string[]>([]);  // options already tried
  const [typed, setTyped] = useState("");
  const [msg, setMsg] = useState("");
  const [shake, setShake] = useState<string | null>(null);
  const [right, setRight] = useState(false);
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  const mounted = useMounted();
  const item = items[i];
  const options = useMemo(() => (mounted ? meaningOptions(items, i, four ? 4 : 3) : []), [items, i, four, mounted]);
  const wake = (k: string) => { setShake(null); requestAnimationFrame(() => setShake(k)); };

  function win() { setRight(true); setMsg(""); setStars((s) => s + 1); }
  function pick(o: string) {
    if (right || wrong.includes(o)) return;
    if (checkMeaningChoice(item, o)) win(); else { setWrong((w) => [...w, o]); wake(o); setMsg("Not quite. Try another one!"); }
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (right || !typed.trim()) return;
    if (checkMeaningTyped(item, typed)) win(); else { wake("typed"); setMsg("Not quite. Say it again out loud, then try again."); }
  }
  function next() {
    if (i + 1 >= items.length) { setDone(true); onDone(stars); return; }
    setI(i + 1); setWrong([]); setTyped(""); setMsg(""); setRight(false); setShake(null);
  }
  const restart = () => { setI(0); setWrong([]); setTyped(""); setMsg(""); setRight(false); setStars(0); setDone(false); };
  if (done) return <Finish stars={stars} total={items.length} onAgain={restart} />;

  return (
    <div className="fs-card">
      <p className="fs-count">{i + 1} of {items.length} · <Stars n={stars} total={items.length} /></p>
      <div className="fs-toggles">
        <Toggle label="Show Bengali script" checked={showScript} onChange={setShowScript} />
        <Toggle label="Type the answer" checked={typeIt} onChange={(v) => { setTypeIt(v); setMsg(""); }} />
        {!typeIt && <Toggle label="More choices" checked={four} onChange={(v) => { setFour(v); setWrong([]); }} />}
      </div>
      <div className="fs-say-row">
        <div>
          <p className="fs-ro big">{item.phrase.roman}</p>
          {showScript && <p className="fs-bn m" lang="bn">{item.phrase.bengali}</p>}
        </div>
        <SayButton id={item.phrase.id} bengali={item.phrase.bengali} />
      </div>
      <p className="fs-prompt">What does it mean?</p>
      {!typeIt ? (
        <div className="fs-opts" role="group" aria-label="Choose the meaning">
          {options.map((o) => (
            <button key={o} type="button" className={"fs-opt" + (shake === o ? " shake" : "") + (right && checkMeaningChoice(item, o) ? " good" : "")} disabled={right || wrong.includes(o)} onClick={() => pick(o)}>{o}</button>
          ))}
        </div>
      ) : (
        <form className="fs-type" onSubmit={submit}>
          <label className="visually-hidden" htmlFor="fs-typed">What does it mean in English?</label>
          <input id="fs-typed" className={shake === "typed" ? "shake" : ""} value={typed} onChange={(e) => setTyped(e.target.value)} disabled={right} autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder="Type the English meaning" />
          <Btn type="submit" disabled={right || !typed.trim()}>Check</Btn>
        </form>
      )}
      <p className="fs-msg" role="status" aria-live="polite">{msg}</p>
      {right && (
        <div className="fs-reward">
          <Cheer text="Right! A star for you." />
          <p className="fs-bn m" lang="bn">{item.phrase.bengali}</p>
          <p className="fs-en">{item.meaning}</p>
          <Btn onClick={next}>{i + 1 >= items.length ? "Finish" : "Next"}</Btn>
        </div>
      )}
    </div>
  );
}

// ================================================================ the page
export default function Practice({ data }: { data: FirstSentences }) {
  const [tab, setTab] = useState<Which>("fix");
  const [stars, setStars] = useState<Partial<Record<Which, number>>>({});
  const [round, setRound] = useState<Record<Which, number>>({ fix: 0, build: 0, meaning: 0 });
  const saved = useRef(false);
  const all = (["fix", "build", "meaning"] as Which[]).every((k) => stars[k] !== undefined);
  const total = (stars.fix ?? 0) + (stars.build ?? 0) + (stars.meaning ?? 0);
  const totalMax = data.practice.fix.length + data.practice.build.length + data.practice.meaning.length;

  useEffect(() => { if (all && !saved.current) { saved.current = true; void finishFirstSentences("practice"); } }, [all]);

  const finished = (k: Which) => (n: number) => setStars((s) => ({ ...s, [k]: n }));
  const replay = (k: Which) => { setRound((r) => ({ ...r, [k]: r[k] + 1 })); setStars((s) => { const c = { ...s }; delete c[k]; return c; }); };

  return (
    <div className="fs">
      <PartNav cheatSheet={data.cheatSheet} />
      <h2>Practice</h2>
      <p className="fs-help">Three games. No timer, no rush. A wrong answer just means try again.</p>
      {all && (
        <div className="fs-finish all" role="status">
          <Confetti />
          <p className="fs-bn l" lang="bn">শাবাশ!</p>
          <p className="fs-ro">Shabash! You finished all three games.</p>
          <Stars n={total} total={totalMax} />
          <p className="fs-help">Play any game again whenever you like.</p>
          <div className="fs-actions">
            {TABS.map((t) => <Btn key={t.id} kind="ghost" onClick={() => { replay(t.id); setTab(t.id); }}>Replay {t.label}</Btn>)}
          </div>
        </div>
      )}
      <div className="fs-tabs" role="tablist" aria-label="Exercises">
        {TABS.map((t) => (
          <button key={t.id} id={`fs-tab-${t.id}`} role="tab" type="button" aria-selected={tab === t.id} aria-controls={`fs-panel-${t.id}`} className={"fs-tab" + (tab === t.id ? " on" : "")} onClick={() => setTab(t.id)}>
            {t.label}{stars[t.id] !== undefined && <span className="fs-check" aria-label="finished"> ✓</span>}
          </button>
        ))}
      </div>
      {/* all three stay mounted, so switching games never loses progress */}
      {TABS.map((t) => (
        <div key={t.id} id={`fs-panel-${t.id}`} role="tabpanel" aria-labelledby={`fs-tab-${t.id}`} hidden={tab !== t.id}>
          <p className="fs-help">{t.blurb}</p>
          {t.id === "fix" && <FixIt key={round.fix} items={data.practice.fix} onDone={finished("fix")} />}
          {t.id === "build" && <BuildIt key={round.build} items={data.practice.build} onDone={finished("build")} />}
          {t.id === "meaning" && <Meaning key={round.meaning} items={data.practice.meaning} onDone={finished("meaning")} />}
        </div>
      ))}
    </div>
  );
}
