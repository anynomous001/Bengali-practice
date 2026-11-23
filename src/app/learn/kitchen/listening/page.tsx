import { KITCHEN } from "@/data/kitchen/content";
import { requireAccess } from "@/lib/access";
import LessonFrame from "../../LessonFrame";
import AudioBar from "../AudioBar";
import Block from "../Block";
import ListeningQuiz from "../ListeningQuiz";
import Mixed from "../Mixed";
import StageSteps from "../StageSteps";

export default async function ListeningPage() {
  await requireAccess();
  const steps = KITCHEN.stages.map((s) => ({ id: s.id, title: s.title }));
  const list = (items: string[]) => <ul className="kt-plain">{items.map((t, i) => <li key={i}><Mixed text={t} /></li>)}</ul>;
  return (
    <LessonFrame lessonId="kitchen/listening" toc={[{ id: "sec-quiz", label: "Listening quiz" }, { id: "sec-sounds", label: "Pronunciation" }, { id: "sec-home", label: "Practice at home" }, { id: "sec-teacher", label: "Teacher notes" }]}>
      <div className="kt">
        <p className="eyebrow">Kitchen Bengali</p>
        <h1>Listening practice</h1>
        <p className="lede">Hear a Bengali phrase, then choose its English meaning.</p>
        <StageSteps stages={steps} />
        <AudioBar />
        <Block id="sec-quiz" title="Listening quiz" note={KITCHEN.listeningNote}><ListeningQuiz levels={KITCHEN.listening} /></Block>
        <Block id="sec-sounds" title="Pronunciation focus">{list(KITCHEN.pronunciation)}</Block>
        <Block id="sec-home" title="Practice at home">{list(KITCHEN.homework)}</Block>
        <Block id="sec-teacher" title="Teacher notes">{list(KITCHEN.teacher)}</Block>
      </div>
    </LessonFrame>
  );
}
