import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { logout } from "../actions";

export default async function AccessEnded() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (user.hasAccess) redirect("/learn");
  return (
    <main className="page narrow">
      <h1>Your access has ended</h1>
      <p>
        {user.expiresAt
          ? `Your 12 months of access ended on ${user.expiresAt.toLocaleDateString("en-GB", { dateStyle: "long" })}.`
          : "Your account doesn't have active access yet."}{" "}
        Renew below, or contact your teacher.
      </p>
      <Link className="btn" href="/buy">Get 12 months of access</Link>
      <form action={logout}><button className="link">Sign out</button></form>
    </main>
  );
}
