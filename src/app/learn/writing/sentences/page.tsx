import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadWriting } from "@/lib/progress";
import { SENTENCES } from "@/data/sentences";
import SentenceBuilder from "./SentenceBuilder";

export default async function Page() {
  await requireAccess();
  return (
    <main>
      <Link href="/learn/writing" className="back">← Writing</Link>
      <h1>Build the sentence</h1>
      <SentenceBuilder initialCounts={await loadWriting()} sentences={SENTENCES} />
    </main>
  );
}
