import type { Metadata } from "next";
import JsonLd from "./JsonLd";
import { inter } from "./inter";
import { OG_IMAGES, PREPLY_URL, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, SOCIAL_DESCRIPTION } from "@/lib/site";
import "./landing.css";
import type { CSSProperties } from "react";
import Image from "next/image";
import Logo from "./Logo";
import Link from "next/link";
import { priceInr, priceUsd } from "@/lib/pricing";
import { IndiaText, Price } from "./Price";
import { IconTile } from "./learn/Icon";
import { SiteFooter } from "./legal/LegalPage";
import Taster from "./Taster";
import StickyCta from "./StickyCta";
import BuyLink from "./BuyLink";
import PricingSeen from "./PricingSeen";
import LandingMotion from "./LandingMotion";
import ScrollFx from "./ScrollFx";
import ThemeSwitch from "./ThemeSwitch";
import AssembleSentence from "./AssembleSentence";
import VowelStrip from "./VowelStrip";
import { BUSINESS } from "@/data/business";
import { QUOTES, TEACHER, type Quote } from "@/data/landing";
import { VOCAB } from "@/data/vocabulary";
import { GRAMMAR } from "@/data/grammar";
import { SCENARIOS } from "@/data/roleplay";
import { CLASSWORK } from "@/data/classwork";
import { EXAMS } from "@/data/exams";
import { GOALS } from "@/data/paths";
import { STORIES } from "@/data/stories";
import { DEV_STORIES } from "@/data/devotional-stories";
import { DEV_TOPICS } from "@/data/devotional";
import { TOPICS } from "@/data/impromptu";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: SITE_NAME, title: SITE_TITLE, description: SOCIAL_DESCRIPTION, images: OG_IMAGES },
};

const VOCAB_WORDS = VOCAB.reduce((n, t) => n + t.sections.reduce((m, s) => m + s.words.length, 0), 0);
const VOCAB_ROUND = Math.round(VOCAB_WORDS / 100) * 100;
const IMPROMPTU_COUNT = Object.values(TOPICS).flat().length;
const EXAM_MINUTES = EXAMS.map((e) => e.minutes);

const COURSES = [
  { seg: "reading", icon: "reading", bn: "পড়া", ro: "pora", title: "Reading", outcome: "Read any Bengali word aloud.", body: `The alphabet, vowel signs, numbers and money, then ${STORIES.length} short fables read in three layers: Bengali, romanized, English.` },
  { seg: "speaking", icon: "speaking", bn: "বলা", ro: "bola", title: "Speaking", outcome: "Hold a simple conversation.", body: `Hear it, then say it: letter sounds, everyday phrases, ${SCENARIOS.length} role plays and impromptu speaking against a timer.` },
  { seg: "vocabulary", icon: "vocabulary", bn: "শব্দ", ro: "shobdo", title: "Vocabulary", outcome: `Know about ${VOCAB_ROUND} everyday words.`, body: `${VOCAB.length} topics, each with audio and spaced-repetition flashcards.` },
  { seg: "grammar", icon: "grammar", bn: "ব্যাকরণ", ro: "bakoron", title: "Grammar", outcome: "Build sentences of your own.", body: `${GRAMMAR.length} topics, each explained in plain English and practiced until it sticks, with a tense workout and translation drills.` },
  { seg: "writing", icon: "writing", bn: "লেখা", ro: "lekha", title: "Writing", outcome: "Write the script by hand.", body: "Trace letters, vowel signs and numerals on the screen with your finger or a mouse, then build words and sentences piece by piece." },
] as const;

