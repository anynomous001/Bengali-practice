"use client";

import { useState } from "react";
import type { Num } from "@/data/numbers";
import { speak } from "@/lib/speak";
import NumberQuiz from "../../NumberQuiz";
import UnderlineTabs from "../../UnderlineTabs";
import WordRow from "../../WordRow";
import { useRoman } from "../../Roman";
import Icon from "../../Icon";

type W = [string, string, string];
type Tab = "learn" | "practice";

export type NumbersData = {
  quiz: Num[];
  chart: { value: number; numeral: string; word: string; wrom: string }[];
  big: [string, string, string, string][];
  phrases: W[];
  moneyWords: W[];
  days: W[];
  parts: W[];
  bnMonths: W[];
  enMonths: W[];
};

function Words({ items }: { items: W[] }) {
  return <ul className="wlist">{items.map((w) => <li key={w[0]}><WordRow bn={w[0]} roman={w[1]} en={w[2]} /></li>)}</ul>;
}

export default function NumbersLesson({ data }: { data: NumbersData }) {
  const [tab, setTab] = useState<Tab>("learn");
  const { roman } = useRoman();
  const rows: typeof data.chart[] = [data.chart.slice(0, 11)];
  for (let i = 11; i < data.chart.length; i += 10) rows.push(data.chart.slice(i, i + 10));

  return (
    <>
      <UnderlineTabs tabs={[{ id: "learn", label: "Learn" }, { id: "practice", label: "Practice" }]} value={tab} onChange={setTab} label="Numbers and money" />
      {tab === "practice" && <NumberQuiz numbers={data.quiz} />}
      {tab === "learn" && (
        <>
          <p className="lede">Bengali has its own numerals, and every number up to 100 has its own word. Tap any number to hear it. When you know these, switch to Practice for the quiz.</p>

          <h2 id="sec-chart" className="anchor">Numbers 0 to 100</h2>
          {rows.map((row, i) => (
            <div key={i} className="nchart">
              {row.map((n) => (
                <button key={n.value} type="button" className="ntile" onClick={() => speak(n.word)} aria-label={`${n.value}: ${n.word}`}>
                  <span className="nnum" lang="bn">{n.numeral}</span>
                  <span className="nword" lang="bn">{n.word}</span>
                  {roman && <span className="nrom">{n.wrom} ({n.value})</span>}
                </button>
              ))}
            </div>
          ))}

          <h2 id="sec-big" className="anchor">Bigger numbers</h2>
          <p className="muted">Bengali groups big numbers the Indian way: thousand, then lakh (one hundred thousand), then crore (ten million).</p>
          <ul className="wlist">
            {data.big.map((b) => (
              <li key={b[0]}>
                <div className="wrow">
                  <button type="button" className="wplay" onClick={() => speak(b[1])} aria-label={`Hear ${b[3]}`}><Icon name="sound" size={18} /></button>
                  <span className="wtext"><span className="wbn" lang="bn">{b[0]}</span><span className="wbn" lang="bn">{b[1]}</span>{roman && <span className="wro">{b[2]}</span>}</span>
                  <span className="wen gloss">{b[3]}</span>
                </div>
              </li>
            ))}
          </ul>

          <h2 id="sec-money" className="anchor">Money and prices</h2>
          <p className="muted">The number comes before the word taka: <span lang="bn">১০ টাকা</span> is ten taka.</p>
          <Words items={data.moneyWords} />
          <h3>At the shop</h3>
          <ul className="wlist">{data.phrases.map((p) => <li key={p[0]}><WordRow bn={p[0]} roman={p[1]} en={p[2]} /></li>)}</ul>

          <h2 id="sec-days" className="anchor">Days of the week</h2>
          <Words items={data.days} />
          <h3>Parts of the day</h3>
          <Words items={data.parts} />

          <h2 id="sec-months" className="anchor">Months</h2>
          <p className="muted">Bengali has its own calendar, with six seasons of two months each. The Bengali new year, <span lang="bn">পয়লা বৈশাখ</span> (poila boishakh), falls in mid-April.</p>
          <h3>Bengali months</h3>
          <Words items={data.bnMonths} />
          <h3>English months, as said in Bengali</h3>
          <Words items={data.enMonths} />

          <h2 id="sec-practice" className="anchor">Practice</h2>
          <p><button type="button" className="btn" onClick={() => setTab("practice")}>Go to the quiz</button></p>
        </>
      )}
    </>
  );
}
