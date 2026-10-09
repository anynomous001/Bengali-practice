import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { NUMBERS } from "@/data/numbers";
import NumberQuiz from "../../NumberQuiz";

export default async function Page() {
  await requireAccess();
  return (
    <main>
      <p><Link href="/learn/reading">← Reading</Link></p>
      <h1>Numbers &amp; money</h1>
      <NumberQuiz numbers={NUMBERS} />
    </main>
  );
}
