import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadWriting } from "@/lib/progress";
import { SIGNS } from "@/data/signs";
import Trace from "../trace/Trace";
import Icon from "../../Icon";

export default async function TraceSignsPage() {
  await requireAccess();
  return (
    <main>
      <Link href="/learn/writing" className="back"><Icon name="prev" size={16} />Writing</Link>
      <h1>Trace vowel signs</h1>
      <Trace
        initialCounts={await loadWriting()}
        items={SIGNS.map(([sign, rom, name, vowel]) => ({ id: `m:${sign}`, guide: `ক${sign}`, tile: `ক${sign}`, rom, group: "signs", note: `${name}: the sign for ${vowel}` }))}
        groups={[{ id: "signs", title: "The ten vowel signs (কার)" }]}
        noun="Syllable"
        intro="Trace the faint syllable: the consonant ক with its vowel sign. Watch where the sign goes, after, before, above or below the letter."
        scale={0.5}
      />
    </main>
  );
}
