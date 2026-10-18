import type { Metadata } from "next";
import Image from "next/image";
import Logo from "./Logo";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getUser } from "@/lib/auth";
import { defaultCurrency, priceInr, priceUsd } from "@/lib/pricing";
import Icon from "./learn/Icon";
import { SiteFooter } from "./legal/LegalPage";
import Taster from "./Taster";
import StickyCta from "./StickyCta";
import BuyLink from "./BuyLink";
import PricingSeen from "./PricingSeen";
import LandingMotion from "./LandingMotion";
import AssembleSentence from "./AssembleSentence";
import VowelStrip from "./VowelStrip";
import { BUSINESS } from "@/data/business";
import { QUOTES, TEACHER, type Quote } from "@/data/landing";
import { VOCAB } from "@/data/vocabulary";
import { GRAMMAR } from "@/data/grammar";
import { SCENARIOS } from "@/data/roleplay";
import { CLASSWORK } from "@/data/classwork";
import { EXAMS } from "@/data/exams";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const VOCAB_WORDS = VOCAB.reduce((n, t) => n + t.sections.reduce((m, s) => m + s.words.length, 0), 0);
const VOCAB_ROUND = Math.round(VOCAB_WORDS / 100) * 100;
const EXAM_MINUTES = EXAMS.map((e) => e.minutes);

const COURSES = [
  { seg: "reading", icon: "reading", bn: "পড়া", title: "Reading", outcome: "Read a short Bengali story on your own.", body: "Start from the alphabet and vowel signs, then read short fables in three layers: Bengali only, line by line with meanings, and English." },
  { seg: "speaking", icon: "speaking", bn: "বলা", title: "Speaking", outcome: "Handle the market, the doctor and a phone call in Bengali.", body: "Hear every letter, number and word, then practice real conversations in role plays, speak on a topic with a timer, and build stories with a partner in story relay." },
  { seg: "vocabulary", icon: "vocabulary", bn: "শব্দ", title: "Vocabulary", outcome: `About ${VOCAB_ROUND} everyday words in ${VOCAB.length} topics.`, body: "From family and food to Kolkata's streets, each topic with example phrases, flashcards and a practice round." },
  { seg: "grammar", icon: "grammar", bn: "ব্যাকরণ", title: "Grammar", outcome: "Build correct sentences in every tense.", body: "Persons, verbs, tenses, karak and bibhakti with many examples, tense practice rounds, quick translation and a timed exam." },
] as const;

const AUDIENCE: { kind: Quote["kind"]; lead: string; body: string }[] = [
  { kind: "heritage", lead: "You grew up hearing Bengali at home.", body: "You want to read it, speak it with your family, and finally understand the script. Most of my heritage learners start with the alphabet and are reading short stories within a few weeks." },
  { kind: "partner", lead: "Your partner, friends or relatives speak Bengali.", body: "You want to join the conversation, starting from zero. We begin with the sounds and the greetings, then the words you will actually need at the table." },
  { kind: "devotee", lead: "You want to read bhajans, mantras and the words of the sādhu-saṅga in the original.", body: "There is a separate devotional track for this, kept apart from the main course." },
];

const POINTS = [
  { title: "Romanized English, on or off", body: "Start with a pronunciation guide under every Bengali word, then switch it off to test yourself." },
  { title: "Hear it, then say it", body: "Tap any letter, word, number or price to hear it, with slow playback for the hard ones." },
  { title: "Flashcards that remember", body: "Cards you miss come back sooner; cards you know come back after 1, 3, 7, 14, then 30 days." },
  { title: "Streaks and goals", body: "Choose a daily goal, keep a streak, and see how you compare with other students." },
  { title: "Built from my lessons", body: "Everything comes from my online lessons and the worksheets I use with my students, not a generic phrasebook." },
];

