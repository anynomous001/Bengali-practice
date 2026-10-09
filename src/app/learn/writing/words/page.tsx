import Link from "next/link";
import { loadWriting } from "@/lib/progress";
import Builder from "./Builder";

export default async function WordsPage() {
  return (
    <main>
      <p><Link href="/learn/writing">← Writing</Link></p>
      <h1>Build the word</h1>
      <Builder initialCounts={await loadWriting()} />
    </main>
  );
}
