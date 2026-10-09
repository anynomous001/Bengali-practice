import Link from "next/link";
import NumberQuiz from "../../NumberQuiz";

export default function Page() {
  return (
    <main>
      <p><Link href="/learn/speaking">← Speaking</Link></p>
      <h1>Numbers &amp; money listening</h1>
      <NumberQuiz listening />
    </main>
  );
}
