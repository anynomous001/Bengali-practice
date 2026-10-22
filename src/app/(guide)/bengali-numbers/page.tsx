import type { Metadata } from "next";
import Link from "next/link";
import { BIG_NUMBERS, NUMBER_CHART, PRICE_PHRASES } from "@/data/numbers";
import { OG_IMAGES, SITE_NAME } from "@/lib/site";
import { Crumbs, GuideCta } from "../GuideBits";

const TITLE = "Bengali Numbers 1 to 100 (সংখ্যা) with Pronunciation";
const DESC = "Bengali numerals ০ to ৯ and every number from 0 to 100 in Bengali script with romanization, plus thousand, lakh and crore and phrases for shopping.";
export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${SITE_NAME}` },
  description: DESC,
  alternates: { canonical: "/bengali-numbers" },
  openGraph: { type: "article", url: "/bengali-numbers", title: TITLE, description: DESC, images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/twitter-image"] },
};

export default function BengaliNumbers() {
  return (
    <>
      <Crumbs name="Bengali numbers" path="/bengali-numbers" />
      <h1>Bengali numbers 1 to 100 <span lang="bn">(সংখ্যা)</span></h1>
      <p className="gd-lead">Bengali has its own digits and its own number words. This page lists every number from 0 to 100 with the Bengali numeral, the word in Bengali script and how to say it.</p>

      <h2>The ten Bengali digits</h2>
      <p>Bengali digits are not the same shapes as the 0 to 9 you know, but they work the same way. Bengali speakers also use the usual digits, so you will see both on signs, prices and phone screens.</p>
      <ul className="gd-numgrid">
        {NUMBER_CHART.slice(0, 10).map((n) => (
          <li key={n.value}><span className="n" lang="bn">{n.numeral}</span><span className="w"><b lang="bn">{n.word}</b> {n.wrom} ({n.value})</span></li>
        ))}
      </ul>

      <h2>Every number from 10 to 100</h2>
      <p>Unlike English, numbers up to 100 in Bengali are <b>separate words</b>, not built from a tens word and a ones word. Twenty-one is <span lang="bn">একুশ</span> (ekush), not “twenty-one”. There is no shortcut, so most learners learn them in small groups of ten and revisit them often.</p>
      <ul className="gd-numgrid">
        {NUMBER_CHART.slice(10).map((n) => (
          <li key={n.value}><span className="n" lang="bn">{n.numeral}</span><span className="w"><b lang="bn">{n.word}</b> {n.wrom} ({n.value})</span></li>
        ))}
      </ul>

      <h2>Big numbers: hundred, thousand, lakh and crore</h2>
      <p>Bengali, like most South Asian languages, counts in <b>lakh</b> (100,000) and <b>crore</b> (10,000,000), and writes commas the Indian way: the first comma after three digits, then every two.</p>
      <table className="gd-table">
        <thead><tr><th>Numeral</th><th>Bengali</th><th>Say it</th><th>Meaning</th></tr></thead>
        <tbody>
          {BIG_NUMBERS.map(([numeral, word, rom, en]) => (
            <tr key={numeral}><td lang="bn">{numeral}</td><td lang="bn">{word}</td><td>{rom}</td><td>{en}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>Numbers and money: useful phrases</h2>
      <p>Numbers come up first when you shop, so here are the phrases you will use at a market. The currency is the <span lang="bn">টাকা</span> (taka) in Bangladesh and the rupee, also called <span lang="bn">টাকা</span> in everyday speech, in West Bengal.</p>
      <table className="gd-table">
        <thead><tr><th>Bengali</th><th>Say it</th><th>Meaning</th></tr></thead>
        <tbody>
          {PRICE_PHRASES.map(([bn, rom, en]) => (
            <tr key={rom}><td lang="bn">{bn}</td><td>{rom}</td><td>{en}</td></tr>
          ))}
        </tbody>
      </table>

      <div className="gd-note"><p>New to the script? Start with <Link href="/bengali-alphabet">the Bengali alphabet</Link>, then come back here. The full plan is in <Link href="/learn-bengali">how to learn Bengali</Link>.</p></div>

      <GuideCta />
    </>
  );
}
