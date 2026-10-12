import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadExamHistory } from "@/lib/progress";
import { getExam } from "@/data/exams";
import ExamRunner from "../../ExamRunner";
import LessonFrame from "../../LessonFrame";

export default async function ExamPage() {
  await requireAccess();
  const exam = getExam("listening");
  if (!exam) notFound();
  const history = await loadExamHistory(exam.id);
  return (
    <LessonFrame lessonId={exam.lessonId}>
      <ExamRunner
        exam={{ id: exam.id, title: exam.title, blurb: exam.blurb, minutes: exam.minutes, count: exam.count, pass: exam.pass }}
        history={{ best: history.best, attempts: history.attempts.map((a) => ({ finishedAt: a.finishedAt.toISOString(), score: a.score, total: a.total })) }}
      />
    </LessonFrame>
  );
}
