import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadWriting } from "@/lib/progress";
import { SENTENCES } from "@/data/sentences";
import SentenceBuilder from "./SentenceBuilder";
import Icon from "../../Icon";

export default async function Page() {
  await requireAccess();
  return (
    <main>
      <Link href="/learn/writing" className="back"><Icon name="prev" size={16} />Writing</Link>
      <h1>Build the sentence</h1>
      <SentenceBuilder initialCounts={await loadWriting()} sentences={SENTENCES} />
    </main>
  );
}
