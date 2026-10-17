import { requireAccess } from "@/lib/access";
import { BIG_NUMBERS, NUMBER_CHART, NUMBERS, PRICE_PHRASES } from "@/data/numbers";
import { VOCAB, type Word } from "@/data/vocabulary";
import LessonFrame from "../../LessonFrame";
import NumbersLesson from "./NumbersLesson";

/** A section of the vocabulary lists, by its title, so days, months and money are written in one place only. */
function section(title: string): Word[] {
  for (const t of VOCAB) for (const s of t.sections) if (s.title === title) return s.words;
  return [];
}
const plain = (ws: Word[]): [string, string, string][] => ws.map((w) => [w[0], w[1], w[2]]);

export default async function Page() {
  await requireAccess();
  return (
    <LessonFrame lessonId="reading/numbers">
      <h1>Numbers, money &amp; time</h1>
      <NumbersLesson
        data={{
          quiz: NUMBERS,
          chart: NUMBER_CHART,
          big: BIG_NUMBERS,
          phrases: PRICE_PHRASES,
          moneyWords: plain(section("Money")),
          days: plain(section("Days of the week")),
          parts: plain(section("Parts of the day")),
          bnMonths: plain(section("Bengali months")),
          enMonths: plain(section("English months")),
        }}
      />
    </LessonFrame>
  );
}
