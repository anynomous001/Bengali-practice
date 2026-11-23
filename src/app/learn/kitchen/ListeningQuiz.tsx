"use client";

import { useMemo, useState } from "react";
import Icon from "../Icon";
import UnderlineTabs from "../UnderlineTabs";
import { speakBn } from "./speech";

type Item = { bn: string; ro: string; en: string };
type Level = { id: string; title: string; items: Item[] };

const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** Play a phrase and choose its English from three. Three levels. */
export default function ListeningQuiz({ levels }: { levels: Level[] }) {
  const [levelId, setLevelId] = useState(levels[0].id);
  const [round, setRound] = useState(0);
  const level = levels.find((l) => l.id === levelId)!;
  const questions = useMemo(() => {
    const others = levels.flatMap((l) => l.items);
    return shuffle(level.items).map((item) => {
      const same = shuffle(level.items.filter((x) => x.en !== item.en));
      const more = shuffle(others.filter((x) => x.en !== item.en && !same.some((s) => s.en === x.en)));
      return { item, options: shuffle([item, ...[...same, ...more].slice(0, 2)]) };
    });
  }, [level, levels, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  const q = questions[i];
  const finished = i >= questions.length;
  const reset = (lv?: string) => { if (lv) setLevelId(lv); setRound((r) => r + 1); setI(0); setPicked(null); setScore(0); setStarted(false); };
  const start = () => { setStarted(true); speakBn(questions[0].item.bn); };
  const choose = (en: string) => { if (picked) return; setPicked(en); if (en === q.item.en) setScore((s) => s + 1); };
  const next = () => { const k = i + 1; setI(k); setPicked(null); if (k < questions.length) speakBn(questions[k].item.bn); };

  return (
    <div className="kt-quiz">
      <UnderlineTabs label="Level" tabs={levels.map((l, k) => ({ id: l.id, label: `Level ${k + 1}` }))} value={levelId} onChange={(id) => reset(id)} />
      <p className="muted">{level.title.replace(/^Level \d: /, "")}</p>
      {!started ? (
        <button type="button" className="btn" onClick={start}><Icon name="play" size={16} /> Start</button>
      ) : finished ? (
        <div className="card-static kt-done">
          <h3>{score} of {questions.length}</h3>
          <p>{score === questions.length ? "All correct." : "Good work. Play again to practise more."}</p>
          <button type="button" className="btn" onClick={() => reset()}>Play again</button>
        </div>
      ) : (
        <div className="q-card">
          <div className="q-top"><span className="q-kind">Listen</span><span className="q-count">{i + 1} of {questions.length}</span></div>
          <button type="button" className="btn" onClick={() => speakBn(q.item.bn)}><Icon name="sound" size={18} /> Play again</button>
          <p className="kt-ask">What does it mean?</p>
          <div className="kt-options" role="group" aria-label="Choose the English">
            {q.options.map((o) => {
              const right = picked && o.en === q.item.en, wrong = picked === o.en && o.en !== q.item.en;
              return <button key={o.en} type="button" className={"kt-option" + (right ? " right" : "") + (wrong ? " wrong" : "")} disabled={!!picked && !right && !wrong} onClick={() => choose(o.en)}>{o.en}</button>;
            })}
          </div>
          {picked && (
            <>
              <p className={"kt-feedback " + (picked === q.item.en ? "good" : "bad")} role="status"><b>{picked === q.item.en ? "Correct" : "Incorrect"}</b></p>
              <p className="kt-reveal"><span className="kt-bn" lang="bn">{q.item.bn}</span> <span className="kt-ro">{q.item.ro}</span></p>
              <button type="button" className="btn" onClick={next}>{i + 1 >= questions.length ? "See my score" : "Next"}</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
