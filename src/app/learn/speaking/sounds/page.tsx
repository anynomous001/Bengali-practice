import Link from "next/link";
import Alphabet from "../../reading/alphabet/Alphabet";
import { loadProgress } from "@/lib/progress";

export default async function SoundsPage() {
  return (
    <main>
      <p><Link href="/learn/speaking">← Speaking</Link></p>
      <Alphabet initialProgress={await loadProgress()} segment="speaking" />
    </main>
  );
}
