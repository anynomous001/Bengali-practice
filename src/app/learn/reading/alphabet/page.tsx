import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadProgress } from "@/lib/progress";
import { GROUPS, LETTERS } from "@/data/letters";
import Alphabet from "./Alphabet";

export default async function AlphabetPage() {
  await requireAccess();
  return (
    <main>
      <p><Link href="/learn/reading">← Reading</Link></p>
      <Alphabet initialProgress={await loadProgress()} segment="reading" letters={LETTERS} groups={GROUPS} />
    </main>
  );
}
