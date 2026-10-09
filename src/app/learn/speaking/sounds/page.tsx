import Link from "next/link";
import Alphabet from "../../reading/alphabet/Alphabet";
import { requireAccess } from "@/lib/access";
import { loadProgress } from "@/lib/progress";
import { GROUPS, LETTERS } from "@/data/letters";

export default async function SoundsPage() {
  await requireAccess();
  return (
    <main>
      <p><Link href="/learn/speaking">← Speaking</Link></p>
      <Alphabet initialProgress={await loadProgress()} segment="speaking" letters={LETTERS} groups={GROUPS} />
    </main>
  );
}