const FAQ = [
  { q: "Do I need to know any Bengali already?", a: "No. The Reading course starts with the alphabet and the vowel signs. If you already speak a little, you can go straight to any course." },
  { q: "Is this live tutoring?", a: "No. It is self-paced practice you can use any time, on your own. Live lessons with me are separate and optional." },
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

export default async function Home() {
  if (await getUser()) redirect("/learn");
  const usd = priceUsd();
  const [inr, h] = await Promise.all([priceInr(), headers()]);
  const india = defaultCurrency(h.get("x-vercel-ip-country")) === "INR";
  const price = india ? `₹${inr.amount.toLocaleString("en-IN")}` : `$${usd}`;
  const perMonth = india ? `₹${Math.round(inr.amount / 12 / 10) * 10}` : `$${(usd / 12).toFixed(2)}`;
  const quoteFor = (kind: Quote["kind"]) => QUOTES.find((q) => q.kind === kind);
  const proofQuotes = QUOTES.slice(0, 3);
  const hasProof = proofQuotes.length > 0 || TEACHER.stats.length > 0;
  const hasAbout = TEACHER.story.length > 0;

  const shots = [
    { id: "home", title: "Your home page", text: "Your streak, today's goal and exactly where you left off.", alt: "The learner home page showing a streak and the next lesson" },
    { id: "flashcard", title: "Flashcards that remember", text: "Cards you miss come back sooner, so the words you know stay known.", alt: "A vocabulary flashcard" },
    { id: "roleplay", title: `${SCENARIOS.length} role plays`, text: "Practice the market, the doctor and the phone, with the words you need and what goes wrong when you get them wrong.", alt: "A role play lesson" },
    { id: "grammar", title: `${GRAMMAR.length} grammar topics`, text: "Persons, verbs, tenses, karak and more, each with exercises that explain every answer.", alt: "A grammar exercise" },
    { id: "exam", title: "Timed exams", text: `${EXAMS.length} exams, ${Math.min(...EXAM_MINUTES)} to ${Math.max(...EXAM_MINUTES)} minutes each: grammar, vocabulary, and alphabet and numbers. A score and what to fix.`, alt: "A timed exam in progress" },
  ];
  const alsoIn = [
    { title: "Quick translation", text: "Translate short sentences both ways and see the right answer." },
    { title: "Impromptu speaking", text: "Get a topic, prepare for a moment, then speak out loud against the clock." },
    { title: "Story relay", text: "Build a story with a partner, one line each, using words you have just learned." },
    { title: `${CLASSWORK.length} class worksheet sets`, text: "Worksheets from my own classes. Write your answer, then check it." },
  ];

  return (
    <div className="lp">
      <LandingMotion />

      <div className="lp-wrap">
        <header className="land-nav">
          <Link href="/" className="side-brand dark">
            <Logo />
            <span><b lang="bn">বাংলা</b><small>Practice</small></span>
          </Link>
          <nav>
            <a href="#learn" className="navlink">Courses</a>
            <a href="#try" className="navlink">Try it</a>
            <a href="#about" className="navlink">About</a>
            <a href="#pricing" className="navlink">Pricing</a>
            <a href="#faq" className="navlink">FAQ</a>
            <Link href="/login" className="navbtn">Sign in</Link>
            <BuyLink place="nav" className="btn small">Get access</BuyLink>
          </nav>
        </header>
      </div>

      <main>
      <section className="band hero-band">
        <div className="lp-wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Practice built by an online Bengali teacher</p>
            <h1>Read, speak and write Bengali, <em>one short lesson a day.</em></h1>
            <p className="lead">I&apos;m Pritam. I teach Bengali online, one to one. This is where my students practice between our lessons, and now you can too.</p>
            <div className="cta">
              <BuyLink place="hero" className="btn">Start learning · {price} for 12 months</BuyLink>
              <a className="btn ghost" href="#try">Try a letter</a>
            </div>
            <p className="trust-line">Pay once for a year. No password, just an email link.</p>
          </div>
          <Taster />
        </div>
      </section>

      {hasAbout && (
        <section className="lp-wrap about" id="about">
          <div className={"about-grid" + (TEACHER.photo ? " has-photo" : "")}>
            {TEACHER.photo && <Image src={TEACHER.photo} alt={`${TEACHER.name}, your Bengali teacher`} width={480} height={560} className="about-photo" />}
            <div>
              <h2>Why I built this</h2>
              {TEACHER.story.map((p) => <p key={p} className="about-p">{p}</p>)}
              <p className="about-sign">{TEACHER.name}</p>
              {TEACHER.stats.length > 0 && (
                <dl className="stat-row small">{TEACHER.stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}</dl>
              )}
              {TEACHER.worksheet && <Image src={TEACHER.worksheet} alt="A class worksheet" width={640} height={420} className="about-worksheet" />}
              {TEACHER.videoSrc && (
                <video className="about-video" controls playsInline preload="none" poster={TEACHER.videoPoster}>
                  <source src={TEACHER.videoSrc} />
                  {TEACHER.captionsSrc && <track kind="captions" src={TEACHER.captionsSrc} srcLang="en" label="English" default />}
                </video>
              )}
              {TEACHER.liveLessonsUrl && <p><a className="quiet-link" href={TEACHER.liveLessonsUrl}>Want live lessons too? I teach one to one online.</a></p>}
            </div>
          </div>
        </section>
      )}

      {hasProof && (
        <section className="lp-wrap proof">
          {proofQuotes.length > 0 && (
            <div className="quote-row">
              {proofQuotes.map((q) => (
                <figure key={q.name + q.text} className="quote">
                  <blockquote>“{q.text}”</blockquote>
                  <figcaption>
                    {q.photo && <Image src={q.photo} alt="" width={40} height={40} className="quote-photo" />}
                    <span><b>{q.name}</b>, {q.city}<small>{{ heritage: "Heritage learner", partner: "Learning for a partner", devotee: "Devotional reader", general: "Learner" }[q.kind]}</small></span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          {TEACHER.stats.length > 0 && (
            <dl className="stat-row">
              {TEACHER.stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}
            </dl>
          )}
        </section>
      )}

      <div className="lp-wrap">
        <section className="land-section audience">
          <h2>Who comes to me</h2>
          <div className="audience-list">
            {AUDIENCE.map((a) => {
              const q = quoteFor(a.kind);
              return (
                <div key={a.kind}>
                  <p><b>{a.lead}</b> {a.body}</p>
                  {q && <blockquote className="aud-quote">“{q.text}”<cite>{q.name}, {q.city}</cite></blockquote>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="land-section" id="practice">
          <h2 className="h-xl">What you&apos;ll do here</h2>
          <div className="shows">
            {shots.map((sh) => (
              <article key={sh.id} className="show">
                <figure className="shot">
                  <Image className="shot-d" src={`/landing/shots/${sh.id}-1440.webp`} width={1440} height={900} sizes="(max-width: 900px) 100vw, 720px" alt={sh.alt} />
                  <Image className="shot-m" src={`/landing/shots/${sh.id}-390.webp`} width={780} height={1688} sizes="320px" alt={sh.alt} />
                </figure>
                <div className="show-text"><h3>{sh.title}</h3><p>{sh.text}</p></div>
              </article>
            ))}
          </div>
          <h3 className="also-h">Also in the box</h3>
          <dl className="also">
            {alsoIn.map((a) => <div key={a.title}><dt>{a.title}</dt><dd>{a.text}</dd></div>)}
          </dl>
          <ul className="points">
            {POINTS.map((p) => <li key={p.title}><b>{p.title}</b><span>{p.body}</span></li>)}
          </ul>
        </section>

        <section className="land-section" id="learn">
          <h2>Four courses, in the order I teach them.</h2>
          <div className="feature-grid">
            {COURSES.map((f) => (
              <article key={f.title} className="feature" data-seg={f.seg}>
                <span className="course-bn" lang="bn">{f.bn}</span>
                <h3><span className="seg-icon"><Icon name={f.icon} size={20} /></span>{f.title}</h3>
                <p className="outcome">{f.outcome}</p>
                <p>{f.body}</p>
                {f.seg === "reading" && <VowelStrip />}
              </article>
            ))}
          </div>
          <p className="muted land-note">Plus a separate <b>devotional track</b> with mantras, bhajans and passages from the sādhu-saṅga, kept apart from the main course.</p>
        </section>

        <section className="land-section" id="pricing">
          <div className="offer">
            <div>
              <h2>One price. Twelve months. Nothing renews.</h2>
              <p className="lead">New activities are added during your year. Renew early and 12 months are added on. Know someone who would like it? Every student gets a link that adds 3 months to their plan for each friend who joins.</p>
              <p className="lead compare">Most language apps charge $9 to $20 every month and renew automatically.</p>
            </div>
            <div className="offer-card">
              <div className="price">{price} <small>one-time · about {perMonth} a month</small></div>
              <ul className="ticks">
                <li>All four courses and the devotional track</li>
                <li>Flashcards, streaks and progress saved</li>
                <li>You get a sign-in link by email; no password</li>
                <li>{india ? "Pay by UPI or card, in rupees" : "Pay by card in US dollars; students in India pay in rupees by UPI"}</li>
                <li>No subscription, nothing renews by itself</li>
              </ul>
              <BuyLink place="pricing" className="btn">Get 12 months · {price}</BuyLink>
              <p className="promise">Not for you? Email us within {BUSINESS.refundDays} days for a full refund.</p>
              <p className="fine">Secure checkout by Razorpay · <Link href="/refunds">Refund policy</Link></p>
              <p className="cards"><span>Visa</span><span>Mastercard</span><span>Amex</span></p>
            </div>
          </div>
        </section>

        <section className="land-section faq-section" id="faq">
          <h2 className="h-sm">Good to know before you start.</h2>
          <div className="faq">
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
      </div>

      <section className="band final-band">
        <div className="lp-wrap final">
          <AssembleSentence text="আমি বাংলা শিখছি।" roman="ami bangla shikhchhi" english="I am learning Bengali." />
          <h2>Ready to read your first Bengali sentence?</h2>
          <p className="lead">Start today with the alphabet. Ten minutes a day is enough.</p>
          <div className="cta">
            <BuyLink place="final" className="btn">Start learning · {price}</BuyLink>
            <Link className="btn ghost" href="/login">Student sign in</Link>
          </div>
        </div>
      </section>
      </main>

      <div className="lp-wrap"><SiteFooter /></div>
      <PricingSeen />
      <StickyCta label={`Start learning · ${price}`} />
    </div>
  );
}
