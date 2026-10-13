"use client";

import { useState } from "react";
import type { L, RelayCard, RelayOpening } from "@/data/story-relay";
import { speak } from "@/lib/speak";
import { setLessonDone } from "../../../actions";
import Icon from "../../Icon";
import { useRoman } from "../../Roman";
import UnderlineTabs from "../../UnderlineTabs";
import WordRow from "../../WordRow";

type Sample = { who: "you" | "partner"; lines: L[] };

function Line({ line }: { line: L }) {
  const { roman } = useRoman();
  return (
    <div className="rp-line">
      <button type="button" className="wplay" onClick={() => speak(line[0])} aria-label={`Hear: ${line[2]}`}><Icon name="sound" size={18} /></button>
      <span className="wtext">
        <span className="wbn" lang="bn">{line[0]}</span>
        {roman && <span className="wro">{line[1]}</span>}
        <span className="rp-en">{line[2]}</span>
      </span>
    </div>
  );
}

const TURNS = 5;

function Play({ openings, cards }: { openings: RelayOpening[]; cards: RelayCard[] }) {
  const [mode, setMode] = useState<"a" | "b">("a");
  const [opening, setOpening] = useState<RelayOpening | null>(null);
  const [turn, setTurn] = useState(0); // 0 = not started, 1..TURNS, TURNS+1 = wrap-up
  const [ticks, setTicks] = useState([false, false, false]);

  function start() {
    setOpening(openings[Math.floor(Math.random() * openings.length)]);
    setTurn(1); setTicks([false, false, false]);
  }
  function finishWrap() { void setLessonDone("speaking/story-relay", true); }

  const WRAP = ["I retold the whole story in 4 to 5 sentences, and my partner corrected me gently", "My partner retold it back to me in a shorter version", "We noticed at least one mistake and said the right form aloud"];

  if (turn === 0) {
    return (
      <div className="q-card">
        <UnderlineTabs label="Option" tabs={[{ id: "a", label: "Option A: free" }, { id: "b", label: "Option B: with tenses" }]} value={mode} onChange={setMode} />
        <p className="q-inst"><b>What to do:</b> Play with a partner, or with your teacher. Press Start to get an opening. Then take turns: each turn is 2 or 3 spoken sentences. {mode === "b" ? "In Option B, sentence 1 of every turn must use the tense on the card." : "In Option A there is no tense rule."}</p>
        <button className="btn" onClick={start}><Icon name="play" size={16} /> Start</button>
      </div>
    );
  }

  if (turn > TURNS) {
    const all = ticks.every(Boolean);
    return (
      <div className="q-card">
        <div className="q-top"><span className="q-kind">Wrap-up</span><span className="q-count">About 2 minutes</span></div>
        <p className="q-inst"><b>What to do:</b> Retell the whole story in 4 to 5 sentences. Your partner corrects you naturally as you go. Then your partner retells it back to you, shorter. Tick each step when it is done.</p>
        <ul className="imp-checks">
          {WRAP.map((w, i) => (
            <li key={w}><label className="check"><input type="checkbox" checked={ticks[i]} onChange={() => setTicks((t) => t.map((x, k) => (k === i ? !x : x)))} /> {w}</label></li>
          ))}
        </ul>
        {all && <p>Story finished. This lesson is now complete.</p>}
        <button className="btn" disabled={!all} onClick={() => { finishWrap(); setTurn(0); }}>Finish</button>
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
          <p className="q-inst"><b>What to do:</b> You start. Say this opening aloud, or use it as an idea and say it in your own words.</p>
          <div className="rp-lines">{opening.lines.map((l) => <Line key={l[0]} line={l} />)}</div>
        </>
      )}
      <p className="rp-prompt"><span className="rp-who">Speaking now</span>{speaker}{turn === 1 ? " (the opening)" : ""}</p>
      {turn > 1 && <p className="q-inst"><b>What to do:</b> Sentence 1: continue from what was just said. Sentence 2: add a detail (a name, a place, a feeling, a thing). Sentence 3 (optional): end on a hook, such as a surprise or a problem.</p>}
      {mode === "b" && (
        <div className="relay-card">
          <span className="rp-who">Tense card</span>
          <b lang="bn" className="wbn">{card.word[0]}</b>
          <span className="wro">{card.word[1]} ({card.word[2]})</span>
          <span>{card.tense}. {card.hint} Sentence 1 must use it.</span>
        </div>
      )}
      <button className="btn" onClick={() => setTurn(turn + 1)}>{turn === TURNS ? "Go to wrap-up" : "Next turn"}</button>
      <button className="btn ghost" onClick={() => setTurn(0)}>Stop</button>
    </div>
  );
}

