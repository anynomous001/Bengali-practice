import type { Metadata } from "next";
import Link from "next/link";
import { GROUPS, LETTERS } from "@/data/letters";
import { OG_IMAGES, SITE_NAME, TWITTER_SITE } from "@/lib/site";
import { Crumbs, GuideCta } from "../GuideBits";

const TITLE = "Bengali Alphabet with Pronunciation";
const SHORT = "Every Bengali letter with pronunciation, example words and tips. A free chart for beginners.";
const DESC = "The complete Bengali alphabet with romanization, example words and pronunciation tips for every vowel and consonant. A free chart for beginners.";
export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${SITE_NAME}` },
  description: DESC,
  alternates: { canonical: "/bengali-alphabet" },
  openGraph: { type: "article", locale: "en_US", url: "/bengali-alphabet", title: TITLE, description: SHORT, images: OG_IMAGES },
  twitter: { card: "summary_large_image", site: TWITTER_SITE, title: TITLE, description: SHORT, images: ["/twitter-image"] },
};

const KAR = [["া", "kaa", "কা"], ["ি", "ki", "কি"], ["ী", "kee", "কী"], ["ু", "ku", "কু"], ["ূ", "koo", "কূ"], ["ে", "ke", "কে"], ["ৈ", "koi", "কৈ"], ["ো", "ko", "কো"], ["ৌ", "kou", "কৌ"]];

export default function BengaliAlphabet() {
  return (
    <>
      <Crumbs name="Bengali alphabet" path="/bengali-alphabet" />
      <h1>The Bengali alphabet <span lang="bn">(বর্ণমালা)</span></h1>
      <p className="gd-lead">Every Bengali letter with a romanized sound, an example word and a tip for saying it. Bengali is written in its own script, which reads left to right and is easier to learn than it looks.</p>

      <h2>How the Bengali script works</h2>
      <p>Bengali uses an <b>abugida</b>, a script where each consonant carries a built-in vowel sound. The consonant <span lang="bn">ক</span> is read “ko”. To change the vowel you add a <b>vowel sign</b> (<span lang="bn">কার</span>, kar) before, after, above or below the consonant. There is no upper or lowercase, and the letters hang from a horizontal line called the <span lang="bn">মাত্রা</span> (matra).</p>
      <p>The letters below are grouped as vowels, consonants and special signs. The romanization is a guide for English speakers, not an official standard, so a few sounds are approximate. Hearing the letters matters, and the audio in <Link href="/#try">Bengali Practice</Link> lets you check each one.</p>

      {GROUPS.map((g) => (
        <section key={g.id}>
          <h2>{g.title}</h2>
          <ul className="gd-letters">
            {LETTERS.filter((l) => l.group === g.id).map((l) => (
              <li key={l.ch}>
                <span className="ch" lang="bn">{l.ch}</span>
                <span className="rom">{l.rom}</span>
                {l.ipa && <span className="ipa">/{l.ipa}/</span>}
                {l.word && <span className="ex"><span lang="bn">{l.word}</span> ({l.wrom}): {l.wmean}</span>}
                {l.tip && <span className="ex">{l.tip}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Vowel signs (কার) on the letter ক</h2>
      <p>Once you know the letters, the next step is the vowel signs. Here is each one on <span lang="bn">ক</span> (ko).</p>
      <ul className="gd-letters">
        {KAR.map(([sign, rom, ex]) => (
          <li key={rom}><span className="ch" lang="bn">{ex}</span><span className="rom">{rom}</span><span className="ex">the sign <span lang="bn">{`◌${sign}`}</span></span></li>
        ))}
      </ul>

      <h2>How to learn the letters</h2>
      <ol>
        <li><b>Start with the vowels and the first few consonants.</b> Learn them in small groups of five, not all at once.</li>
        <li><b>Say each one aloud</b> while you look at it, and compare similar sounds such as <span lang="bn">ক</span> and <span lang="bn">খ</span> (with and without a puff of air).</li>
        <li><b>Write them by hand.</b> Tracing the shape helps you remember it.</li>
        <li><b>Read real words early.</b> Words such as <span lang="bn">আম</span> (aam, mango) and <span lang="bn">জল</span> (jol, water) make the letters stick.</li>
        <li><b>Review a little every day.</b> Ten minutes of flashcards beats one long session a week.</li>
      </ol>
      <p>For the full plan, read <Link href="/learn-bengali">how to learn Bengali from zero</Link>, then practice the numbers on the <Link href="/bengali-numbers">Bengali numbers 1 to 100</Link> page.</p>

      <GuideCta />
    </>
  );
}