const AUDIENCE: { kind: Quote["kind"]; bn: string; ro: string; gloss: string; tag: string; lead: string; body: string }[] = [
  { kind: "heritage", bn: "শিকড়", ro: "shikor", gloss: "roots", tag: "Heritage learners", lead: "You grew up hearing it. Now you want to read it.", body: "Many of my heritage students understand far more than they can say, and can't read a word. We start with the alphabet you've heard all your life and build towards reading your family's messages and answering back." },
  { kind: "partner", bn: "আত্মীয়", ro: "attiyo", gloss: "family, kin", tag: "Partners and in-laws", lead: "You married into a Bengali family and want to join the conversation.", body: "You start from zero, and that is fine. Short daily lessons, romanized English you can switch off when you're ready, and role plays for the moments that matter: the dinner table, the phone call, the trip to Kolkata." },
  { kind: "devotee", bn: "ভক্তি", ro: "bhokti", gloss: "devotion", tag: "Devotees", lead: "You want to read the bhajans and mantras in the original.", body: "Learn the script first, then read real mantras, bhajans and sādhu-saṅga passages letter by letter. The letters and words have audio, so you can check how they sound as you go." },
];

const POINTS = [
  { n: "১", title: "Romanized English, on or off", body: "Lean on it at the start. Switch it off when you can read.", bn: "আমি বাংলা পড়ি", ro: "ami bangla pori", gloss: "I read Bengali" },
  { n: "২", title: "Hear it, then say it", body: "Every letter, number and vocabulary word has audio. Listen, repeat, compare.", bn: "শোনো", ro: "shono", gloss: "listen" },
  { n: "৩", title: "Flashcards that remember", body: "Words you miss come back sooner. Words you know wait longer.", bn: "মনে রাখা", ro: "mone rakha", gloss: "to remember" },
  { n: "৪", title: "Streaks and goals", body: "A daily goal, a streak and a class leaderboard, kept quiet.", bn: "রোজ", ro: "roj", gloss: "every day" },
  { n: "৫", title: "Built from my lessons", body: "Nothing generic. Every exercise is one I have used with a student.", bn: "ক্লাস", ro: "klas", gloss: "class" },
];

const FAQ = [
  { q: "Do I need to know any Bengali already?", a: "No. The Reading course starts with the alphabet and the vowel signs. If you already speak a little, you can go straight to any course." },
  { q: "Is this live tutoring?", a: "No. It is self-paced practice you can use any time, on your own. Live lessons with me are separate and optional, and you can book them on Preply." },
  { q: "How much time does it take?", a: "Lessons are short. Ten minutes a day is enough to make steady progress." },
  { q: "Can I turn the romanized English off?", a: "Yes, at any time. Most students keep it on for the first weeks and switch it off once they can read." },
  { q: "Can I practice writing?", a: "Yes. The Writing course has you trace letters, vowel signs and numerals on the screen with your finger or a mouse, then build words and sentences from their pieces." },
  { q: "What is My path?", a: "A plan built from the lessons already in the app. You pick a goal, such as talking with family, devotional reading, work, travel or reading Bengali, and it lines up the lessons in order with the time each needs. If you already read the script, you can skip that stage." },
  { q: "Is there audio?", a: "Yes, for every letter, number and vocabulary word, so you always know how it should sound." },
  { q: "What is the devotional track?", a: "A separate set of readings: mantras, bhajans and sādhu-saṅga passages, to read in the original Bengali." },
  { q: "Who writes the lessons?", a: "I do, from the lessons and worksheets I use with my online students." },
  { q: "Which Bengali do you teach?", a: "The standard Bengali of West Bengal (Kolkata). Learners from Bangladesh will understand it, and a few everyday words differ: water is জল (jol) in Kolkata and পানি (pani) in Bangladesh." },
  { q: "How do I sign in?", a: "With your email address. We send a one-time link, valid for 15 minutes, so there is no password to remember." },
  { q: "Is it a subscription?", a: "No. You pay once for 12 months of access. It does not renew by itself, and if you renew early the 12 months are added on." },
  { q: "What happens after 12 months?", a: "Your access pauses on the day it ends and you will see a page with a renew button. Your progress and flashcards are kept, and when you renew they are right where you left them. Renew before the end date and the 12 months are added to the time you have left." },
  { q: "Is it safe to pay by card from the US?", a: "Yes. Payments go through Razorpay, a licensed payment company, and your card details never reach us. If you are in the US you pay in US dollars, so your bank shows the charge in dollars." },
  { q: "Can I pay from India?", a: "Yes. Students in India can pay in rupees by UPI or card. Everyone else pays in US dollars by card." },
  { q: "Can I give it as a gift?", a: "Yes. Enter their email address at checkout and the sign-in link goes to them." },
  { q: "Does it work on my phone?", a: "Yes. Every lesson, quiz and recording works on phones, tablets and laptops." },
  { q: "What about refunds?", a: "REFUND" },
  { q: "Who is behind this?", a: `I am Pritam, an online Bengali teacher. I teach one to one, mostly learners in the US, and I built this because my students needed somewhere to practice between lessons. You can write to ${BUSINESS.email} with any question.` },
];