export default function StoryRelay({ helpers, openings, cards, sampleA, sampleB }: { helpers: L[]; openings: RelayOpening[]; cards: RelayCard[]; sampleA: Sample[]; sampleB: L[] }) {
  return (
    <article className="lesson">
      <header className="lesson-head">
        <p className="eyebrow" lang="bn">গল্প বলা</p>
        <h1>Story relay</h1>
        <p className="lede">Build one story together, a few sentences at a time. You speak, your partner continues, and the last sentence always leaves something to answer.</p>
      </header>

      <section className="g-sec" id="sec-rules">
        <h2>How it works</h2>
        <p>Two people build one story by taking turns. Each turn is 2 to 3 sentences, and the last sentence leaves a hook so the next person has something to build on. Do 4 to 5 turns each, so the story reaches about 10 to 12 sentences.</p>
        <ol className="relay-rules">
          <li><b>Sentence 1.</b> Continue from what the other person just said.</li>
          <li><b>Sentence 2.</b> Add a detail: a name, a place, a feeling, a thing.</li>
          <li><b>Sentence 3 (optional).</b> End on a hook, such as a surprise or a problem, so the other person has something to answer.</li>
        </ol>
      </section>

      <section className="g-sec" id="sec-helpers">
        <h2>Helper words</h2>
        <p className="muted">Keep these on the board, so you can link your sentences.</p>
        <ul className="wlist">{helpers.map((h) => <li key={h[0]}><WordRow bn={h[0]} roman={h[1]} en={h[2]} /></li>)}</ul>
      </section>

      <section className="g-sec" id="sec-a">
        <h2>Option A: free, no tense rule</h2>
        <p>Pick one of these openings, or let the app choose. Then take turns.</p>
        {openings.map((o, i) => (
          <div key={o.id} className="rp-group"><h3 className="g-h">Opening {i + 1}</h3><div className="rp-lines">{o.lines.map((l) => <Line key={l[0]} line={l} />)}</div></div>
        ))}
        <h3 className="g-h">A sample run</h3>
        <ol className="rp-turns">
          {sampleA.map((t, i) => (
            <li key={i} className={t.who === "you" ? "you" : "them"}>
              <p className="rp-who">{t.who === "you" ? "You" : "Your partner"}</p>
              <div className="rp-lines">{t.lines.map((l) => <Line key={l[0]} line={l} />)}</div>
            </li>
          ))}
          <li className="them"><p className="rp-who">Your partner</p><p className="muted">continues the worry in their own way, and so on for 4 to 5 turns each.</p></li>
        </ol>
      </section>

      <section className="g-sec" id="sec-b">
        <h2>Option B: with tenses</h2>
        <p>Add one rule: <b>sentence 1 of each turn must use the tense on the card.</b> Sentences 2 and 3 are free, so the story keeps its flow. Use the cards in this order:</p>
        <ol className="relay-cards">
          {cards.map((c) => (
            <li key={c.id}><b lang="bn" className="wbn">{c.word[0]}</b><span className="wro">{c.word[1]}</span><span>{c.word[2]}. {c.tense}</span></li>
          ))}
        </ol>
        <h3 className="g-h">A sample turn (card: ekhon)</h3>
        <div className="rp-lines">{sampleB.map((l) => <Line key={l[0]} line={l} />)}</div>
        <p className="muted">The first and third sentences use the card tense.</p>
      </section>

      <section className="g-sec" id="sec-wrap">
        <h2>Wrap-up (2 minutes)</h2>
        <p>Retell the whole story in 4 to 5 sentences. Your partner corrects your mistakes naturally as you go. Then your partner retells it back to you in a shorter version.</p>
      </section>

      <section className="g-sec" id="sec-practice">
        <h2>Play</h2>
        <Play openings={openings} cards={cards} />
      </section>
    </article>
  );
}
