import Link from "next/link";
import { loadWriting } from "@/lib/progress";
import SentenceBuilder from "./SentenceBuilder";

export default async function Page() {
  return (
    <main>
      <p><Link href="/learn/writing">← Writing</Link></p>
      <h1>Build the sentence</h1>
      <SentenceBuilder initialCounts={await loadWriting()} />
    </main>
  );
}
