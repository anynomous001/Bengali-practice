import SessionHint from "../SessionHint";
import type { Metadata } from "next";
import Logo from "../Logo";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { logout } from "../actions";
import Icon from "./Icon";
import MobileMenu from "./MobileMenu";
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
      <SessionHint mode="set" />
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
          <MobileMenu
            items={[
              { href: "/learn/path", label: "My path", icon: "path" },
              { href: "/learn/writing", label: "Writing", icon: "writing" },
              { href: "/learn/progress", label: "My progress", icon: "trophy" },
              { href: "/learn/leaderboard", label: "Leaderboard", icon: "medal" },
              { href: "/learn/refer", label: "Refer a friend", icon: "gift" },
              { href: "/learn/feedback", label: "Feedback", icon: "feedback" },
              ...(user.isAdmin ? [{ href: "/admin", label: "Admin", icon: "shield" as const }] : []),
            ]}
            controls={<><RomanToggle /><EnglishToggle /><ThemeToggle initial={theme} /></>}
            footer={<form action={logout}><button className="mm-link mm-signout"><Icon name="logout" size={20} />Sign out</button></form>}
          />
        </header>

        <div className="main">{children}</div>

        <nav className="tabbar" aria-label="Main"><NavLinks variant="tabs" /></nav>
      </div>
    </RomanProvider>
  );
}
