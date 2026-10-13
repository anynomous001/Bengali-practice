"use client";

import { useState } from "react";
import type { Helper, Hook, L, RelayCard, RelayOpening, Theme } from "@/data/story-relay";
import { speak } from "@/lib/speak";
import { setLessonDone } from "../../../actions";
import Icon from "../../Icon";
import { useRoman } from "../../Roman";

type Sample = { who: "you" | "partner"; lines: L[]; note: string };
type Wrap = { retell: L[]; short: L[] };

function Listen({ text, label }: { text: string; label: string }) {
  return <button type="button" className="wplay" onClick={() => speak(text)} aria-label={`Hear: ${label}`}><Icon name="sound" size={18} /></button>;
}

/** Sentences as a plain table: Bengali (with a listen button), romanized, English. */
function Lines({ lines, caption }: { lines: L[]; caption?: string }) {
  const { roman } = useRoman();
  return (
    <table className="relay-table">
      {caption && <caption>{caption}</caption>}
      <thead><tr><th scope="col">Bengali</th>{roman && <th scope="col">Romanized</th>}<th scope="col">Meaning</th></tr></thead>
      <tbody>
        {lines.map((l) => (
          <tr key={l[0]}>
            <td><span className="rt-bn"><Listen text={l[0]} label={l[2]} /><span lang="bn">{l[0]}</span></span></td>
            {roman && <td className="rt-ro">{l[1]}</td>}
            <td>{l[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Bn({ l }: { l: L }) {
  const { roman } = useRoman();
  return <span className="rt-bn"><Listen text={l[0]} label={l[2]} /><span><b lang="bn">{l[0]}</b>{roman && <small className="rt-ro">{l[1]}</small>}</span></span>;
}

const TURNS = 5;
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const pickN = <T,>(a: T[], n: number) => [...a].sort(() => Math.random() - 0.5).slice(0, n);

function Play({ openings, themes, cards, helpers, hooks }: { openings: RelayOpening[]; themes: Theme[]; cards: RelayCard[]; helpers: Helper[]; hooks: Hook[] }) {
  const [mode, setMode] = useState<"a" | "b">("a");
  const [theme, setTheme] = useState("all");
  const [opening, setOpening] = useState<RelayOpening | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [turn, setTurn] = useState(0); // 0 = not started, 1..TURNS, TURNS+1 = wrap-up
  const [hookSet, setHookSet] = useState<Hook[]>([]);
  const [ticks, setTicks] = useState([false, false, false]);
  const { roman } = useRoman();

  function nextOpening() {
    const pool = openings.filter((o) => theme === "all" || o.theme === theme);
    const fresh = pool.filter((o) => !seen.includes(o.id));
    const o = pick(fresh.length ? fresh : pool);
    setSeen(fresh.length ? [...seen, o.id] : [o.id]);
    setOpening(o);
  }
  function start() { nextOpening(); setTurn(1); setTicks([false, false, false]); setHookSet(pickN(hooks, 3)); }
  function advance() { setTurn(turn + 1); setHookSet(pickN(hooks, 3)); }

  const WRAPSTEPS = ["I retold the whole story in 4 or 5 sentences, and my partner corrected me gently", "My partner retold it back to me in a shorter version", "We noticed at least one mistake and said the right form aloud"];
  const poolSize = openings.filter((o) => theme === "all" || o.theme === theme).length;

  if (turn === 0) {
    return (
      <div className="q-card">
        <p className="q-inst"><b>What to do:</b> Play with a partner or your teacher. Choose what you want, then press Start. The app gives you an opening and keeps count of the turns.</p>
        <h3 className="g-h">1. Option</h3>
        <div className="choice-group" role="radiogroup" aria-label="Option">
          {[{ id: "a" as const, t: "Option A: free", d: "No tense rule. Just tell the story." }, { id: "b" as const, t: "Option B: tense cards", d: "Sentence 1 of every turn uses the tense on the card." }].map((x) => (
            <label key={x.id} className={"choice" + (mode === x.id ? " on" : "")}>
              <input type="radio" name="relay-mode" checked={mode === x.id} onChange={() => setMode(x.id)} />
              <span><b>{x.t}</b><small>{x.d}</small></span>
            </label>
          ))}
        </div>
        <h3 className="g-h">2. Kind of story</h3>
        <div className="choice-group" role="radiogroup" aria-label="Kind of story">
          {[{ id: "all", title: "Surprise me" }, ...themes].map((x) => (
            <label key={x.id} className={"choice" + (theme === x.id ? " on" : "")}>
              <input type="radio" name="relay-theme" checked={theme === x.id} onChange={() => setTheme(x.id)} />
              <span><b>{x.title}</b></span>
            </label>
          ))}
        </div>
        <p className="muted">{poolSize} openings in this group. You will not see the same one twice until you have seen them all.</p>
        <button className="btn" onClick={start}><Icon name="play" size={16} /> Start</button>
      </div>
    );
  }

  if (turn > TURNS) {
    const all = ticks.every(Boolean);
    return (
      <div className="q-card">
        <div className="q-top"><span className="q-kind">Wrap-up</span><span className="q-count">About 2 minutes</span></div>
        <p className="q-inst"><b>What to do:</b> Retell the whole story in 4 or 5 sentences. Your partner corrects you naturally as you go. Then your partner retells it back to you, shorter. Tick each step when it is done.</p>
        <ul className="imp-checks">
          {WRAPSTEPS.map((w, i) => (
            <li key={w}><label className="check"><input type="checkbox" checked={ticks[i]} onChange={() => setTicks((t) => t.map((x, k) => (k === i ? !x : x)))} /> {w}</label></li>
          ))}
        </ul>
        {all && <p>Story finished. This lesson is now complete.</p>}
        <button className="btn" disabled={!all} onClick={() => { void setLessonDone("speaking/story-relay", true); setTurn(0); }}>Finish</button>
        <button className="btn ghost" onClick={() => setTurn(0)}>New story</button>
      </div>
    );
  }

  const card = cards[Math.min(turn - 1, cards.length - 1)];
  const speaker = turn % 2 === 1 ? "You" : "Your partner";
  return (
    <div className="q-card">
      <div className="q-top"><span className="q-kind">{mode === "a" ? "Option A" : "Option B"}</span><span className="q-count">Turn {turn} of {TURNS}</span></div>
      <div className="bar" aria-hidden><div style={{ width: `${((turn - 1) / TURNS) * 100}%` }} /></div>

      {turn === 1 && opening && (
        <>
          <p className="q-inst"><b>What to do:</b> You start. Say the opening aloud, or use it as an idea and say it in your own words.</p>
          <Lines lines={opening.lines} />
          <button className="btn ghost small" onClick={nextOpening}>Show a different opening</button>
        </>
      )}
      <p className="rp-prompt"><span className="rp-who">Speaking now</span>{speaker}{turn === 1 ? " (the opening)" : ""}</p>
      {turn > 1 && <ol className="relay-steps"><li><b>Sentence 1:</b> continue from what was just said.</li><li><b>Sentence 2:</b> add a detail (a name, a place, a feeling, a thing).</li><li><b>Sentence 3 (optional):</b> end on a hook.</li></ol>}

      {mode === "b" && (
        <div className="relay-card">
          <span className="rp-who">Tense card</span>
          <span className="rt-bn"><Listen text={card.word[0]} label={card.word[2]} /><span><b lang="bn" className="wbn">{card.word[0]}</b>{roman && <small className="rt-ro">{card.word[1]}</small>}</span></span>
          <span><b>{card.tense}.</b> {card.how} Sentence 1 must use it.</span>
          {card.forms.length > 0 && <span className="muted">Forms: {card.forms.join(" · ")}</span>}
        </div>
      )}

      {turn > 1 && (
        <div className="relay-ideas">
          <p className="muted"><b>Need a hook?</b> Try one of these ideas.</p>
          <ul>{hookSet.map((h) => <li key={h.example[0]}><span className="rt-bn"><Listen text={h.example[0]} label={h.example[2]} /><span><span className="rt-kind">{h.kind}</span><span lang="bn">{h.example[0]}</span>{roman && <small className="rt-ro">{h.example[1]}</small>}<small>{h.example[2]}</small></span></span></li>)}</ul>
        </div>
      )}

      <details className="relay-helpers">
        <summary>Helper words</summary>
        <ul>{helpers.map((h) => <li key={h.word[0]}><Listen text={h.word[0]} label={h.word[2]} /><span lang="bn">{h.word[0]}</span>{roman && <small className="rt-ro">{h.word[1]}</small>}<small>{h.word[2]}</small></li>)}</ul>
      </details>

      <button className="btn" onClick={advance}>{turn === TURNS ? "Go to wrap-up" : "Next turn"}</button>
      <button className="btn ghost" onClick={() => setTurn(0)}>Stop</button>
    </div>
  );
}

export default function StoryRelay({ glossary, rules, helpers, hooks, themes, openings, sampleA, cards, wrap }: {
  glossary: { term: string; meaning: string }[]; rules: { n: string; title: string; text: string; tip: string }[]; helpers: Helper[]; hooks: Hook[];
  themes: Theme[]; openings: RelayOpening[]; sampleA: Sample[]; cards: RelayCard[]; wrap: Wrap;
}) {
  return (
    <article className="lesson">
      <header className="lesson-head">
        <p className="eyebrow" lang="bn">গল্প বলা</p>
        <h1>Story relay</h1>
        <p className="lede">Build one story together, a few sentences at a time. You speak, your partner continues, and every turn ends with something to answer.</p>
      </header>

      <section className="g-sec" id="sec-meaning">
        <h2>What it means</h2>
        <p>These are the words used in this activity, in plain English.</p>
        <dl className="relay-glossary">
          {glossary.map((g) => <div key={g.term}><dt>{g.term}</dt><dd>{g.meaning}</dd></div>)}
        </dl>
      </section>

      <section className="g-sec" id="sec-rules">
        <h2>The rules</h2>
        <p>Each turn is 2 or 3 sentences. Do 4 or 5 turns each, so the story reaches about 10 to 15 sentences.</p>
        <table className="relay-table wide">
          <thead><tr><th scope="col">Sentence</th><th scope="col">What you do</th><th scope="col">How</th></tr></thead>
          <tbody>{rules.map((r) => <tr key={r.n}><th scope="row">{r.n}</th><td><b>{r.title}.</b> {r.text}</td><td>{r.tip}</td></tr>)}</tbody>
        </table>
      </section>

      <section className="g-sec" id="sec-helpers">
        <h2>Helper words</h2>
        <p>Keep these where you can see them. They join your sentences, and many of them make a good hook.</p>
        <table className="relay-table wide">
          <thead><tr><th scope="col">Word</th><th scope="col">Meaning</th><th scope="col">Use it to</th><th scope="col">Example</th></tr></thead>
          <tbody>{helpers.map((h) => (
            <tr key={h.word[0]}>
              <td><Bn l={h.word} /></td><td>{h.word[2]}</td><td>{h.use}</td>
              <td><Bn l={h.example} /><small className="rt-en">{h.example[2]}</small></td>
            </tr>
          ))}</tbody>
        </table>
      </section>

      <section className="g-sec" id="sec-hooks">
        <h2>Hooks: how to end your turn</h2>
        <p>A hook is the last sentence of your turn. It leaves one thing open, so your partner has something to answer. There are eight easy kinds.</p>
        <table className="relay-table wide">
          <thead><tr><th scope="col">Kind</th><th scope="col">What it does</th><th scope="col">Example</th></tr></thead>
          <tbody>{hooks.map((h) => (
            <tr key={h.kind}><th scope="row">{h.kind}</th><td>{h.use}</td><td><Bn l={h.example} /><small className="rt-en">{h.example[2]}</small></td></tr>
          ))}</tbody>
        </table>
      </section>

      <section className="g-sec" id="sec-a">
        <h2>Option A: free, no tense rule</h2>
        <p>Pick any opening, or let the app give you one in the Play section. There are {openings.length} openings in {themes.length} groups.</p>
        {themes.map((t, ti) => (
          <details key={t.id} className="relay-theme" open={ti === 0}>
            <summary>{t.title} <span className="muted">({openings.filter((o) => o.theme === t.id).length})</span></summary>
            {openings.filter((o) => o.theme === t.id).map((o, i) => <Lines key={o.id} lines={o.lines} caption={`Opening ${i + 1}`} />)}
          </details>
        ))}
      </section>

      <section className="g-sec" id="sec-sample">
        <h2>A full sample story</h2>
        <p>Five turns, 15 sentences. Read the note on each turn, and see how every turn ends with something to answer.</p>
        <ol className="relay-sample">
          {sampleA.map((t, i) => (
            <li key={i}>
              <p className="relay-turn"><b>Turn {i + 1}: {t.who === "you" ? "You" : "Your partner"}.</b> <span className="muted">{t.note}</span></p>
              <Lines lines={t.lines} />
            </li>
          ))}
        </ol>
      </section>

      <section className="g-sec" id="sec-b">
        <h2>Option B: with tense cards</h2>
        <p>Add one rule: <b>sentence 1 of each turn must use the tense on the card.</b> Sentences 2 and 3 are free, so the story keeps its flow. Use the cards in this order, one per turn.</p>
        <table className="relay-table wide">
          <thead><tr><th scope="col">Turn</th><th scope="col">Card</th><th scope="col">Tense</th><th scope="col">How to build it</th></tr></thead>
          <tbody>{cards.map((c, i) => (
            <tr key={c.id}>
              <th scope="row">{i + 1}</th><td><Bn l={c.word} /><small className="rt-en">{c.word[2]}</small></td><td>{c.tense}</td>
              <td>{c.how}{c.forms.length > 0 && <small className="rt-en">{c.forms.join(" · ")}</small>}</td>
            </tr>
          ))}</tbody>
        </table>
        {cards.map((c, i) => (
          <details key={c.id} className="relay-theme">
            <summary>Turn {i + 1}: {c.word[1]} ({c.tense}), with examples and a sample turn</summary>
            {c.examples.length > 0 && <Lines lines={c.examples} caption="Short examples" />}
            <Lines lines={c.turn} caption="A sample turn" />
          </details>
        ))}
      </section>

      <section className="g-sec" id="sec-wrap">
        <h2>Wrap-up (2 minutes)</h2>
        <ol className="relay-steps">
          <li><b>You retell</b> the whole story in 4 or 5 sentences. Your partner corrects your mistakes naturally as you go, by saying the right form back.</li>
          <li><b>Your partner retells</b> it back to you in a shorter version.</li>
        </ol>
        <Lines lines={wrap.retell} caption="A sample retelling (5 sentences)" />
        <Lines lines={wrap.short} caption="The shorter version your partner says" />
      </section>

      <section className="g-sec" id="sec-practice">
        <h2>Play</h2>
        <Play openings={openings} themes={themes} cards={cards} helpers={helpers} hooks={hooks} />
      </section>
    </article>
  );
}
