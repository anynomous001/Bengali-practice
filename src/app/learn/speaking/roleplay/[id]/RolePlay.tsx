"use client";

import { useState } from "react";
import type { Demo, L, Scenario } from "@/data/roleplay";
import { speak } from "@/lib/speak";
import { setLessonDone } from "../../../../actions";
import Icon from "../../../Icon";
import { useRoman } from "../../../Roman";
import UnderlineTabs from "../../../UnderlineTabs";
import WordRow from "../../../WordRow";

function Line({ line, label }: { line: L; label?: string }) {
  const { roman } = useRoman();
  return (
    <div className="rp-line">
      <button type="button" className="wplay" onClick={() => speak(line[0])} aria-label={`Hear: ${line[2]}`}><Icon name="sound" size={18} /></button>
      <span className="wtext">
        {label && <span className="rp-who">{label}</span>}
        <span className="wbn" lang="bn">{line[0]}</span>
        {roman && <span className="wro">{line[1]}</span>}
        <span className="rp-en gloss">{line[2]}</span>
      </span>
    </div>
  );
}

function DemoView({ demo }: { demo: Demo }) {
  return (
    <div className={"rp-demo " + demo.kind}>
      <p className="rp-setup"><span className={"rp-tag " + demo.kind}>{demo.kind === "smooth" ? "Goes well" : "Goes wrong"}</span> {demo.setup}</p>
      <ol className="rp-turns">
        {demo.turns.map((t, i) => (
          <li key={i} className={t.who}><Line line={t.line} label={t.who === "you" ? "You" : "Them"} /></li>
        ))}
      </ol>
      <p className="rp-take"><b>Remember:</b> {demo.takeaway}</p>
    </div>
  );
}

/** Practice: the app plays the other person; you answer aloud, then check. */
function Practice({ scenario }: { scenario: Scenario }) {
  const { roman } = useRoman();
  const [demoId, setDemoId] = useState(scenario.demos[0].id);
  const demo = scenario.demos.find((d) => d.id === demoId)!;
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [hideThem, setHideThem] = useState(false);
  const [done, setDone] = useState(false);

  const turn = demo.turns[i];
  const isYou = turn?.who === "you";

  function reset(id = demoId) { setDemoId(id); setI(0); setShown(false); setDone(false); }
  function next() {
    setShown(false);
    if (i + 1 >= demo.turns.length) { setDone(true); void setLessonDone(`speaking/roleplay-${scenario.id}`, true); }
    else setI(i + 1);
  }

  return (
    <div className="q-card">
      <UnderlineTabs label="Choose a conversation" tabs={scenario.demos.map((d) => ({ id: d.id, label: d.kind === "smooth" ? "Goes well" : "Goes wrong" }))} value={demoId} onChange={(id) => reset(id)} />
      {done ? (
        <div className="practice-done">
          <h3>Conversation finished</h3>
          <p>This lesson is now complete. Do it again without looking at the lines, or try the other conversation.</p>
          <button className="btn" onClick={() => reset()}>Again</button>
        </div>
      ) : (
        <>
          <div className="q-top"><span className="q-kind">{isYou ? "Your turn" : "Listen"}</span><span className="q-count">Line {i + 1} of {demo.turns.length}</span></div>
          <div className="bar" aria-hidden><div style={{ width: `${(i / demo.turns.length) * 100}%` }} /></div>
          <p className="q-inst"><b>What to do:</b> {isYou
            ? "Say your reply aloud in Bengali. You see what you want to say in English. Then reveal the Bengali and compare."
            : "Listen to the other person, then press Next. You can listen again as many times as you like."}</p>
          <p className="muted rp-situation">{demo.setup}</p>

          {isYou ? (
            <>
              <p className="rp-prompt"><span className="rp-who">You want to say</span>{turn.line[2]}</p>
              {!shown ? <button className="btn" onClick={() => setShown(true)}>Show the Bengali</button> : (
                <>
                  <div className="model">
                    <p className="model-label">Say it like this</p>
                    <button type="button" className="btn ghost small" onClick={() => speak(turn.line[0])}><Icon name="sound" size={16} /> Listen</button>
                    <span className="wbn" lang="bn">{turn.line[0]}</span>
                    {roman && <span className="wro">{turn.line[1]}</span>}
                  </div>
                  <button className="btn" onClick={next}>{i + 1 >= demo.turns.length ? "Finish" : "Next"}</button>
                </>
              )}
            </>
          ) : (
            <>
              <div className="rp-them">
                <button type="button" className="btn" onClick={() => speak(turn.line[0])}><Icon name="sound" size={18} /> Play</button>
                <button type="button" className="btn ghost" onClick={() => speak(turn.line[0], { slow: true })}>Play slowly</button>
              </div>
              {hideThem ? <p className="muted">The text is hidden. Listen and work out what they said.</p> : <Line line={turn.line} />}
              <label className="check"><input type="checkbox" checked={hideThem} onChange={(e) => setHideThem(e.target.checked)} /> Hide the text (listening only)</label>
              <button className="btn" onClick={next}>{i + 1 >= demo.turns.length ? "Finish" : "Next"}</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function RolePlay({ scenario }: { scenario: Scenario }) {
  return (
    <article className="lesson">
      <header className="lesson-head">
        <p className="eyebrow" lang="bn">{scenario.bn}</p>
        <h1>{scenario.title}</h1>
        <p className="lede">{scenario.blurb}</p>
      </header>

      <section className="g-sec" id="sec-situation">
        <h2>The situation</h2>
        <div className="g-rule"><p className="g-rule-title">Where you are</p><p className="g-rule-text">{scenario.situation}</p>
          <p className="g-rule-title">Your goal</p><p className="g-rule-text">{scenario.goal}</p></div>
      </section>

      <section className="g-sec" id="sec-words">
        <h2>Words you will need</h2>
        <p className="muted">Tap the speaker to hear each word.</p>
        <ul className="wlist">
          {scenario.words.map((w) => <li key={w[0]}><WordRow bn={w[0]} roman={w[1]} en={w[2]} /></li>)}
        </ul>
      </section>

      <section className="g-sec" id="sec-say">
        <h2>Phrases you can say</h2>
        {scenario.say.map((g) => (
          <div key={g.title} className="rp-group">
            <h3 className="g-h">{g.title}</h3>
            {g.note && <p className="muted">{g.note}</p>}
            <div className="rp-lines">{g.items.map((l) => <Line key={l[0]} line={l} />)}</div>
          </div>
        ))}
      </section>

      <section className="g-sec" id="sec-hear">
        <h2>What you will hear</h2>
        <p className="muted">You do not need to say these. You need to understand them.</p>
        {scenario.hear.map((g) => (
          <div key={g.title} className="rp-group">
            <h3 className="g-h">{g.title}</h3>
            <div className="rp-lines">{g.items.map((l) => <Line key={l[0]} line={l} />)}</div>
          </div>
        ))}
      </section>

      <section className="g-sec" id="sec-demos">
        <h2>Two example conversations</h2>
        <p className="muted">Read and listen first. One goes well, and one does not.</p>
        {scenario.demos.map((d) => (
          <div key={d.id} className="rp-demo-wrap"><h3 className="g-h">{d.title}</h3><DemoView demo={d} /></div>
        ))}
      </section>

      <section className="g-sec" id="sec-practice">
        <h2>Now you speak</h2>
        <p className="muted">The app plays the other person. You say your side aloud, then check yourself.</p>
        <Practice scenario={scenario} />
      </section>
    </article>
  );
}
