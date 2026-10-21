"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import { randomUUID } from "node:crypto";
import { ALL_CARD_IDS } from "@/data/decks";
import { SIGNS } from "@/data/signs";
import { LETTERS } from "@/data/letters";
import { SENTENCES } from "@/data/sentences";
import { GRAMMAR } from "@/data/grammar";
import { READING_LESSONS } from "@/data/reading-lessons";
import { WORKOUT } from "@/data/tense-workout";
import { STORIES } from "@/data/stories";
import { isLessonId } from "@/data/curriculum";
import { TOPICS, type TopicKind } from "@/data/impromptu";
import { DEV_TOPICS } from "@/data/devotional";
import { recordActivity } from "@/lib/activity";
import { getDevStory } from "@/data/devotional-stories";
import { VOCAB, VOCAB_QUIZ_LEN } from "@/data/vocabulary";
import { getExam } from "@/data/exams";
import { generateExam, toPublic, type ExamQ, type PublicExamQ } from "@/lib/examgen";
import { makeRound, TRANSLATE_LEN, type Direction, type Source, type TQuestion } from "@/lib/translation";
import {
  canSignIn,
  consumeLoginToken,
  createLoginToken,
  endSession,
  getUser,
  normalizeEmail,
  startSession,
  validEmail,
} from "@/lib/auth";
import { query } from "@/lib/db";
import { appBase } from "@/lib/base-url";
import { sendLoginEmail } from "@/lib/email";

export type FormState = { message: string; ok?: boolean } | undefined;

export async function requestLogin(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  if (!validEmail(email)) return { message: "Please enter a valid email address." };
  // Same reply whether or not the email is enrolled, so the list can't be probed.
  try {
    if (await canSignIn(email)) {
      const token = await createLoginToken(email);
      if (token) {
        const base = await appBase();
        // After the response, so enrolled and unknown emails take about the same time to answer.
        after(() => sendLoginEmail(email, `${base}/login/verify?token=${encodeURIComponent(token)}`).catch((e) => console.error("login email failed", e)));
      }
    }
  } catch (e) {
    console.error("requestLogin failed", e);
    return { message: "Something went wrong sending the email. Please try again shortly." };
  }
  return { ok: true, message: "If this email is enrolled, a sign-in link is on its way. Check your inbox." };
}

export async function verifyLogin(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const email = token ? await consumeLoginToken(token) : null;
  if (!email) redirect("/login?error=expired");
  await startSession(email);
  redirect("/learn");
}

export async function logout() {
  await endSession();
  redirect("/");
}

export async function recordAnswer(letter: string, correct: boolean) {
  const user = await getUser();
  if (!user?.hasAccess || !LETTERS.some((l) => l.ch === letter)) return;
  await query(
    `INSERT INTO progress (email, letter, right_count, wrong_count) VALUES ($1, $2, $3, $4)
     ON CONFLICT (email, letter) DO UPDATE SET
       right_count = progress.right_count + $3, wrong_count = progress.wrong_count + $4`,
    [user.email, letter, correct ? 1 : 0, correct ? 0 : 1],
  );
  if (correct) await recordActivity(user.email, "drill", letter);
}

const FEEDBACK_TOPICS = ["Sound is wrong", "Tip is unclear", "Example word is wrong", "Place of sound is wrong", "Other"];

/** A student's note on one letter. Rows are read by the teacher on the admin page. */
export async function sendLetterFeedback(letter: string, topic: string, message: string): Promise<{ ok: boolean }> {
  const user = await getUser();
  if (!user?.hasAccess || !LETTERS.some((l) => l.ch === letter) || !FEEDBACK_TOPICS.includes(topic)) return { ok: false };
  const recent = await query<{ n: string }>("SELECT COUNT(*) AS n FROM feedback WHERE email = $1 AND created_at > now() - interval '1 hour'", [user.email]);
  if (Number(recent[0]?.n ?? 0) >= 20) return { ok: false };
  await query("INSERT INTO feedback (email, area, ref, topic, message) VALUES ($1, 'alphabet', $2, $3, $4)", [user.email, letter, topic, message.trim().slice(0, 500)]);
  return { ok: true };
}

