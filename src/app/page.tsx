import Logo from "./Logo";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { headers } from "next/headers";
import { defaultCurrency, priceInr, priceUsd } from "@/lib/pricing";
import Taster from "./Taster";
import StickyCta from "./StickyCta";
import BuyLink from "./BuyLink";
import PricingSeen from "./PricingSeen";
import { BUSINESS } from "@/data/business";
import Icon from "./learn/Icon";
import { SiteFooter } from "./legal/LegalPage";

const FEATURES = [
  { seg: "reading", icon: "reading", title: "Reading", bn: "পড়া", body: "Start from the alphabet and vowel signs, then read short fables in three layers: Bengali only, line by line with meanings, and English." },
  { seg: "speaking", icon: "speaking", title: "Speaking", bn: "বলা", body: "Tap any letter, number or price to hear it, then test your ear. Say the word aloud before you check it." },
  { seg: "vocabulary", icon: "vocabulary", title: "Vocabulary", bn: "শব্দভান্ডার", body: "About 900 words in 30 topics, from family and food to Kolkata's streets, each with example phrases and practice." },
  { seg: "grammar", icon: "grammar", title: "Grammar", bn: "ব্যাকরণ", body: "Persons, verbs, tenses, karak and bibhakti with many examples, tense practice rounds, quick translation and a timed exam." },
] as const;

const AUDIENCE = [
  { title: "Heritage learners", body: "You grew up hearing Bengali at home and want to read it, speak it with your family, and finally understand the script." },
  { title: "Partners and in-laws", body: "Your partner, friends or relatives speak Bengali and you want to join the conversation, starting from zero." },
  { title: "Devotees and readers", body: "You want to read bhajans, mantras and the words of the sādhu-saṅga in the original, with a separate devotional track." },
];

const STEPS = [
  { n: "1", title: "Get access", body: "Pay once. No subscription, no password." },
  { n: "2", title: "Sign in with your email", body: "We send you a sign-in link straight away. It works on phone and laptop." },
  { n: "3", title: "Practise a little every day", body: "Ten minutes a day is enough. Streaks and goals keep you going; every lesson remembers where you stopped." },
];

const POINTS = [
  { title: "Romanized English, on or off", body: "Start with a pronunciation guide under every Bengali word, then switch it off to test yourself. It works on every lesson." },
  { title: "Hear it, then say it", body: "Tap any letter, word, number or price to hear it. Slow playback for the hard ones." },
  { title: "Flashcards that remember", body: "Cards you miss come back sooner; cards you know come back after 1, 3, 7, 14, then 30 days." },
  { title: "Built from real lessons", body: "The content follows how Bengali is taught in a classroom in Kolkata, including the worksheets, not a generic phrasebook." },
  { title: "Streaks, goals and a class board", body: "Choose a daily goal, keep a streak, and see how you compare with other students." },
  { title: "Timed exams and role plays", body: "Check what you really know with exams in grammar, vocabulary and listening, and practise real conversations." },
];

const FAQ = [
  { q: "Do I need to know any Bengali already?", a: "No. The Reading course starts with the alphabet and the vowel signs. If you already speak a little, you can go straight to any course." },
  { q: "How do I sign in?", a: "With your email address. We send a one-time link, valid for 15 minutes, so there is no password to remember." },
  { q: "Is it a subscription?", a: "No. You pay once for 12 months of access. It does not renew by itself, and if you renew early the 12 months are added on." },
  { q: "Can I pay from India?", a: "Yes. Students in India can pay in rupees by UPI or card. Everyone else pays in US dollars by card. Payments are handled by Razorpay." },
  { q: "Does it work on my phone?", a: "Yes. Every lesson, quiz and recording works on phones, tablets and laptops." },
  { q: "What about refunds?", a: `Not for you? Email ${BUSINESS.email} within ${BUSINESS.refundDays} days of paying for a full refund. If anything goes wrong with a payment, write to us and we will sort it out.` },
  { q: "Who is behind this?", a: `Bengali Practice is run from ${BUSINESS.address.split(",").slice(0, 2).join(",")} and built from one teacher's lessons. You can write to ${BUSINESS.email} with any question.` },
];

