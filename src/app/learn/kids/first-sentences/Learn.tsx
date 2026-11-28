"use client";

import type { FirstSentences, Item } from "@/data/kids-first-sentences";
import { sayItem } from "@/lib/say-item";
import { CheatTable, Line, PartNav } from "./Shared";

/** A whole card is one big button: tap to hear the word. */
function WordCard({ item }: { item: Item }) {
  return (
    <li>
      <button type="button" className="fs-word" onClick={() => sayItem(item.id, item.bengali)} aria-label={`${item.bengali}, ${item.roman}, ${item.english}. Tap to hear it.`}>
        <span className="fs-bn l" lang="bn">{item.bengali}</span>
        <span className="fs-ro">{item.roman}</span>
        <span className="fs-en">{item.english}</span>
      </button>
    </li>
  );
}

export default function Learn({ data }: { data: FirstSentences }) {
  return (
    <div className="fs">
      <PartNav cheatSheet={data.cheatSheet} />

      <section aria-labelledby="fs-words">
        <h2 id="fs-words">Food words</h2>
        <p className="fs-help">Tap a card to hear the word. Say it back out loud.</p>
        <ul className="fs-grid">{data.words.map((w) => <WordCard key={w.id} item={w} />)}</ul>
        <h3>Helpful words</h3>
        <ul className="fs-grid small">{data.helpers.map((w) => <WordCard key={w.id} item={w} />)}</ul>
      </section>

      <section aria-labelledby="fs-frames">
        <h2 id="fs-frames">Seven sentence frames</h2>
        <p className="fs-help">A frame is a sentence with a gap. Put a word in the gap and you can say a whole sentence! Start with two or three frames and come back for the others.</p>
        <ol className="fs-frames">
          {data.frames.map((f, n) => (
            <li key={f.id} className="fs-frame">
              <header>
                <span className="fs-num" aria-hidden>{n + 1}</span>
                <div className="fs-frame-head">
                  <p className="fs-bn m" lang="bn">{f.frame.bengali}</p>
                  <p className="fs-ro">{f.frame.roman}</p>
                  <p className="fs-en">{f.frame.english}</p>
                </div>
              </header>
              <p className="fs-when"><b>Use it when:</b> {f.useWhen}</p>
              <h3 className="fs-sub">Say it</h3>
              <ul className="fs-examples">{f.examples.map((e) => <li key={e.id + e.roman}><Line item={e} size="m" /></li>)}</ul>
              <div className="fs-moment">
                <p><b>Real-life moment:</b> {f.situation.text}</p>
                <Line item={f.situation.line} size="s" />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="fs-cheat">
        <h2 id="fs-cheat">Cheat sheet</h2>
        <p className="fs-help">Not sure what to say? Find your situation here. You can open this sheet from any part of the lesson with the Cheat sheet button.</p>
        <CheatTable rows={data.cheatSheet} />
      </section>
    </div>
  );
}