// Leitner boxes: days until a card is due again, by box.
const INTERVAL_DAYS = [0, 1, 3, 7, 14, 30];

export async function rateCard(cardId: string, rating: "again" | "good" | "easy") {
  const user = await getUser();
  if (!user?.hasAccess || !ALL_CARD_IDS.has(cardId)) return;
  if (rating !== "again" && rating !== "good" && rating !== "easy") return;
  const jump = rating === "again" ? 0 : rating === "good" ? 1 : 2;
  const max = INTERVAL_DAYS.length - 1;
  // "again" sends the card back to box 0; otherwise move up by 1 or 2 boxes.
  await query(
    `INSERT INTO flashcards (email, card_id, box, due_at, reviews)
     VALUES ($1, $2, LEAST($3::int, $4), now() + ($5::int[])[LEAST($3::int, $4) + 1] * interval '1 day', 1)
     ON CONFLICT (email, card_id) DO UPDATE SET
       box = CASE WHEN $6 THEN 0 ELSE LEAST(flashcards.box + $3::int, $4) END,
       due_at = now() + ($5::int[])[(CASE WHEN $6 THEN 0 ELSE LEAST(flashcards.box + $3::int, $4) END) + 1] * interval '1 day',
       reviews = flashcards.reviews + 1`,
    [user.email, cardId, jump, max, INTERVAL_DAYS, rating === "again"],
  );
  await recordActivity(user.email, "flash", cardId);
}

export async function recordWriting(item: string) {
  const user = await getUser();
  // Items are a letter ("ক"), a vowel sign ("m:ি"), a word-builder entry ("w:ক") or a sentence ("s:1").
  const valid =
    LETTERS.some((l) => l.ch === item || (l.word && `w:${l.ch}` === item)) ||
    SIGNS.some(([s]) => `m:${s}` === item) ||
    SENTENCES.some((s) => `s:${s.id}` === item);
  if (!user?.hasAccess || !valid) return;
  await query(
    `INSERT INTO writing_practice (email, item, count) VALUES ($1, $2, 1)
     ON CONFLICT (email, item) DO UPDATE SET count = writing_practice.count + 1`,
    [user.email, item],
  );
  await recordActivity(user.email, "writing", item);
}

async function completeLesson(email: string, lessonId: string) {
  const added = await query(
    "INSERT INTO lesson_progress (email, lesson_id) VALUES ($1, $2) ON CONFLICT (email, lesson_id) DO NOTHING RETURNING lesson_id",
    [email, lessonId],
  );
  if (added.length) await recordActivity(email, "lesson", lessonId); // points the first time only
}

/** Mark a lesson complete, or undo it. Only known lesson ids are accepted. */
export async function setLessonDone(lessonId: string, done: boolean) {
  const user = await getUser();
  if (!user?.hasAccess || !isLessonId(lessonId)) return;
  if (done) await completeLesson(user.email, lessonId);
  else await query("DELETE FROM lesson_progress WHERE email = $1 AND lesson_id = $2", [user.email, lessonId]);
}

export async function recordStoryQuiz(storyId: string, score: number) {
  const user = await getUser();
  const dev = getDevStory(storyId);
  const story = dev ?? STORIES.find((s) => s.id === storyId);
  if (!user?.hasAccess || !story || !Number.isFinite(score)) return;
  const total = story.quiz.length;
  const s = Math.max(0, Math.min(total, Math.floor(score)));
  await query(
    `INSERT INTO story_progress (email, story_id, best_score, total, attempts) VALUES ($1, $2, $3, $4, 1)
     ON CONFLICT (email, story_id) DO UPDATE SET
       best_score = GREATEST(story_progress.best_score, $3), total = $4,
       attempts = story_progress.attempts + 1, updated_at = now()`,
    [user.email, storyId, s, total],
  );
  await recordActivity(user.email, "quiz", `story:${storyId}`, { pass: s >= Math.ceil(total * 0.7) });
  await completeLesson(user.email, dev ? `reading/${storyId}` : `reading/story-${storyId}`);
}

