import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadWriting } from "@/lib/progress";
import { NUMBER_CHART } from "@/data/numbers";
import Trace from "../trace/Trace";
import Icon from "../../Icon";

const TENS = new Set([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

export default async function TraceNumeralsPage() {
  await requireAccess();
  const items = NUMBER_CHART.filter((n) => n.value < 10 || TENS.has(n.value)).map((n) => ({
    id: `n:${n.value}`,
    guide: n.numeral,
    say: n.word,
    tile: n.numeral,
    rom: n.wrom,
    group: n.value < 10 ? "digits" : "tens",
    note: `The word: ${n.word}`,
    scale: n.numeral.length === 1 ? 0.62 : n.numeral.length === 2 ? 0.5 : 0.4,
  }));
  return (
    <main>
      <Link href="/learn/writing" className="back"><Icon name="prev" size={16} />Writing</Link>
      <h1>Trace numerals</h1>
      <Trace
        initialCounts={await loadWriting()}
        items={items}
        groups={[{ id: "digits", title: "The ten digits (০ to ৯)" }, { id: "tens", title: "Bigger numbers" }]}
        noun="Number"
        intro="Trace the faint numeral with your finger, a pen or the mouse. The bigger numbers are the digits side by side."
      />
    </main>
  );
}