// Built once and refreshed every six hours (the rupee price follows the exchange rate). Signed-in visitors are sent on by src/proxy.ts.
export const revalidate = 21600;

export default async function Home() {
  const usd = priceUsd();
  const inr = (await priceInr()).amount;
  const quoteFor = (kind: Quote["kind"]) => QUOTES.find((q) => q.kind === kind);
  const proofQuotes = QUOTES.slice(0, 3);
  const hasProof = proofQuotes.length > 0 || TEACHER.stats.length > 0;
  const hasAbout = TEACHER.story.length > 0;

  const refundAnswer = `Not for you? Email ${BUSINESS.email} within ${BUSINESS.refundDays} days of paying for a full refund. If anything goes wrong with a payment, write to us and we will sort it out.`;
  const org = { "@type": "EducationalOrganization", "@id": `${SITE_URL}/#org`, name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/logo.png`, email: BUSINESS.email, founder: { "@id": `${SITE_URL}/#pritam` }, sameAs: [PREPLY_URL], address: { "@type": "PostalAddress", addressLocality: "Kolkata", addressRegion: "West Bengal", addressCountry: "IN" } };
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      org,
      { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: SITE_URL, name: SITE_NAME, description: SITE_DESCRIPTION, inLanguage: "en", publisher: { "@id": `${SITE_URL}/#org` } },
      { "@type": "Person", "@id": `${SITE_URL}/#pritam`, name: TEACHER.name, jobTitle: "Online Bengali teacher", image: `${SITE_URL}/landing/pritam.jpg`, homeLocation: { "@type": "Place", name: "Kolkata, India" }, knowsLanguage: ["bn", "en", "hi"], sameAs: [PREPLY_URL], worksFor: { "@id": `${SITE_URL}/#org` } },
      {
        "@type": "Course", "@id": `${SITE_URL}/#course`, name: "Bengali Practice: read, speak and write Bengali", url: SITE_URL, inLanguage: "en",
        description: "Short daily lessons in the Bengali alphabet, vocabulary, grammar, speaking role plays and writing, with audio, flashcards and timed exams, for beginners and heritage learners.",
        teaches: "Reading, speaking and writing Bengali", educationalLevel: "Beginner", provider: { "@id": `${SITE_URL}/#org` }, instructor: { "@id": `${SITE_URL}/#pritam` },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT10M", instructor: { "@id": `${SITE_URL}/#pritam` } },
        offers: { "@type": "Offer", category: "Paid", price: usd, priceCurrency: "USD", url: `${SITE_URL}/buy`, availability: "https://schema.org/InStock" },
      },
      { "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a === "REFUND" ? refundAnswer : f.a } })) },
    ],
  };

  const shots = [
    { id: "home", bn: "আজ", ro: "aj", gloss: "today", title: "A home page that knows where you left off", text: "Your streak, today's goal and the next lesson, in one place.", notes: ["Your streak", "Today's goal", "The next lesson, one tap away"], alt: "The learner home page showing a streak and the next lesson" },
    { id: "flashcard", seg: "vocabulary", bn: "শব্দ", ro: "shobdo", gloss: "word", title: `Flashcards for about ${VOCAB_ROUND} words`, text: `${VOCAB.length} topics. Each word comes back just before you would forget it.`, alt: "A vocabulary flashcard" },
    { id: "roleplay", seg: "speaking", bn: "বাজারে", ro: "bajare", gloss: "at the market", title: `${SCENARIOS.length} role plays`, text: "The market, the doctor, a hotel, the train, and talking with your family. Say your part out loud.", alt: "A role play lesson" },
    { id: "writing", seg: "writing", bn: "লেখা", ro: "lekha", gloss: "writing", title: "Write the letters yourself", text: "Trace each letter, vowel sign and numeral on the screen with your finger or a mouse, then build words and sentences piece by piece.", alt: "The writing pad with a letter being traced" },
    { id: "grammar", seg: "grammar", bn: "ব্যাকরণ", ro: "bakoron", gloss: "grammar", title: `${GRAMMAR.length} grammar topics`, text: "Each topic explained in plain English, then practiced until it comes without thinking.", alt: "A grammar exercise" },
    { id: "exam", bn: "পরীক্ষা", ro: "porikkha", gloss: "exam", title: "Timed exams", text: `Test yourself against the clock, the way a class would. ${EXAMS.length} exams, ${Math.min(...EXAM_MINUTES)} to ${Math.max(...EXAM_MINUTES)} minutes each: grammar, vocabulary, and alphabet and numbers.`, alt: "A timed exam in progress" },
  ];
  const alsoIn = [
    { title: "Word finder", bn: "খোঁজো", ro: "khonjo", gloss: "look it up", text: `Type English, Bengali or romanized and find any of the ${VOCAB_ROUND} words, with audio.` },
    { title: "Tense workout", bn: "কাল", ro: "kal", gloss: "tense", text: "Rounds on tense cues, time words and negatives, to check and to write." },
    { title: "Numbers and money", bn: "টাকা", ro: "taka", gloss: "money", text: "Read and hear numerals and prices, from one to the big numbers." },
    { title: "Devotional readings", bn: "ভক্তি", ro: "bhokti", gloss: "devotion", text: `${DEV_TOPICS.length} topics and ${DEV_STORIES.length} stories of mantras, bhajans and passages, to read in the original.` },
    { title: "Quick translation", bn: "অনুবাদ", ro: "onubad", text: "Short English sentences to turn into Bengali, fast." },
    { title: "Impromptu speaking", bn: "বলো তো", ro: "bolo to", gloss: "go on, say it", text: `${IMPROMPTU_COUNT} prompts, casual, professional and open. Keep talking until the timer runs out.` },
    { title: "Story relay", bn: "গল্প", ro: "golpo", gloss: "story", text: "A story built one sentence at a time." },
    { title: `${CLASSWORK.length} class worksheet sets`, bn: "খাতা", ro: "khata", gloss: "notebook", text: "The same worksheet sets I use in class." },
  ];


  return (
    <div className={`cr ${inter.variable}`}>
      <JsonLd data={graph} />
      <LandingMotion />
      <ScrollFx />

      <header className="cr-nav">
        <div className="cr-pill">
          <Link href="/" className="cr-brand">
            <Logo />
            <span><b lang="bn">বাংলা</b> Practice</span>
          </Link>
          <nav aria-label="Sections">
            <a href="#learn">Courses</a>
            <a href="#try">Try it</a>
            <a href="#about">About</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="cr-pill-end">
            <ThemeSwitch />
            <Link href="/login" className="cr-signin">Sign in</Link>
            <BuyLink place="nav" className="cr-btn sm">Get access</BuyLink>
          </div>
        </div>
      </header>

      <main>
        <section className="cr-hero">
          <div className="cr-floats" aria-hidden="true">
            <span className="cr-fl a" data-fx="tilt" data-amt="-30" lang="bn">ক</span>
            <span className="cr-fl b" data-fx="tilt" data-amt="26" lang="bn">৫</span>
            <span className="cr-fl c" data-fx="tilt" data-amt="-26" lang="bn">আ</span>
            <span className="cr-fl d" data-fx="tilt" data-amt="30" lang="bn">কি</span>
          </div>
          <p className="cr-chip">Practice built by an online Bengali teacher</p>
          <h1>Read, speak and write Bengali, <em>one short lesson a day.</em></h1>
          <p className="cr-lead">I&apos;m Pritam. I teach Bengali online, one to one. This is where my students practice between our lessons, and now you can too.</p>
          <div className="cr-cta">
            <BuyLink place="hero" className="cr-btn on-dark">Start learning · <Price usd={usd} inr={inr} /> for 12 months</BuyLink>
            <a className="cr-btn ghost-dark" href="#try">Try a letter</a>
          </div>
          <p className="cr-fine-dark">Pay once for a year. No password, just an email link.</p>
          <div className="cr-hero-grid">
            <figure className="cr-first">
              <span className="cr-glyph" lang="bn">অ</span>
              <figcaption>
                <b>The first letter</b>
                <span>Every Bengali child starts here: <span lang="bn">অ-তে অজগর</span>, o-te ojogor, &ldquo;o is for python.&rdquo;</span>
              </figcaption>
            </figure>
            <Taster />
          </div>
        </section>

        <section className="cr-sec cr-wrap" id="learn">
          <div className="cr-head" data-reveal>
            <h2>Five courses, in the order I teach them.</h2>
            <p>Each one builds on the last. Reading comes first, because everything else is easier once the letters are yours.</p>
          </div>
          <div className="cr-courses">
            {COURSES.map((f, i) => (
              <article key={f.title} className={"cr-course" + (f.seg === "writing" ? " wide" : "")} data-seg={f.seg} data-reveal>
                <div className="cr-course-top">
                  <IconTile name={f.icon} size={36} />
                  <span className="cr-course-n">Course {["one", "two", "three", "four", "five"][i]}</span>
                </div>
                <p className="cr-bnword" lang="bn">{f.bn}</p>
                <p className="cr-ro"><i>{f.ro}</i></p>
                <h3>{f.title}</h3>
                <p className="cr-outcome">{f.outcome}</p>
                <p>{f.body}</p>
                {f.seg === "reading" && <div className="cr-vowels"><VowelStrip /></div>}
                {f.seg === "writing" && <p className="cr-bigletters" lang="bn" aria-hidden="true"><span>ক</span><span>কি</span><span>৫</span><span>আমি</span></p>}
              </article>
            ))}
          </div>
          <p className="cr-note"><span lang="bn">ভক্তি</span> <i>bhokti</i> · devotion. Alongside the five courses, a separate <b>devotional track</b>: {DEV_TOPICS.length} topics and {DEV_STORIES.length} stories, with mantras, bhajans and sādhu-saṅga passages, set for reading in the original once you know the letters.</p>
        </section>

        <section className="cr-sec cr-wrap" id="practice">
          <div className="cr-head" data-reveal>
            <h2>The app, exactly as my students use it.</h2>
            <p>Real screens, nothing mocked up.</p>
          </div>
          <div className="cr-stack">
            {shots.map((sh, i) => (
              <article key={sh.id} className={"cr-panel cr-show" + (i % 2 ? " rev" : "")} data-tint={sh.id} style={{ "--i": i } as CSSProperties} data-reveal>
                <div className="cr-show-text">
                  <p className="cr-tag"><span lang="bn">{sh.bn}</span> <i>{sh.ro}</i> · {sh.gloss}</p>
                  <h3>{sh.title}</h3>
                  <p>{sh.text}</p>
                  {"notes" in sh && sh.notes && <ul className="cr-notes">{sh.notes.map((n) => <li key={n}>{n}</li>)}</ul>}
                </div>
                <figure className="cr-shot" data-fx="zoom">
                  <Image className="d" src={`/landing/shots/${sh.id}-1440.webp`} width={1440} height={900} sizes="(max-width: 900px) 100vw, 640px" alt={sh.alt} />
                  <Image className="m" src={`/landing/shots/${sh.id}-390.webp`} width={780} height={1688} sizes="300px" alt={sh.alt} />
                </figure>
              </article>
            ))}
          </div>

          <div className="cr-duo">
            <article className="cr-panel" data-tint="path" data-reveal>
              <p className="cr-tag"><span lang="bn">পথ</span> <i>poth</i> · path</p>
              <h3>Pick your reason. Get a path.</h3>
              <p>Learning for family, for devotion, for work or for a trip? Choose a goal and My path lines up the lessons that matter for it, in order, with a line on why each one is there. Already read the script? Skip that stage.</p>
              <ul className="cr-goals">{GOALS.map((g) => <li key={g.id}>{g.title}</li>)}</ul>
            </article>
            <article className="cr-panel" data-tint="progress" data-reveal>
              <p className="cr-tag"><span lang="bn">অগ্রগতি</span> <i>ogrogoti</i> · progress</p>
              <h3>See yourself getting better.</h3>
              <p>A daily goal and a streak keep the habit going. Your progress page shows the last 17 weeks of practice and your milestones, and a quiet class leaderboard shows how you compare. Bring a friend with your referral link and add 3 months to your plan.</p>
              <ul className="cr-goals"><li>Daily goal</li><li>Streak</li><li>17-week calendar</li><li>Milestones</li><li>Class leaderboard</li><li>Refer a friend</li></ul>
            </article>
          </div>

          <h3 className="cr-sub" data-reveal>Also in the box</h3>
          <div className="cr-also">
            {alsoIn.map((a, n) => (
              <div key={a.title} className="cr-card" data-fx="par" data-amt={n % 2 ? 90 : -90} data-reveal>
                <p className="cr-tag"><span lang="bn">{a.bn}</span> <i>{a.ro}</i>{"gloss" in a && a.gloss ? ` · ${a.gloss}` : ""}</p>
                <h4>{a.title}</h4>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cr-sec cr-wrap cr-why">
          <div className="cr-why-side" data-reveal>
            <h2>How it helps you learn.</h2>
            <p>Five things I built in because my own students needed them.</p>
          </div>
          <ol className="cr-why-list">
            {POINTS.map((p) => (
              <li key={p.title} data-fx="focus">
                <p className="cr-tag"><span lang="bn">{p.bn}</span> <i>{p.ro}</i> · {p.gloss}</p>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="cr-sec cr-wrap cr-aud">
          <div className="cr-head" data-reveal>
            <h2>Three kinds of student, one way of learning.</h2>
          </div>
          <div className="cr-aud-grid">
            {AUDIENCE.map((a) => {
              const q = quoteFor(a.kind);
              return (
                <article key={a.kind} className="cr-panel cr-aud-card" data-tint={a.kind} data-reveal>
                  <p className="cr-bigword" lang="bn">{a.bn}</p>
                  <p className="cr-ro"><i>{a.ro}</i> · {a.gloss}</p>
                  <p className="cr-kicker">{a.tag}</p>
                  <p className="cr-serif">{a.lead}</p>
                  <p>{a.body}</p>
                  {q && <blockquote className="cr-quote">“{q.text}”<cite>{q.name}, {q.city}</cite></blockquote>}
                </article>
              );
            })}
          </div>
        </section>

        {hasAbout && (
          <section className="cr-sec cr-wrap" id="about">
            <div className="cr-panel cr-about" data-tint="about" data-reveal>
              <div>
                <h2>Between our lessons, my students had <em>nowhere to practice.</em></h2>
                <p className="cr-word"><span lang="bn">অভ্যাস</span><span><i>obbhash</i><small>practice; the daily habit of it</small></span></p>
              </div>
              <div className="cr-story">
                {TEACHER.story.map((p) => <p key={p}>{p}</p>)}
                <p className="cr-sign">{TEACHER.name} <span lang="bn">{TEACHER.nameBn}</span> <small>· {TEACHER.place}</small></p>
                {TEACHER.stats.length > 0 && (
                  <dl className="cr-stats">{TEACHER.stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}</dl>
                )}
                {TEACHER.worksheet && <Image src={TEACHER.worksheet} alt="A class worksheet" width={640} height={420} className="cr-photo" />}
                {TEACHER.videoSrc && (
                  <video className="cr-video" controls playsInline preload="none" poster={TEACHER.videoPoster}>
                    <source src={TEACHER.videoSrc} />
                    {TEACHER.captionsSrc && <track kind="captions" src={TEACHER.captionsSrc} srcLang="en" label="English" default />}
                  </video>
                )}
                {TEACHER.liveLessonsUrl && <p><a href={TEACHER.liveLessonsUrl}>Want live lessons too? I teach one to one online.</a></p>}
              </div>
            </div>
          </section>
        )}

        <section className="cr-sec cr-wrap" id="live">
          <div className="cr-head" data-reveal>
            <h2>The complete way to learn Bengali.</h2>
            <p>Learn it live in class with me, then practice it here between lessons. The two work together, and you move faster than with either one alone.</p>
          </div>
          <div className="cr-ways">
            <article className="cr-way cr-way-live" data-reveal>
              <div className="cr-way-top">
                <Image src={TEACHER.photo ?? "/landing/pritam.jpg"} alt={`${TEACHER.name}, your Bengali teacher`} width={160} height={160} className="cr-way-photo" />
                <div>
                  <p className="cr-tag"><span lang="bn">ক্লাস</span> <i>klas</i> · class, with me on Preply</p>
                  <h3>Learn it live with me</h3>
                </div>
              </div>
              <p>If you want a real, hands-on experience, book me on Preply. Lessons are one to one and conversation first from the very first one. I explain in English or Hindi and move into Bengali as you grow, and I tailor each lesson to your goal: family, heritage, travel, business or reading in the original.</p>
              <ul className="cr-facts">
                <li><b>5.0</b> from 3 reviews</li>
                <li><b>55</b> lessons taught</li>
                <li><b>6 years</b> teaching Bengali</li>
                <li>Preply certified tutor</li>
              </ul>
              <figure className="cr-say">
                <blockquote>“Great teacher, very knowledgeable about tough grammatical concepts, he has been very patient with me and encourages progress over perfection.”</blockquote>
                <figcaption>Neel, on Preply</figcaption>
              </figure>
              <figure className="cr-say">
                <blockquote>“Pritam is patient and kind. He prepares a variety of engaging and unique activities for his lessons.”</blockquote>
                <figcaption>Brian, on Preply</figcaption>
              </figure>
              <a className="cr-btn on-dark" href={TEACHER.liveLessonsUrl} target="_blank" rel="noopener">Book me on Preply</a>
              <p className="cr-fine-dark">Lessons start at $8 for 50 minutes. See my calendar and current rates on my Preply profile.</p>
            </article>
            <span className="cr-plus" aria-hidden="true">+</span>
            <article className="cr-panel cr-way" data-tint="about" data-reveal>
              <p className="cr-tag"><span lang="bn">অভ্যাস</span> <i>obbhash</i> · practice, on this platform</p>
              <h3>Practice it here, every day</h3>
              <p>A lesson is only an hour a week. This is where what we cover in class turns into something you can read, say and remember, in ten minutes a day.</p>
              <ul className="cr-ticks">
                <li>Flashcards that bring back the words you are about to forget</li>
                <li>Audio, role plays and a writing pad, to say it and write it</li>
                <li>A path built around your goal, with timed exams to check yourself</li>
                <li>One price for 12 months, nothing renews</li>
              </ul>
              <a className="cr-btn" href="#pricing">See pricing</a>
              <p className="cr-fine">No lessons booked yet? The platform also works on its own, at your own pace.</p>
            </article>
          </div>
        </section>

        {hasProof && (
          <section className="cr-sec cr-wrap">
            {proofQuotes.length > 0 && (
              <div className="cr-aud-grid">
                {proofQuotes.map((q) => (
                  <figure key={q.name + q.text} className="cr-panel cr-aud-card" data-tint={q.kind === "general" ? "about" : q.kind}>
                    <blockquote className="cr-quote big">“{q.text}”</blockquote>
                    <figcaption>
                      {q.photo && <Image src={q.photo} alt="" width={40} height={40} className="cr-qphoto" />}
                      <b>{q.name}</b>, {q.city}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
            {TEACHER.stats.length > 0 && (
              <dl className="cr-stats">{TEACHER.stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}</dl>
            )}
          </section>
        )}

        <section className="cr-sec cr-wrap" id="pricing">
          <div className="cr-head" data-reveal>
            <h2>One price. Twelve months. Nothing renews.</h2>
          </div>
          <div className="cr-price-grid" data-reveal>
            <div className="cr-price-dark">
              <p className="cr-chip">Pay once, learn for a year</p>
              <p className="cr-price"><Price usd={usd} inr={inr} /> <small>one-time · about <Price usd={usd} inr={inr} per /> a month</small></p>
              <p>Most language apps charge $9 to $20 a month and renew automatically. Here you pay once. When the year is over, nothing happens unless you choose to come back.</p>
              <p>New activities are added during your year, and if you renew early the 12 months are added on. Know someone who would like it? Every student gets a link that adds 3 months to their plan for each friend who joins.</p>
              <BuyLink place="pricing" className="cr-btn on-dark">Get 12 months · <Price usd={usd} inr={inr} /></BuyLink>
              <p className="cr-promise"><b>{BUSINESS.refundDays}-day full refund.</b> If it isn&apos;t right for you, write to me within {BUSINESS.refundDays} days and I&apos;ll refund every rupee or cent.</p>
              <p className="cr-fine-dark">Secure checkout by Razorpay · <Link href="/refunds">Refund policy</Link> · Visa, Mastercard, Amex</p>
            </div>
            <div className="cr-price-light">
              <h3>What&apos;s included</h3>
              <ul className="cr-ticks">
                <li>All five courses: Reading, Speaking, Vocabulary, Grammar, Writing</li>
                <li>My path, a lesson plan for your goal</li>
                <li>The devotional track</li>
                <li>Audio for every letter, number and vocabulary word</li>
                <li>Flashcards, role plays, worksheets and timed exams</li>
                <li>Streaks, goals and the class leaderboard, with your progress saved</li>
                <li>You get a sign-in link by email; no password</li>
                <li><IndiaText india="Pay by UPI or card, in rupees" other="Pay by card in US dollars; students in India pay in rupees by UPI" /></li>
                <li>No subscription, nothing renews by itself</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="cr-sec cr-wrap cr-faq-wrap" id="faq">
          <div className="cr-faq-side" data-reveal>
            <h2>What people ask me first.</h2>
            <p className="cr-word"><span lang="bn">প্রশ্ন</span><span><i>proshno</i><small>question</small></span></p>
            <p>Something not covered here? <a href={`mailto:${BUSINESS.email}`}>Write to me</a> and I&apos;ll answer myself.</p>
          </div>
          <div className="cr-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                {f.a === "REFUND"
                  ? <p>Not for you? Email {BUSINESS.email} within {BUSINESS.refundDays} days of paying for a full refund. If anything goes wrong with a payment, write to us and we will sort it out. <Link href="/refunds">Read the refund policy</Link>.</p>
                  : <p>{f.a}</p>}
              </details>
            ))}
          </div>
        </section>

        <section className="cr-final">
          <AssembleSentence text="আমি বাংলা শিখছি।" roman="ami bangla shikhchhi" english="I am learning Bengali." />
          <h2><em>Ready to read your first Bengali sentence?</em></h2>
          <p className="cr-lead">Start today with the alphabet. Ten minutes a day is enough.</p>
          <div className="cr-cta">
            <BuyLink place="final" className="cr-btn on-dark">Start learning · <Price usd={usd} inr={inr} /></BuyLink>
            <Link className="cr-btn ghost-dark" href="/login">Student sign in</Link>
          </div>
        </section>
      </main>

      <div className="cr-foot">
        <SiteFooter />
        <nav className="cr-guides" aria-label="Free guides"><Link href="/learn-bengali">How to learn Bengali</Link><Link href="/bengali-alphabet">Bengali alphabet</Link><Link href="/bengali-numbers">Bengali numbers 1 to 100</Link></nav>
        <p className="cr-made">Made and taught by Pritam, Kolkata, India. <span><span lang="bn">ধন্যবাদ</span> <i>dhonnobad</i> · thank you</span></p>
      </div>
      <PricingSeen />
      <StickyCta usd={usd} inr={inr} />
    </div>
  );
}
