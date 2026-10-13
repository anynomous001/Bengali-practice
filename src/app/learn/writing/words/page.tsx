import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadWriting } from "@/lib/progress";
import { LETTERS } from "@/data/letters";
import Builder from "./Builder";
import Icon from "../../Icon";

export default async function WordsPage() {
  await requireAccess();
  return (
    <main>
      <Link href="/learn/writing" className="back"><Icon name="prev" size={16} />Writing</Link>
      <h1>Build the word</h1>
      <Builder initialCounts={await loadWriting()} letters={LETTERS} />
    </main>
  );
}
