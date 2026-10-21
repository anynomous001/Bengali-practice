import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadWriting } from "@/lib/progress";
import { GROUPS, LETTERS } from "@/data/letters";
import Trace from "./Trace";
import Icon from "../../Icon";

export default async function TracePage() {
  await requireAccess();
  return (
    <main>
      <Link href="/learn/writing" className="back"><Icon name="prev" size={16} />Writing</Link>
      <h1>Trace letters</h1>
      <Trace initialCounts={await loadWriting()} items={LETTERS.map((l) => ({ id: l.ch, guide: l.ch, tile: l.ch, rom: l.rom, group: l.group }))} groups={GROUPS} />
    </main>
  );
}
