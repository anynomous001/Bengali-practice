import Link from "next/link";
import Logo from "../Logo";
import { SiteFooter } from "../legal/LegalPage";
import { inter } from "../inter";
import "../landing.css";
import "./guide.css";

/** Shared frame for the free public guides: the same pill nav and dark footer as the home page. */
export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`cr guide ${inter.variable}`}>
      <header className="cr-nav">
        <div className="cr-pill">
          <Link href="/" className="cr-brand"><Logo /><span><b lang="bn">বাংলা</b> Practice</span></Link>
          <nav aria-label="Free guides">
            <Link href="/learn-bengali">Learn Bengali</Link>
            <Link href="/bengali-alphabet">Alphabet</Link>
            <Link href="/bengali-numbers">Numbers</Link>
          </nav>
          <div className="cr-pill-end"><Link href="/#pricing" className="cr-btn sm">Start learning</Link></div>
        </div>
      </header>
      <main className="gd">{children}</main>
      <div className="cr-foot">
        <SiteFooter />
        <p className="cr-made">Made and taught by Pritam, Kolkata, India. <Link href="/learn-bengali">How to learn Bengali</Link> · <Link href="/bengali-alphabet">Bengali alphabet</Link> · <Link href="/bengali-numbers">Bengali numbers</Link></p>
      </div>
    </div>
  );
}
