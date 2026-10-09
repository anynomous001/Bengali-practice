import Link from "next/link";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import Alphabet from "./Alphabet";

export default async function AlphabetPage() {
  const user = await getUser();
  const rows = user
    ? await query<{ letter: string; right_count: number; wrong_count: number }>(
        "SELECT letter, right_count, wrong_count FROM progress WHERE email = $1",
        [user.email],
      )
    : [];
  const initial = Object.fromEntries(rows.map((r) => [r.letter, { right: r.right_count, wrong: r.wrong_count }]));
  return (
    <main>
      <p><Link href="/learn">← All modules</Link></p>
      <Alphabet initialProgress={initial} />
    </main>
  );
}
