import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { logout } from "../actions";
import AuthFrame from "../AuthFrame";

export const metadata: Metadata = { robots: { index: false } };

export default async function AccessEnded() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (user.hasAccess) redirect("/learn");
  return (
    <AuthFrame back={false}>
      <p className="eyebrow">Access</p>
      <h1>Your access has ended</h1>
      <p className="muted">
        {user.expiresAt
          ? `Your 12 months of access ended on ${user.expiresAt.toLocaleDateString("en-GB", { dateStyle: "long" })}.`
          : "Your account doesn't have active access yet."}{" "}
        Renew below, or contact your teacher.
      </p>
      <div className="stack">
        <Link className="btn" href="/buy">Get 12 months of access</Link>
        <form action={logout}><button className="btn ghost" style={{ width: "100%" }}>Sign out</button></form>
      </div>
    </AuthFrame>
  );
}
