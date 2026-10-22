import type { Metadata } from "next";
import Image from "next/image";
import Logo from "./Logo";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getUser } from "@/lib/auth";
import { defaultCurrency, priceInr, priceUsd } from "@/lib/pricing";
import { IconTile } from "./learn/Icon";
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
  { seg: "reading", icon: "reading", bn: "পড়া", ro: "pora", title: "Reading", outcome: "Read any Bengali word aloud.", body: "The alphabet and vowel signs, then short fables read in three layers: Bengali, romanized, English." },
  { seg: "speaking", icon: "speaking", bn: "বলা", ro: "bola", title: "Speaking", outcome: "Hold a simple conversation.", body: `Hear it, then say it: everyday phrases, ${SCENARIOS.length} role plays and impromptu speaking against a timer.` },
  { seg: "vocabulary", icon: "vocabulary", bn: "শব্দ", ro: "shobdo", title: "Vocabulary", outcome: `Know about ${VOCAB_ROUND} everyday words.`, body: `${VOCAB.length} topics, each with audio and spaced-repetition flashcards.` },
  { seg: "grammar", icon: "grammar", bn: "ব্যাকরণ", ro: "bakoron", title: "Grammar", outcome: "Build sentences of your own.", body: `${GRAMMAR.length} topics, each explained in plain English and practiced until it sticks.` },
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
  { q: "Is this live tutoring?", a: "No. It is self-paced practice you can use any time, on your own. Live lessons with me are separate and optional." },
  { q: "How much time does it take?", a: "Lessons are short. Ten minutes a day is enough to make steady progress." },
  { q: "Can I turn the romanized English off?", a: "Yes, at any time. Most students keep it on for the first weeks and switch it off once they can read." },
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
    { id: "home", bn: "আজ", ro: "aj", gloss: "today", title: "A home page that knows where you left off", text: "Your streak, today's goal and the next lesson, in one place.", notes: ["Your streak", "Today's goal", "The next lesson, one tap away"], alt: "The learner home page showing a streak and the next lesson" },
    { id: "flashcard", seg: "vocabulary", bn: "শব্দ", ro: "shobdo", gloss: "word", title: `Flashcards for about ${VOCAB_ROUND} words`, text: `${VOCAB.length} topics. Each word comes back just before you would forget it.`, alt: "A vocabulary flashcard" },
    { id: "roleplay", seg: "speaking", bn: "বাজারে", ro: "bajare", gloss: "at the market", title: `${SCENARIOS.length} role plays`, text: "The market, the doctor, a hotel, the train, and talking with your family. Say your part out loud.", alt: "A role play lesson" },
    { id: "grammar", seg: "grammar", bn: "ব্যাকরণ", ro: "bakoron", gloss: "grammar", title: `${GRAMMAR.length} grammar topics`, text: "Each topic explained in plain English, then practiced until it comes without thinking.", alt: "A grammar exercise" },
    { id: "exam", bn: "পরীক্ষা", ro: "porikkha", gloss: "exam", title: "Timed exams", text: `Test yourself against the clock, the way a class would. ${EXAMS.length} exams, ${Math.min(...EXAM_MINUTES)} to ${Math.max(...EXAM_MINUTES)} minutes each: grammar, vocabulary, and alphabet and numbers.`, alt: "A timed exam in progress" },
  ];
  const alsoIn = [
    { title: "Quick translation", bn: "অনুবাদ", ro: "onubad", text: "Short English sentences to turn into Bengali, fast." },
    { title: "Impromptu speaking", bn: "বলো তো", ro: "bolo to", gloss: "go on, say it", text: "A prompt and a timer. Keep talking until it runs out." },
    { title: "Story relay", bn: "গল্প", ro: "golpo", gloss: "story", text: "A story built one sentence at a time." },
    { title: `${CLASSWORK.length} class worksheet sets`, bn: "খাতা", ro: "khata", gloss: "notebook", text: "The same worksheet sets I use in class." },
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
        <div className="lp-wrap hero-top">
          <div className="hero-copy">
            <p className="eyebrow">Practice built by an online Bengali teacher</p>
            <h1>Read, speak and write Bengali, <em>one short lesson a day.</em></h1>
          </div>
          <figure className="lpx-first">
            <span className="lpx-glyph" lang="bn">অ</span>
            <figcaption>
              <i>o</i>
              <b>The first letter</b>
              <span>Every Bengali child starts here: <span lang="bn">অ-তে অজগর</span>, o-te ojogor, &ldquo;o is for python.&rdquo;</span>
            </figcaption>
          </figure>
        </div>
        <div className="lp-wrap hero-grid">
          <div className="hero-copy">
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
          <div className="lpx-about">
            <div className="lpx-about-head">
              <h2>Between our lessons, my students had <em>nowhere to practice.</em></h2>
              <p className="lpx-word"><span lang="bn">অভ্যাস</span><span><i>obbhash</i><small>practice; the daily habit of it</small></span></p>
              {TEACHER.photo && <Image src={TEACHER.photo} alt={`${TEACHER.name}, your Bengali teacher`} width={480} height={560} className="about-photo" />}
            </div>
            <div className="lpx-about-body">
              {TEACHER.story.map((p) => <p key={p} className="about-p">{p}</p>)}
              <p className="about-sign">{TEACHER.name} <span className="lpx-sign-bn" lang="bn">{TEACHER.nameBn}</span> <small>· {TEACHER.place}</small></p>
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
        <section className="land-section lpx-aud">
          <h2>Three kinds of student, one way of learning.</h2>
          <div className="lpx-aud-list">
            {AUDIENCE.map((a) => {
              const q = quoteFor(a.kind);
              return (
                <article key={a.kind} className="lpx-aud-row">
                  <p className="lpx-word v"><span lang="bn">{a.bn}</span><span><i>{a.ro}</i><small>· {a.gloss}</small></span></p>
                  <div><p className="lpx-kicker">{a.tag}</p><p className="lpx-serif">{a.lead}</p></div>
                  <div>
                    <p className="lpx-aud-body">{a.body}</p>
                    {q && <blockquote className="aud-quote">“{q.text}”<cite>{q.name}, {q.city}</cite></blockquote>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="land-section" id="practice">
          <h2 className="h-xl">The app, exactly as my students use it.</h2>
          <p className="lpx-sub">Real screens, nothing mocked up.</p>
          <div className="shows">
            {shots.map((sh) => (
              <article key={sh.id} className="show">
                <figure className="shot">
                  <Image className="shot-d" src={`/landing/shots/${sh.id}-1440.webp`} width={1440} height={900} sizes="(max-width: 900px) 100vw, 720px" alt={sh.alt} />
                  <Image className="shot-m" src={`/landing/shots/${sh.id}-390.webp`} width={780} height={1688} sizes="320px" alt={sh.alt} />
                </figure>
                <div className="show-text" data-seg={"seg" in sh ? sh.seg : undefined}>
                  <p className="lpx-tag"><span lang="bn">{sh.bn}</span> <i>{sh.ro}</i> · {sh.gloss}</p>
                  <h3>{sh.title}</h3>
                  <p>{sh.text}</p>
                  {"notes" in sh && sh.notes && <ol className="lpx-notes">{sh.notes.map((n) => <li key={n}>{n}</li>)}</ol>}
                </div>
              </article>
            ))}
          </div>
          <h3 className="also-h">Also in the box</h3>
          <dl className="also">
            {alsoIn.map((a) => <div key={a.title}><dt>{a.title} <span className="lpx-tag-inline"><span lang="bn">{a.bn}</span> <i>{a.ro}</i>{"gloss" in a && a.gloss ? ` · ${a.gloss}` : ""}</span></dt><dd>{a.text}</dd></div>)}
          </dl>
          <ul className="points">
            {POINTS.map((p) => (
              <li key={p.title}>
                <span className="lpx-pn" lang="bn">{p.n}</span>
                <b>{p.title}</b>
                <span className="lpx-pb">{p.body}</span>
                <span className="lpx-ptag"><span lang="bn">{p.bn}</span> <i>{p.ro}</i> · {p.gloss}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="land-section" id="learn">
          <h2>Four courses, in the order I teach them.</h2>
          <p className="lpx-sub">Each one builds on the last. Reading comes first, because everything else is easier once the letters are yours.</p>
          <div className="feature-grid">
            {COURSES.map((f, i) => (
              <article key={f.title} className="feature" data-seg={f.seg}>
                <span className="lpx-course-n">Course {["one", "two", "three", "four"][i]}</span>
                <span className="course-bn" lang="bn">{f.bn}</span>
                <span className="lpx-course-ro"><i>{f.ro}</i></span>
                <h3><IconTile name={f.icon} size={34} />{f.title}</h3>
                <p className="outcome">{f.outcome}</p>
                <p>{f.body}</p>
                {f.seg === "reading" && <VowelStrip />}
              </article>
            ))}
          </div>
          <p className="muted land-note"><span lang="bn" className="lpx-dev-bn">ভক্তি</span> <i>bhokti</i> · devotion. Alongside the four courses, a separate <b>devotional track</b>: mantras, bhajans and sādhu-saṅga passages, set for reading in the original once you know the letters.</p>
        </section>

        <section className="land-section" id="pricing">
          <div className="offer">
            <div>
              <h2>One price. Twelve months. Nothing renews.</h2>
              <p className="lead">Most language apps charge $9 to $20 a month and renew automatically. Here you pay once. When the year is over, nothing happens unless you choose to come back.</p>
              <p className="lead compare">New activities are added during your year, and if you renew early the 12 months are added on. Know someone who would like it? Every student gets a link that adds 3 months to their plan for each friend who joins.</p>
              <p className="lpx-word on-night"><span lang="bn">এক বছর</span><span><i>ek bochhor</i><small>one year</small></span></p>
            </div>
            <div className="offer-card">
              <div className="price">{price} <small>one-time · about {perMonth} a month</small></div>
              <ul className="ticks">
                <li>All four courses: Reading, Speaking, Vocabulary, Grammar</li>
                <li>The devotional track</li>
                <li>Audio for every letter, number and vocabulary word</li>
                <li>Flashcards, role plays, worksheets and timed exams</li>
                <li>Streaks, goals and the class leaderboard, with your progress saved</li>
                <li>You get a sign-in link by email; no password</li>
                <li>{india ? "Pay by UPI or card, in rupees" : "Pay by card in US dollars; students in India pay in rupees by UPI"}</li>
                <li>No subscription, nothing renews by itself</li>
              </ul>
              <BuyLink place="pricing" className="btn">Get 12 months · {price}</BuyLink>
              <p className="promise"><b>{BUSINESS.refundDays}-day full refund.</b> If it isn&apos;t right for you, write to me within {BUSINESS.refundDays} days and I&apos;ll refund every rupee or cent.</p>
              <p className="fine">Secure checkout by Razorpay · <Link href="/refunds">Refund policy</Link></p>
              <p className="cards"><span>Visa</span><span>Mastercard</span><span>Amex</span></p>
            </div>
          </div>
        </section>

        <section className="land-section faq-section" id="faq">
          <div className="lpx-faq-side">
            <h2 className="h-sm">What people ask me first.</h2>
            <p className="lpx-word"><span lang="bn">প্রশ্ন</span><span><i>proshno</i><small>question</small></span></p>
            <p className="lpx-ask">Something not covered here? <a href={`mailto:${BUSINESS.email}`}>Write to me</a> and I&apos;ll answer myself.</p>
          </div>
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

      <div className="lp-wrap">
        <SiteFooter />
        <p className="lpx-made">Made and taught by Pritam, Kolkata, India. <span className="lpx-thanks"><span lang="bn">ধন্যবাদ</span> <i>dhonnobad</i> · thank you</span></p>
      </div>
      <PricingSeen />
      <StickyCta label={`Start learning · ${price}`} />
    </div>
  );
}
