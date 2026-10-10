import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { logout } from "../actions";
import { RomanProvider, RomanToggle } from "./Roman";

export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) redirect("/login");
  if (!user.hasAccess) redirect("/access-ended");

  const roman = (await cookies()).get("bp_roman")?.value !== "0"; // on unless the student turned it off
  return (
    <div className="page">
      <header className="top">
        <Link href="/learn" className="brand"><span className="brand-text">বাংলা Practice</span></Link>
        <span className="spacer" />
        {user.isAdmin && <Link href="/admin" className="navbtn">Admin</Link>}
        <form action={logout}><button className="link">Sign out</button></form>
      </header>
      <RomanProvider initial={roman}>
        <RomanToggle />
        {children}
      </RomanProvider>
    </div>
  );
}
