import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { logout } from "../actions";

export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <div className="page">
      <header className="top">
        <Link href="/learn" className="brand">বাংলা Practice</Link>
        <span className="spacer" />
        {user.isAdmin && <Link href="/admin">Admin</Link>}
        <form action={logout}><button className="link">Sign out</button></form>
      </header>
      {user.hasAccess ? (
        children
      ) : (
        <div className="card-static">
          <h2>Your access has ended</h2>
          <p>
            {user.expiresAt
              ? `Your 12 months of access ended on ${user.expiresAt.toLocaleDateString("en-GB", { dateStyle: "long" })}.`
              : "Your account doesn't have active access yet."}{" "}
            Renew below, or contact your teacher.
          </p>
          <Link className="btn" href="/buy">Renew for 12 months</Link>
        </div>
      )}
    </div>
  );
}
