import type { Metadata } from "next";
import Logo from "../Logo";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { logout } from "../actions";
import Icon from "./Icon";
import NavLinks from "./NavLinks";
import { EnglishToggle, RomanProvider, RomanToggle } from "./Roman";
import ThemeToggle from "./ThemeToggle";
import TzSync from "./TzSync";

export const metadata: Metadata = { robots: { index: false } };

export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) redirect("/login");
  if (!user.hasAccess) redirect("/access-ended");

  const jar = await cookies();
  const roman = jar.get("bp_roman")?.value !== "0"; // on unless the student turned it off
  const english = jar.get("bp_english")?.value !== "0";
  const t = jar.get("bp_theme")?.value;
  const theme = t === "light" || t === "dark" ? t : "system";
  return (
    <RomanProvider initial={roman} initialEnglish={english}>
      <TzSync />
      <div className="app" data-english={english ? "on" : "off"}>
        <aside className="side">
          <Link href="/learn" className="side-brand">
            <Logo />
            <span><b lang="bn">বাংলা</b><small>Practice</small></span>
          </Link>
          <nav className="side-nav" aria-label="Main"><NavLinks variant="side" /></nav>
          <div className="side-foot">
            <RomanToggle />
            <EnglishToggle />
            <ThemeToggle initial={theme} />
            <div className="who" title={user.email}>{user.email}</div>
            <div className="side-actions">
              {user.isAdmin && <Link href="/admin" className="side-link"><Icon name="shield" size={16} />Admin</Link>}
              <form action={logout}><button className="side-link"><Icon name="logout" size={16} />Sign out</button></form>
            </div>
          </div>
        </aside>

        <header className="mtop">
          <Link href="/learn" className="side-brand">
            <Logo />
            <span><b lang="bn">বাংলা</b></span>
          </Link>
          <span className="spacer" />
          <RomanToggle label="Roman" />
          <EnglishToggle label="English" />
          <ThemeToggle initial={theme} compact />
          <Link href="/learn/progress" className="icon-link" aria-label="My progress"><Icon name="trophy" size={18} /></Link>
          <Link href="/learn/refer" className="icon-link" aria-label="Refer a friend"><Icon name="gift" size={18} /></Link>
          <Link href="/learn/feedback" className="icon-link" aria-label="Feedback"><Icon name="feedback" size={18} /></Link>
          {user.isAdmin && <Link href="/admin" className="icon-link" aria-label="Admin"><Icon name="shield" size={18} /></Link>}
          <form action={logout}><button className="icon-link" aria-label="Sign out"><Icon name="logout" size={18} /></button></form>
        </header>

        <div className="main">{children}</div>

        <nav className="tabbar" aria-label="Main"><NavLinks variant="tabs" /></nav>
      </div>
    </RomanProvider>
  );
}
