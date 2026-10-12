import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadProgress } from "@/lib/progress";
import { GROUPS, LETTERS } from "@/data/letters";
import Alphabet from "./Alphabet";

export default async function AlphabetPage() {
  await requireAccess();
  return (
    <main>
      <Link href="/learn/reading" className="back">← Reading</Link>
      <Alphabet initialProgress={await loadProgress()} segment="reading" letters={LETTERS} groups={GROUPS} />
    </main>
  );
}
