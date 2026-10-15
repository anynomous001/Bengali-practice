"use client";

import { useState } from "react";
import { recordGrammarQuiz } from "../../../actions";
import { speak } from "@/lib/speak";
import type { VocabTopic as Topic, Word } from "@/data/vocabulary";
import Icon from "../../Icon";
import { useRoman } from "../../Roman";
import WordRow from "../../WordRow";

type Kind = "bn2en" | "en2bn" | "listen";
type Q = { kind: Kind; word: Word; options: Word[]; correct: number };
type Best = { score: number; total: number; attempts: number } | null;

const shuffle = <T,>(a: T[]): T[] => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
};

function makeQuiz(words: Word[], n: number): Q[] {
  const kinds: Kind[] = ["bn2en", "en2bn", "listen"];
  return shuffle(words).slice(0, n).map((word, i) => {
    const others = shuffle(words.filter((w) => w[0] !== word[0] && w[2] !== word[2])).slice(0, 3);
    const options = shuffle([word, ...others]);
    return { kind: kinds[i % 3], word, options, correct: options.indexOf(word) };
  });
}

export default function VocabTopic({ topic, best, quizLen, flashHref, devotional = false }: { topic: Topic; best: Best; quizLen: number; flashHref?: string; devotional?: boolean }) {
  const [cover, setCover] = useState(false);
  const { roman } = useRoman();
  const all = topic.sections.flatMap((s) => s.words);

  // practice state: the questions are made after the tap, so server and client markup always match
  const [qs, setQs] = useState<Q[] | null>(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const start = () => { setQs(makeQuiz(all, quizLen)); setI(0); setPicked(null); setScore(0); setFinished(false); };
  const q = qs?.[i];
  const answer = (k: number) => {
    if (!q || picked !== null) return;
    setPicked(k);
    if (k === q.correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (!qs) return;
    if (i + 1 >= qs.length) { setFinished(true); void recordGrammarQuiz(`v-${topic.id}`, score); return; }
    setI(i + 1); setPicked(null);
  };
  const optionText = (w: Word, kind: Kind) => (kind === "en2bn" ? w[0] : w[2]);

  return (
    <div className="vocab-topic">
      <header className="topic-head">
        {devotional && <p><span className="dev-tag">Devotional</span></p>}
        <p className="eyebrow" lang="bn">{topic.title[0]}</p>
        <h1>{topic.title[2]}</h1>
        <p className="lede">{topic.blurb}</p>
        <p className="topic-meta">{all.length} items{topic.phrases.length ? ` · ${topic.phrases.length} phrase${topic.phrases.length === 1 ? "" : "s"}` : ""}{best ? ` · best practice score ${best.score}/${best.total}` : ""}</p>
      </header>

      <section id="sec-words" className="g-sec vwords">
        <h2>Words</h2>
        <div className="vsections">
          <div className="vtools">
            <label className="check"><input type="checkbox" checked={cover} onChange={(e) => setCover(e.target.checked)} /> Cover the English (test yourself)</label>
            {flashHref && <a className="btn ghost small" href={flashHref}>Practise as flashcards</a>}
          </div>
          {topic.sections.map((s, si) => (
            <section key={s.title} id={`sec-w${si}`} className="vsection">
              <h2>{s.title} <span>{s.words.length}</span></h2>
              <ul className="wlist">
                {s.words.map((w) => <li key={w[0]}><WordRow bn={w[0]} roman={w[1]} en={w[2]} hideMeaning={cover} /></li>)}
              </ul>
            </section>
          ))}
        </div>
      </section>

      {topic.phrases.length > 0 && <section id="sec-phrases" className="g-sec">
        <h2>Phrases that use these words</h2>
        <ul className="plist">
          {topic.phrases.map((p) => (
            <li key={p[0]}>
              <div>
                <span className="pbn" lang="bn">{p[0]}</span>
                {roman && <span className="pro">{p[1]}</span>}
                <span className="pen">{p[2]}</span>
              </div>
              <span className="pbtns">
                <button type="button" className="icon-btn" onClick={() => speak(p[0])} aria-label="Hear this phrase"><Icon name="sound" size={18} /></button>
                <button type="button" className="icon-btn slow" onClick={() => speak(p[0], { slow: true })} aria-label="Hear it slowly">slow</button>
              </span>
            </li>
          ))}
        </ul>
      </section>}

      <section id="sec-practice" className="g-sec">
        <h2>Practice</h2>
        <div className="vpractice">
          {!qs && (
            <div className="vstart">
              <p>{quizLen} questions from this topic: Bengali to English, English to Bengali, and listening. Score {Math.ceil(quizLen * 0.7)} or more to complete the lesson.</p>
              <button className="btn" onClick={start}>Start practice</button>
            </div>
          )}
          {qs && !finished && q && (
            <>
              <div className="bar" aria-hidden><div style={{ width: `${(i / qs.length) * 100}%` }} /></div>
              <p className="muted">Question {i + 1} of {qs.length}</p>
              <div className="prompt">
                {q.kind === "bn2en" && <><small>What does this mean?</small><span className="word" lang="bn">{q.word[0]}</span>{roman && <small>{q.word[1]}</small>}</>}
                {q.kind === "en2bn" && <><small>How do you say it in Bengali?</small><span className="word">{q.word[2]}</span></>}
                {q.kind === "listen" && <>
                  <small>Listen, then pick the meaning</small>
                  <button className="btn big-btn" onClick={() => speak(q.word[0])}><Icon name="sound" size={18} /> Play</button>
                  <button className="btn ghost" onClick={() => speak(q.word[0], { slow: true })}>Play slowly</button>
                </>}
              </div>
              <div className="options">
                {q.options.map((o, k) => (
                  <button key={o[0]} disabled={picked !== null} onClick={() => answer(k)}
                    className={"opt" + (q.kind === "en2bn" ? " bn" : " text") + (picked !== null && k === q.correct ? " right" : "") + (picked === k && k !== q.correct ? " wrong" : "")}>
                    {optionText(o, q.kind)}
                    {q.kind === "en2bn" && roman && picked !== null && <small className="opt-ro">{o[1]}</small>}
                  </button>
                ))}
              </div>
              {picked !== null && (
                <>
                  <p className="feedback">{picked === q.correct ? "Correct" : `Not quite: ${q.word[0]} means “${q.word[2]}”`}</p>
                  <button className="btn" onClick={next}>{i + 1 >= qs.length ? "Finish" : "Next"}</button>
                </>
              )}
            </>
          )}
          {qs && finished && (
            <div className="vstart">
              <h2>{score} / {qs.length}</h2>
              <p>{score >= Math.ceil(qs.length * 0.7) ? "Lesson complete. Well done." : "Not there yet: go through the words again and have another go."}</p>
              <button className="btn" onClick={start}>Practise again</button>
              <a className="btn ghost" href="#sec-words">Review the words</a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