export async function recordGrammarQuiz(topicId: string, score: number) {
  const user = await getUser();
  const topic = [...GRAMMAR, ...READING_LESSONS].find((t) => t.id === topicId);
  const round = topicId.startsWith("w-") ? WORKOUT.find((r) => `w-${r.id}` === topicId) : undefined;
  const vocab = topicId.startsWith("v-") ? VOCAB.find((t) => `v-${t.id}` === topicId) : undefined;
  const dev = topicId.startsWith("v-dev-") ? DEV_TOPICS.find((t) => `v-${t.id}` === topicId) : undefined;
  const translate = topicId === "translate";
  if (!user?.hasAccess || (!topic && !round && !vocab && !dev && !translate) || !Number.isFinite(score)) return;
  const total = topic ? topic.exercises.length : round ? round.items.length : translate ? TRANSLATE_LEN : VOCAB_QUIZ_LEN; // vocabulary and devotional rounds
  const s = Math.max(0, Math.min(total, Math.floor(score)));
  await query(
    `INSERT INTO grammar_progress (email, topic_id, best_score, total, attempts) VALUES ($1, $2, $3, $4, 1)
     ON CONFLICT (email, topic_id) DO UPDATE SET
       best_score = GREATEST(grammar_progress.best_score, $3), total = $4,
       attempts = grammar_progress.attempts + 1, updated_at = now()`,
    [user.email, topicId, s, total],
  );
  await recordActivity(user.email, "quiz", topicId, { pass: s >= Math.ceil(total * 0.7) });
  if (translate) {
    if (s >= Math.ceil(total * 0.7)) await completeLesson(user.email, "grammar/translate");
    return;
  }
  if (dev) {
    // A devotional lesson counts as done once a practice round scores 70% or more.
    if (s >= Math.ceil(total * 0.7)) await completeLesson(user.email, dev.lessonId);
    return;
  }
  if (vocab) {
    // A vocabulary lesson counts as done once a practice round scores 70% or more.
    if (s >= Math.ceil(total * 0.7)) await completeLesson(user.email, `vocabulary/${vocab.id}`);
    return;
  }
  const inReading = READING_LESSONS.some((t) => t.id === topicId);
  await completeLesson(user.email, `${inReading ? "reading" : "grammar"}/${topicId}`);
}


/** A fresh round of quick-translation questions. */
export async function translationRound(direction: Direction, source: Source): Promise<TQuestion[]> {
  const user = await getUser();
  if (!user?.hasAccess) return [];
  if (!["en2bn", "bn2en"].includes(direction) || !["all", "phrases", "grammar"].includes(source)) return [];
  return makeRound(direction, source);
}

/** One random impromptu topic. Topics stay on the server and are handed out one at a time. */
export async function impromptuTopic(kind: string, level: string, seen: string[]): Promise<{ en: string; ideas: string[]; kind: TopicKind } | null> {
  const user = await getUser();
  if (!user?.hasAccess) return null;
  const kinds = Object.keys(TOPICS) as TopicKind[];
  const k: TopicKind = kinds.includes(kind as TopicKind) ? (kind as TopicKind) : kinds[Math.floor(Math.random() * kinds.length)];
  const pool = TOPICS[k].filter((t) => level !== "easy" || t.level === 1);
  const fresh = pool.filter((t) => !seen.includes(t.en));
  const list = fresh.length ? fresh : pool;
  const t = list[Math.floor(Math.random() * list.length)];
  return { en: t.en, ideas: t.ideas, kind: k };
}

