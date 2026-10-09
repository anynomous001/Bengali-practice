import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { NUMBERS } from "@/data/numbers";
import NumberQuiz from "../../NumberQuiz";

export default async function Page() {
  await requireAccess();
  return (
    <main>
      <p><Link href="/learn/speaking">← Speaking</Link></p>
      <h1>Numbers &amp; money listening</h1>
      <NumberQuiz numbers={NUMBERS} listening />
    </main>
  );
}
