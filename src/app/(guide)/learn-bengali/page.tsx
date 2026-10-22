import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../JsonLd";
import { OG_IMAGES, PREPLY_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { Crumbs, GuideCta } from "../GuideBits";

const TITLE = "How to Learn Bengali from Zero";
const SHORT = "A step-by-step plan to learn Bengali from zero, from the alphabet to speaking, by a Kolkata teacher.";
const DESC = "A practical plan to learn Bengali from zero: alphabet, vowel signs, numbers, vocabulary, grammar and speaking, plus a daily routine.";
export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${SITE_NAME}` },
  description: DESC,
  alternates: { canonical: "/learn-bengali" },
  openGraph: { type: "article", url: "/learn-bengali", title: TITLE, description: SHORT, images: OG_IMAGES },
  twitter: { card: "summary_large_image", title: TITLE, description: SHORT, images: ["/twitter-image"] },
};

const FAQ = [
  { q: "How long does it take to learn Bengali?", a: "It depends on your time and goal. With ten minutes of practice a day, many learners can read the script within a few weeks and handle simple everyday conversations after a few months. Fluency takes longer and needs real conversation." },
  { q: "Is Bengali hard for English speakers?", a: "The script and a few sounds, such as the puffed consonants and the curled-tongue t and d, take time. The grammar is friendlier than many expect: there are no articles and no grammatical gender, and verbs follow regular patterns. The main extra step is choosing between three levels of “you”." },
  { q: "Do I need to learn the Bengali script?", a: "Yes, if you can. Romanization is useful at the start, but the script shows you the sounds exactly, lets you read signs and messages, and is much faster to learn than most people expect. Many heritage learners can already understand speech and only need the script." },
  { q: "Can I learn Bengali on my own?", a: "Yes, with a clear order of lessons and daily practice, especially for reading, vocabulary and grammar. Speaking improves fastest when you also practice with a teacher or a native speaker, which is why many students combine self-study with live lessons." },
  { q: "Are Bengali and Bangla the same language?", a: "Yes. Bangla is the word Bengali speakers use for their own language. The two names mean the same thing." },
  { q: "Is the Bengali of Kolkata different from the Bengali of Bangladesh?", a: "They share one script and one standard written language, and speakers understand each other. A number of everyday words differ: water is জল (jol) in Kolkata and পানি (pani) in Bangladesh." },
];

export default function LearnBengali() {
  return (
    <>
      <Crumbs name="Learn Bengali" path="/learn-bengali" />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: TITLE, description: DESC, inLanguage: "en", mainEntityOfPage: `${SITE_URL}/learn-bengali`,
        author: { "@type": "Person", name: "Pritam", sameAs: [PREPLY_URL] }, publisher: { "@type": "EducationalOrganization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/logo.png` }, image: `${SITE_URL}/opengraph-image` }} />
      <h1>How to learn Bengali from zero</h1>
      <p className="gd-lead">A step-by-step plan from a Bengali teacher in Kolkata: what to learn, in what order, and how to practice so it sticks. It works for beginners, for heritage learners and for anyone learning to talk with a Bengali-speaking family.</p>

      <p>Bengali (also called <b>Bangla</b>, <span lang="bn">বাংলা</span>) is spoken by more than 230 million people, mostly in Bangladesh and in West Bengal and nearby states of India. It is the national language of Bangladesh and one of the 22 scheduled languages of India. Learning it opens up a literature that includes Rabindranath Tagore, a huge music tradition and a way to talk with family in their own words.</p>

      <h2>Step 1: Learn the script first</h2>
      <p>Learn the letters before anything else. Romanized spelling is a useful crutch for the first weeks, but the script is regular, and once you can read it every other step gets easier. There are about fifty letters, grouped into vowels and consonants, plus a few special signs. Take them a handful at a time and say each one aloud. Our free chart lists them all with pronunciation: <Link href="/bengali-alphabet">the Bengali alphabet</Link>.</p>

      <h2>Step 2: Add the vowel signs</h2>
      <p>Each consonant carries a built-in “o” sound, so <span lang="bn">ক</span> is “ko”. Vowel signs (<span lang="bn">কার</span>) change it: <span lang="bn">কা</span> (kaa), <span lang="bn">কি</span> (ki), <span lang="bn">কী</span> (kee), <span lang="bn">কু</span> (ku), <span lang="bn">কে</span> (ke), <span lang="bn">কো</span> (ko) and so on. Learning these turns single letters into real words.</p>

      <h2>Step 3: Numbers</h2>
      <p>Bengali has its own digits, <span lang="bn">০১২৩৪৫৬৭৮৯</span>, and its own number words. Numbers up to 100 are all separate words, so they take repetition. Start with 1 to 10, then work up in tens. See every number on <Link href="/bengali-numbers">Bengali numbers 1 to 100</Link>.</p>

      <h2>Step 4: Build a core vocabulary by topic</h2>
      <p>Learn words in topics that you will use: greetings, family, food, the house, time, travel and the most common verbs. Hear each word as you learn it, and review with spaced repetition, so words you miss come back soon and words you know come back later. A few hundred well-chosen words already cover a large part of everyday talk.</p>

      <h2>Step 5: Learn the grammar that matters most</h2>
      <ul>
        <li><b>Word order is subject, object, verb.</b> <span lang="bn">আমি ভাত খাই</span> (ami bhat khai) is “I rice eat”, meaning “I eat rice”.</li>
        <li><b>No articles and no grammatical gender.</b> There is no “a” or “the”, and the same word is used for “he” and “she”.</li>
        <li><b>Three levels of “you”.</b> <span lang="bn">আপনি</span> (apni) is formal, <span lang="bn">তুমি</span> (tumi) is friendly and <span lang="bn">তুই</span> (tui) is very close or rude. The verb changes with the level: <span lang="bn">আপনি কেমন আছেন?</span> (apni kemon achhen?), <span lang="bn">তুমি কেমন আছো?</span> (tumi kemon achho?), <span lang="bn">তুই কেমন আছিস?</span> (tui kemon achhis?). Choosing the right one is the key to speaking respectfully with elders.</li>
        <li><b>Little words after the noun.</b> Case endings and postpositions do the work that prepositions do in English: <span lang="bn">বাজারে</span> (bajare) is “at the market”.</li>
      </ul>

      <h2>Step 6: Speak early, in real situations</h2>
      <p>Do not wait until you feel ready. Practice short role plays for the situations you will meet: the market, a doctor’s visit, a phone call with family, a train ticket. Say your part aloud, record yourself and compare it with a native speaker. Speaking from the first weeks, even in simple sentences, is the fastest way to find the gaps.</p>

      <h2>Step 7: Make it a ten-minute daily habit</h2>
      <p>Short, regular practice beats long, rare sessions. A simple routine:</p>
      <ol>
        <li><b>Three minutes</b> reviewing flashcards.</li>
        <li><b>Four minutes</b> on one new lesson: a few letters, words or a grammar point.</li>
        <li><b>Three minutes</b> saying sentences aloud or writing letters by hand.</li>
      </ol>

      <h2>Kolkata Bengali and Bangladeshi Bengali</h2>
      <p>The script and the written standard are the same in West Bengal and Bangladesh, and speakers understand each other easily. Some everyday words and the accent differ. Whichever you choose to learn, you will be understood in both.</p>

      <h2>Frequently asked questions</h2>
      {FAQ.map((f) => (
        <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
      ))}

      <p style={{ marginTop: 28 }}>Learning with a live teacher is the quickest way to get speaking right. You can <a href={PREPLY_URL} target="_blank" rel="noopener">book a one-to-one lesson with Pritam on Preply</a> and use Bengali Practice between lessons to read, remember and write what you learn.</p>

      <GuideCta />
    </>
  );
}
