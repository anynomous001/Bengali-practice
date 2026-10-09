import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function Home() {
  if (await getUser()) redirect("/learn");
  return (
    <main className="page narrow">
      <h1>বাংলা Practice</h1>
      <p>A private practice space for my Bengali students: alphabet, pronunciation, conversations, numbers and more.</p>
      <Link className="btn" href="/login">Student sign in</Link>
    </main>
  );
}
