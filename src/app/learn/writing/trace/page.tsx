import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadWriting } from "@/lib/progress";
import { GROUPS, LETTERS } from "@/data/letters";
import Trace from "./Trace";

export default async function TracePage() {
  await requireAccess();
  return (
    <main>
      <Link href="/learn/writing" className="back">← Writing</Link>
      <h1>Trace letters</h1>
      <Trace initialCounts={await loadWriting()} letters={LETTERS} groups={GROUPS} />
    </main>
  );
}