export default async function Home() {
  if (await getUser()) redirect("/learn");
  const usd = priceUsd();
  const [inr, h] = await Promise.all([priceInr(), headers()]);
  const india = defaultCurrency(h.get("x-vercel-ip-country")) === "INR";
  const price = india ? `₹${inr.amount.toLocaleString("en-IN")}` : `$${usd}`;
  const perMonth = india ? `₹${Math.round(inr.amount / 12 / 10) * 10}` : `$${(usd / 12).toFixed(2)}`;
  return (
    <div className="land">
      <header className="land-nav">
        <Link href="/" className="side-brand dark">
          <Logo />
          <span><b lang="bn">বাংলা</b><small>Practice</small></span>
        </Link>
        <nav>
          <a href="#try" className="navlink">Try it</a>
          <a href="#pricing" className="navlink">Pricing</a>
          <a href="#faq" className="navlink">FAQ</a>
          <Link href="/login" className="navbtn">Sign in</Link>
          <BuyLink place="nav" className="btn small">Get access</BuyLink>
        </nav>
      </header>

      <section className="land-hero">
        <div className="land-hero-copy">
          <p className="eyebrow">Bengali for English speakers</p>
          <h1>Read, speak and write Bengali, <em>one short lesson a day.</em></h1>
          <p className="lead">Courses built around one teacher&apos;s real lessons in Kolkata. Start from the alphabet, hear every word, and practise with quizzes, flashcards and exams that remember where you are.</p>
          <div className="cta">
            <BuyLink place="hero" className="btn">Start learning · {price} for 12 months</BuyLink>
            <a className="btn ghost" href="#try">Try a free mini-quiz</a>
          </div>
          <ul className="trust">
            <li>One payment, no subscription</li>
            <li>Sign in by email, no password</li>
            <li>Phone, tablet and laptop</li>
          </ul>
        </div>

        <div className="specimen" aria-hidden>
          <div className="spec-card spec-letter">
            <span className="glyph" lang="bn">ক</span>
            <span className="spec-roman">ko</span>
          </div>
          <div className="spec-card spec-line">
            <span className="spec-bn" lang="bn">আমি বাংলা শিখছি।</span>
            <span className="spec-ro">ami bangla shikhchhi.</span>
            <span className="spec-en">I am learning Bengali.</span>
          </div>
          <div className="spec-card spec-quiz">
            <span className="spec-q">Which letter is <b>kho</b>?</span>
            <span className="spec-opts"><i lang="bn">খ</i><i lang="bn" className="ok">ক</i><i lang="bn">গ</i></span>
          </div>
        </div>
      </section>

      <section className="land-section">
        <p className="eyebrow">Who it is for</p>
        <h2>Made for people who want Bengali in their lives.</h2>
        <div className="aud-grid">
          {AUDIENCE.map((a) => <article key={a.title} className="aud"><h3>{a.title}</h3><p>{a.body}</p></article>)}
        </div>
      </section>

      <section className="land-section try" id="try">
        <div>
          <p className="eyebrow">Try it now</p>
          <h2>Three questions. No sign-up.</h2>
          <p className="lead">This is what practice feels like: a question, an answer, and a clear explanation every time.</p>
        </div>
        <Taster />
      </section>

      <section className="land-section" id="learn">
        <p className="eyebrow">What you will practise</p>
        <h2>Four courses, taken in order.</h2>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <article key={f.title} className="feature" data-seg={f.seg}>
              <span className="seg-icon"><Icon name={f.icon} size={22} /></span>
              <h3>{f.title} <span lang="bn">{f.bn}</span></h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
        <p className="muted land-note">Plus a separate <b>devotional track</b> with mantras, bhajans and passages from the sādhu-saṅga, kept apart from the main course.</p>
      </section>

      <section className="land-section">
        <p className="eyebrow">How it works</p>
        <h2>Start in two minutes.</h2>
        <ol className="steps">
          {STEPS.map((s) => <li key={s.n}><span className="step-n">{s.n}</span><div><b>{s.title}</b><p>{s.body}</p></div></li>)}
        </ol>
      </section>

      <section className="land-section split">
        <div>
          <p className="eyebrow">Designed for learning</p>
          <h2>Practice that keeps you coming back.</h2>
        </div>
        <ul className="points">
          {POINTS.map((p) => (
            <li key={p.title}><b>{p.title}</b><span>{p.body}</span></li>
          ))}
        </ul>
      </section>

      <section className="land-section" id="pricing">
        <div className="offer">
          <div>
            <p className="eyebrow">Simple pricing</p>
            <h2>12 months of access, one price.</h2>
            <p className="lead">New activities are added during your year. Renew early and 12 months are added on. Know someone who would like it? Every student gets a link that adds 3 months to their plan for each friend who joins.</p>
          </div>
          <div className="offer-card">
            <div className="price">{price} <small>one-time · about {perMonth} a month</small></div>
            <ul className="ticks">
              <li>All four courses and the devotional track</li>
              <li>Flashcards, streaks and progress saved</li>
              <li>{india ? "Pay by UPI or card, in rupees" : "Pay by card in US dollars; students in India pay in rupees by UPI"}</li>
              <li>No subscription, nothing renews by itself</li>
            </ul>
            <BuyLink place="pricing" className="btn">Get 12 months · {price}</BuyLink>
            <p className="promise">Not for you? Email us within {BUSINESS.refundDays} days for a full refund.</p>
            <p className="fine">Secure checkout by Razorpay · Visa · Mastercard · Amex · <Link href="/refunds">Refund policy</Link></p>
          </div>
        </div>
      </section>

      <section className="land-section" id="faq">
        <p className="eyebrow">Questions</p>
        <h2>Good to know before you start.</h2>
        <div className="faq">
          {FAQ.map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}{f.q.startsWith("What about refunds") && <> <Link href="/refunds">Read the refund policy</Link>.</>}</p></details>
          ))}
        </div>
      </section>

      <section className="land-section final">
        <h2>Ready to read your first Bengali sentence?</h2>
        <p className="lead">Start today with the alphabet. Ten minutes a day is enough.</p>
        <div className="cta">
          <BuyLink place="final" className="btn">Start learning · {price}</BuyLink>
          <Link className="btn ghost" href="/login">Student sign in</Link>
        </div>
      </section>

      <SiteFooter />
      <PricingSeen />
      <StickyCta label={`Start learning · ${price}`} />
    </div>
  );
}
