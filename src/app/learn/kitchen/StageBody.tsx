import Link from "next/link";
import { KITCHEN, type KSection } from "@/data/kitchen/content";
import { MEASURE_PLURAL, WARNING_PICTURES } from "@/data/kitchen/config";
import AudioBar from "./AudioBar";
import Block from "./Block";
import Cards from "./Cards";
import Mixed from "./Mixed";
import PictureMatch from "./PictureMatch";
import ProgressCheck from "./ProgressCheck";
import RecipeReader from "./RecipeReader";
import Roleplay from "./Roleplay";
import SentenceBuilder from "./SentenceBuilder";
import StageSteps from "./StageSteps";

const sec = (stage: number, id: string): KSection => KITCHEN.stages.find((s) => s.id === stage)!.sections.find((x) => x.id === id)!;
const slug = (id: string) => "sec-" + id.replace(".", "-");

/** The sections of a stage page, in order. */
export function stageToc(n: number) {
  const st = KITCHEN.stages.find((s) => s.id === n)!;
  const names: { id: string; label: string }[] = [];
  const add = (id: string, label: string) => names.push({ id, label });
  for (const s of st.sections) {
    if (n === 1 && s.id === "1.3") add(slug(s.id), "Picture matching");
    else if (n === 2 && s.id === "2.4") add(slug(s.id), "Sentence builder");
    else if (s.kind === "dialogue" && n === 4) { if (!names.some((x) => x.id === "sec-scenes")) add("sec-scenes", "Scenes"); }
    else if (s.kind === "dialogue") add(slug(s.id), "Roleplay");
    else if (s.kind === "recipe") add("sec-recipe", "Recipe reader");
    else add(slug(s.id), s.title);
  }
  add("sec-check", "Progress check");
  return names;
}

export default function StageBody({ n }: { n: number }) {
  const st = KITCHEN.stages.find((s) => s.id === n)!;
  const steps = KITCHEN.stages.map((s) => ({ id: s.id, title: s.title }));
  const cards = (s: KSection) => <Block key={s.id} id={slug(s.id)} title={s.title} note={s.note}><Cards items={s.items} /></Block>;

  let body: React.ReactNode;
  if (n === 1) {
    const warn = sec(1, "1.3");
    body = (
      <>
        {cards(sec(1, "1.1"))}
        {cards(sec(1, "1.2"))}
        <Block id={slug("1.3")} title="Picture matching" note="Tap a picture, then tap the sentence that goes with it.">
          <PictureMatch items={warn.items} pictures={WARNING_PICTURES} />
          <h3 className="kt-sub">{warn.title}</h3>
          <Cards items={warn.items} layout="list" />
        </Block>
        {cards(sec(1, "1.4"))}
      </>
    );
  } else if (n === 2) {
    const q = sec(2, "2.4");
    body = (
      <>
        {cards(sec(2, "2.1"))}
        {cards(sec(2, "2.2"))}
        {cards(sec(2, "2.3"))}
        <Block id={slug("2.4")} title="Sentence builder" note={q.note}>
          <SentenceBuilder numbers={sec(2, "2.1").items} measures={sec(2, "2.2").items} ingredients={sec(2, "2.3").items} plural={MEASURE_PLURAL} />
          <h3 className="kt-sub">{q.title}</h3>
          <Cards items={q.items} layout="list" />
        </Block>
        {cards(sec(2, "2.5"))}
        {cards(sec(2, "2.6"))}
        {cards(sec(2, "2.7"))}
        {cards(sec(2, "2.8"))}
      </>
    );
  } else if (n === 3) {
    body = (
      <>
        {["3.1", "3.2", "3.3", "3.4", "3.5"].map((id) => cards(sec(3, id)))}
        <Block id={slug("3.6")} title="Roleplay" note={sec(3, "3.6").title}><Roleplay scenes={[sec(3, "3.6")]} /></Block>
      </>
    );
  } else if (n === 4) {
    const scenes = st.sections.filter((s) => s.kind === "dialogue");
    body = <Block id="sec-scenes" title="Scenes" note={st.note}><Roleplay scenes={scenes} /></Block>;
  } else {
    const recipe = sec(5, "5.5-recipe");
    body = (
      <>
        {["5.1", "5.2", "5.3", "5.4", "5.5"].map((id) => cards(sec(5, id)))}
        <Block id="sec-recipe" title="Recipe reader" note={recipe.title}><RecipeReader steps={recipe.items} /></Block>
        <Block id={slug("5.6")} title="Roleplay" note={sec(5, "5.6").title}><Roleplay scenes={[sec(5, "5.6")]} /></Block>
      </>
    );
  }

  return (
    <div className="kt">
      <p className="eyebrow">Stage {n} of {KITCHEN.stages.length}</p>
      <h1>{st.title}</h1>
      <p className="lede"><Mixed text={st.goal} /></p>
      <StageSteps stages={steps} current={n} />
      <AudioBar />
      {body}
      <Block id="sec-check" title="Progress check"><ProgressCheck stage={n} goal={st.goal} items={KITCHEN.progress} /></Block>
      <p><Link href="/learn/kitchen/listening" className="btn ghost small">Practise listening</Link></p>
    </div>
  );
}
