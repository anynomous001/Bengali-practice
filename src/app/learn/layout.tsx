import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { logout } from "../actions";
import Icon from "./Icon";
import NavLinks from "./NavLinks";
import { RomanProvider, RomanToggle } from "./Roman";

export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) redirect("/login");
  if (!user.hasAccess) redirect("/access-ended");

  const roman = (await cookies()).get("bp_roman")?.value !== "0"; // on unless the student turned it off
  return (
    <RomanProvider initial={roman}>
      <div className="app">
        <aside className="side">
          <Link href="/learn" className="side-brand">
            <span className="mark" lang="bn">বাং</span>
            <span><b lang="bn">বাংলা</b><small>Practice</small></span>
          </Link>
          <nav className="side-nav" aria-label="Main"><NavLinks variant="side" /></nav>
          <div className="side-foot">
            <RomanToggle />
            <div className="who" title={user.email}>{user.email}</div>
            <div className="side-actions">
              {user.isAdmin && <Link href="/admin" className="side-link"><Icon name="shield" size={16} />Admin</Link>}
              <form action={logout}><button className="side-link"><Icon name="logout" size={16} />Sign out</button></form>
            </div>
          </div>
        </aside>

        <header className="mtop">
          <Link href="/learn" className="side-brand">
            <span className="mark" lang="bn">বাং</span>
            <span><b lang="bn">বাংলা</b></span>
          </Link>
          <span className="spacer" />
          <RomanToggle label="Roman" />
          {user.isAdmin && <Link href="/admin" className="icon-link" aria-label="Admin"><Icon name="shield" size={18} /></Link>}
          <form action={logout}><button className="icon-link" aria-label="Sign out"><Icon name="logout" size={18} /></button></form>
        </header>

        <div className="main">{children}</div>

        <nav className="tabbar" aria-label="Main"><NavLinks variant="tabs" /></nav>
      </div>
    </RomanProvider>
  );
}
