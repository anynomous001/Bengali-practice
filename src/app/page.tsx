import Logo from "./Logo";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { priceUsd } from "@/lib/razorpay";
import Icon from "./learn/Icon";
import { SiteFooter } from "./legal/LegalPage";

const FEATURES = [
  { seg: "reading", icon: "reading", title: "Reading", bn: "পড়া", body: "Start from the alphabet and vowel signs, then read short fables in three layers: Bengali only, line by line with meanings, and English." },
  { seg: "speaking", icon: "speaking", title: "Speaking", bn: "বলা", body: "Tap any letter, number or price to hear it, then test your ear. Say the word aloud before you check it." },
  { seg: "vocabulary", icon: "vocabulary", title: "Vocabulary", bn: "শব্দভান্ডার", body: "About 900 words in 30 topics, from family and food to Kolkata's streets, each with example phrases and practice." },
  { seg: "grammar", icon: "grammar", title: "Grammar", bn: "ব্যাকরণ", body: "Persons, verbs, tenses, karak and bibhakti with many examples, tense practice rounds, quick translation and a timed exam." },
] as const;

const POINTS = [
  { title: "Romanized English, on or off", body: "Learn with a pronunciation guide at first, then switch it off to test yourself. It works on every lesson." },
  { title: "Flashcards that remember", body: "Cards you miss come back sooner; cards you know come back after 1, 3, 7, 14, then 30 days." },
  { title: "Built from real lessons", body: "The content follows how Bengali is taught in class, including the worksheets, not a generic phrasebook." },
];

export default async function Home() {
  if (await getUser()) redirect("/learn");
  const price = priceUsd();
  return (
    <div className="land">
      <header className="land-nav">
        <Link href="/" className="side-brand dark">
          <Logo />
          <span><b>Shikhi</b><small lang="bn">শিখি</small></span>
        </Link>
        <nav>
          <Link href="/login" className="navbtn">Sign in</Link>
          <Link href="/buy" className="btn small">Get access</Link>
        </nav>
      </header>

      <section className="land-hero">
        <div className="land-hero-copy">
          <p className="eyebrow">Bengali for English speakers</p>
          <h1>Learn Bengali one lesson at a time.</h1>
          <p className="lead">Reading, speaking, vocabulary and grammar courses built around one teacher&apos;s lessons in Kolkata. Every lesson is tracked, so you always know where to pick up.</p>
          <div className="cta">
            <Link className="btn" href="/buy">Get 12 months · ${price}</Link>
            <Link className="btn ghost" href="/login">Student sign in</Link>
          </div>
          <p className="fine">One payment, no subscription. Access by email, no password.</p>
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
      </section>

      <section className="land-section split">
        <div>
          <p className="eyebrow">Designed for learning</p>
          <h2>Practice that adapts to you.</h2>
        </div>
        <ul className="points">
          {POINTS.map((p) => (
            <li key={p.title}><b>{p.title}</b><span>{p.body}</span></li>
          ))}
        </ul>
      </section>

      <section className="land-section">
        <div className="offer">
          <div>
            <p className="eyebrow">Simple pricing</p>
            <h2>12 months of access.</h2>
            <p className="lead">New activities are added during your year. Renew early and 12 months are added on.</p>
          </div>
          <div className="offer-card">
            <div className="price">${price} <small>one-time</small></div>
            <ul className="ticks">
              <li>All four courses</li>
              <li>Flashcards and progress saved</li>
              <li>Pay in US dollars by card, or in rupees by UPI, via Razorpay</li>
            </ul>
            <Link className="btn" href="/buy">Get access</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
