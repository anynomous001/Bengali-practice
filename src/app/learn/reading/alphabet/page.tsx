import Link from "next/link";
import { loadProgress } from "@/lib/progress";
import Alphabet from "./Alphabet";

export default async function AlphabetPage() {
  return (
    <main>
      <p><Link href="/learn/reading">← Reading</Link></p>
      <Alphabet initialProgress={await loadProgress()} segment="reading" />
    </main>
  );
}
