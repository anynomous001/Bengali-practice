"use strict";
const app = document.getElementById("app");
const KEY = "bengali-practice-progress";

// progress: { [letter]: { right, wrong } }
let progress = {};
try { progress = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (e) {} };
const stat = ch => progress[ch] || (progress[ch] = { right: 0, wrong: 0 });
const mastered = ch => { const s = progress[ch]; return !!s && s.right >= 3 && s.right > s.wrong; };

const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const el = (tag, props = {}, ...kids) => {
  const n = Object.assign(document.createElement(tag), props);
  kids.flat().forEach(k => n.append(k));
  return n;
};

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "bn-BD";
  u.rate = 0.8;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// ---------- Learn ----------
function renderLearn() {
  app.replaceChildren();
  const detail = el("section", { className: "detail", hidden: true });
  app.append(detail);
  for (const g of GROUPS) {
    app.append(el("h2", {}, g.title));
    const grid = el("div", { className: "grid" });
    for (const l of LETTERS.filter(x => x.group === g.id)) {
      const b = el("button", { className: "tile" + (mastered(l.ch) ? " done" : ""), title: l.rom },
        el("span", { className: "ch" }, l.ch), el("span", { className: "rom" }, l.rom));
      b.onclick = () => showDetail(l, detail);
      grid.append(b);
    }
    app.append(grid);
  }
}

function showDetail(l, box) {
  box.hidden = false;
  box.replaceChildren(
    el("div", { className: "big" }, l.ch),
    el("div", {},
      el("p", { className: "sound" }, "Sounds like: ", el("b", {}, l.rom)),
      l.word ? el("p", {}, el("span", { className: "word" }, l.word), ` (${l.wrom}) – ${l.wmean}`) : "",
      el("button", { className: "btn", onclick: () => speak(l.ch) }, "🔊 Letter"),
      l.word ? el("button", { className: "btn", onclick: () => speak(l.word) }, "🔊 Word") : ""));
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ---------- Quiz ----------
let quiz = null;

function renderQuizMenu() {
  quiz = null;
  app.replaceChildren(
    el("h2", {}, "Choose a quiz"),
    el("div", { className: "menu" },
      menuBtn("Letter → word", "See a letter, pick the word it starts", "letter2word"),
      menuBtn("Word → letter", "See a word, pick its first letter", "word2letter"),
      menuBtn("Listen", "Hear a letter, pick the right one", "listen")),
    el("p", { className: "muted" }, "Scope:"),
    el("select", { id: "scope" },
      el("option", { value: "all" }, "All letters"),
      ...GROUPS.map(g => el("option", { value: g.id }, g.title)),
      el("option", { value: "weak" }, "My weak letters")));
}

function menuBtn(title, sub, mode) {
  return el("button", { className: "card", onclick: () => startQuiz(mode) },
    el("b", {}, title), el("span", {}, sub));
}

function startQuiz(mode) {
  const scope = document.getElementById("scope").value;
  let pool = LETTERS.filter(l => l.word);
  if (scope === "weak") pool = pool.filter(l => !mastered(l.ch));
  else if (scope !== "all") pool = pool.filter(l => l.group === scope);
  if (pool.length < 4) {
    pool = LETTERS.filter(l => l.word);
  }
  quiz = { mode, all: LETTERS.filter(l => l.word), queue: shuffle(pool).slice(0, 10), i: 0, score: 0 };
  renderQuestion();
}

function renderQuestion() {
  if (quiz.i >= quiz.queue.length) return renderResult();
  const q = quiz.queue[quiz.i];
  const others = shuffle(quiz.all.filter(l => l.ch !== q.ch && l.word !== q.word)).slice(0, 3);
  const options = shuffle([q, ...others]);
  const m = quiz.mode;

  const prompt = m === "letter2word" ? el("div", { className: "big" }, q.ch)
    : m === "word2letter" ? el("div", { className: "prompt" }, el("span", { className: "word" }, q.word), el("small", {}, `${q.wrom} – ${q.wmean}`))
    : el("button", { className: "btn big-btn", onclick: () => speak(q.ch) }, "🔊 Play sound");

  const label = o => m === "letter2word" ? `${o.word} (${o.wrom})` : o.ch;
  const box = el("div", { className: "options" + (m === "letter2word" ? "" : " letters") });
  const feedback = el("p", { className: "feedback" });
  const next = el("button", { className: "btn", hidden: true, onclick: () => { quiz.i++; renderQuestion(); } }, "Next →");

  options.forEach(o => {
    const b = el("button", { className: "opt" }, label(o));
    b.onclick = () => {
      const ok = o.ch === q.ch;
      const s = stat(q.ch);
      ok ? (s.right++, quiz.score++) : s.wrong++;
      save();
      box.querySelectorAll("button").forEach((x, idx) => {
        x.disabled = true;
        if (options[idx].ch === q.ch) x.classList.add("right");
      });
      if (!ok) b.classList.add("wrong");
      feedback.textContent = ok ? "Correct!" : `Not quite – it's ${q.ch} (${q.rom}).`;
      next.hidden = false;
    };
    box.append(b);
  });

  app.replaceChildren(
    el("p", { className: "muted" }, `Question ${quiz.i + 1} of ${quiz.queue.length} · Score ${quiz.score}`),
    prompt, box, feedback, next);
  if (m === "listen") speak(q.ch);
}

function renderResult() {
  const n = quiz.queue.length;
  app.replaceChildren(
    el("h2", {}, `You scored ${quiz.score} / ${n}`),
    el("button", { className: "btn", onclick: renderQuizMenu }, "Back to quizzes"));
}

// ---------- Progress ----------
function renderProgress() {
  const done = LETTERS.filter(l => mastered(l.ch)).length;
  const pct = Math.round(100 * done / LETTERS.length);
  app.replaceChildren(
    el("h2", {}, `${done} of ${LETTERS.length} letters mastered`),
    el("div", { className: "bar" }, el("div", { style: `width:${pct}%` })),
    el("p", { className: "muted" }, "A letter is mastered after 3+ correct answers with more right than wrong."),
    el("div", { className: "grid" }, LETTERS.map(l => {
      const s = progress[l.ch];
      return el("div", { className: "tile static" + (mastered(l.ch) ? " done" : "") },
        el("span", { className: "ch" }, l.ch),
        el("span", { className: "rom" }, s ? `✓${s.right} ✗${s.wrong}` : "–"));
    })),
    el("button", { className: "btn", onclick: () => {
      if (confirm("Reset all progress?")) { progress = {}; save(); renderProgress(); }
    } }, "Reset progress"));
}

// ---------- Nav ----------
const views = { learn: renderLearn, quiz: renderQuizMenu, progress: renderProgress };
document.querySelectorAll("#tabs button").forEach(b => b.onclick = () => {
  document.querySelectorAll("#tabs button").forEach(x => x.classList.toggle("active", x === b));
  views[b.dataset.view]();
});
renderLearn();