// ---------------- timed exams ----------------
export type StartedExam = { attemptId: string; deadline: string; serverNow: string; minutes: number; resumed: boolean; questions: PublicExamQ[] };
export type ExamReview = { topic: string; inst: string; q: string; sentence: { bn: string; ro: string } | null; audio?: string; options: ExamQ["options"]; chosen: number | null; answer: number; why?: string };
export type ExamResult = { score: number; total: number; pct: number; passed: boolean; late: boolean; seconds: number; pass: number; review: ExamReview[] };

/** Start an exam, or resume the one already in progress. Questions are made here and the answers stay on the server. */
export async function startExam(examId: string): Promise<StartedExam | { error: string }> {
  const user = await getUser();
  const def = getExam(examId);
  if (!user?.hasAccess || !def) return { error: "Not available." };
  const open = await query<{ id: string; deadline: Date; questions: string }>(
    "SELECT id, deadline, questions FROM exam_attempts WHERE email = $1 AND exam_id = $2 AND finished_at IS NULL AND deadline > now() ORDER BY started_at DESC LIMIT 1",
    [user.email, def.id],
  );
  if (open[0]) {
    return { attemptId: open[0].id, deadline: new Date(open[0].deadline).toISOString(), serverNow: new Date().toISOString(), minutes: def.minutes, resumed: true, questions: toPublic(JSON.parse(open[0].questions) as ExamQ[]) };
  }
  const questions = generateExam(def.id, def.count);
  const id = randomUUID();
  const deadline = new Date(Date.now() + def.minutes * 60_000);
  await query("INSERT INTO exam_attempts (id, email, exam_id, deadline, questions) VALUES ($1, $2, $3, $4::timestamptz, $5)", [id, user.email, def.id, deadline.toISOString(), JSON.stringify(questions)]);
  return { attemptId: id, deadline: deadline.toISOString(), serverNow: new Date().toISOString(), minutes: def.minutes, resumed: false, questions: toPublic(questions) };
}

/** Grade an attempt on the server. Answers sent long after the deadline are not counted. */
export async function submitExam(attemptId: string, answers: (number | null)[]): Promise<ExamResult | { error: string }> {
  const user = await getUser();
  if (!user?.hasAccess || typeof attemptId !== "string" || !Array.isArray(answers)) return { error: "Not available." };
  const rows = await query<{ exam_id: string; questions: string; deadline: Date; started_at: Date; finished_at: Date | null }>(
    "SELECT exam_id, questions, deadline, started_at, finished_at FROM exam_attempts WHERE id = $1 AND email = $2",
    [attemptId, user.email],
  );
  const row = rows[0];
  const def = row && getExam(row.exam_id);
  if (!row || !def) return { error: "Exam not found." };
  if (row.finished_at) return { error: "This exam was already submitted." };
  const qs = JSON.parse(row.questions) as ExamQ[];
  const now = Date.now();
  const late = now > new Date(row.deadline).getTime() + 5 * 60_000; // five minutes of grace for slow connections
  const chosen = qs.map((q, i) => { const a = answers[i]; return typeof a === "number" && Number.isInteger(a) && a >= 0 && a < q.options.length ? a : null; });
  const score = late ? 0 : chosen.reduce<number>((n, a, i) => n + (a === qs[i].answer ? 1 : 0), 0);
  const total = qs.length;
  const pct = Math.round((score / total) * 100);
  const passed = !late && pct >= def.pass;
  await query("UPDATE exam_attempts SET finished_at = now(), answers = $2, score = $3, total = $4 WHERE id = $1", [attemptId, JSON.stringify(chosen), score, total]);
  await recordActivity(user.email, "exam", row.exam_id, { pass: passed });
  if (passed) await completeLesson(user.email, def.lessonId);
  return {
    score, total, pct, passed, late, pass: def.pass,
    seconds: Math.round((Math.min(now, new Date(row.deadline).getTime()) - new Date(row.started_at).getTime()) / 1000),
    review: qs.map((q, i) => ({ topic: q.topic, inst: q.inst, q: q.q, sentence: q.sentence, audio: q.audio, options: q.options, chosen: chosen[i], answer: q.answer, why: q.why })),
  };
}
