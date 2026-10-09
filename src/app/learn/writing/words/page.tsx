import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadWriting } from "@/lib/progress";
import { LETTERS } from "@/data/letters";
import Builder from "./Builder";

export default async function WordsPage() {
  await requireAccess();
  return (
    <main>
      <p><Link href="/learn/writing">← Writing</Link></p>
      <h1>Build the word</h1>
      <Builder initialCounts={await loadWriting()} letters={LETTERS} />
    </main>
  );
}
