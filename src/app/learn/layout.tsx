import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { logout } from "../actions";

export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) redirect("/login");
  if (!user.hasAccess) redirect("/access-ended");

  return (
    <div className="page">
      <header className="top">
        <Link href="/learn" className="brand">বাংলা Practice</Link>
        <span className="spacer" />
        {user.isAdmin && <Link href="/admin" className="navbtn">Admin</Link>}
        <form action={logout}><button className="link">Sign out</button></form>
      </header>
      {children}
    </div>
  );
}
