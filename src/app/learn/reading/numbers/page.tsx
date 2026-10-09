import Link from "next/link";
import NumberQuiz from "../../NumberQuiz";

export default function Page() {
  return (
    <main>
      <p><Link href="/learn/reading">← Reading</Link></p>
      <h1>Numbers &amp; money</h1>
      <NumberQuiz />
    </main>
  );
}
