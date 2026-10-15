import Logo from "../Logo";
import Link from "next/link";
import { BUSINESS } from "@/data/business";
import Icon from "../learn/Icon";

export function SiteFooter() {
  return (
    <footer className="land-foot">
      <span>Shikhi <span lang="bn">শিখি</span></span>
      <nav className="foot-links" aria-label="Policies">
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/refunds">Refunds</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/login">Sign in</Link>
      </nav>
    </footer>
  );
}

/** Plain reading layout for public policy pages. */
export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="land legal">
      <header className="land-nav">
        <Link href="/" className="side-brand dark">
          <Logo />
          <span><b>Shikhi</b><small lang="bn">শিখি</small></span>
        </Link>
        <nav><Link href="/buy" className="btn small">Get access</Link></nav>
      </header>
      <main className="legal-body">
        <Link href="/" className="back"><Icon name="prev" size={16} />Home</Link>
        <h1>{title}</h1>
        <p className="muted">{BUSINESS.name === BUSINESS.product ? `${BUSINESS.product} is based in Kolkata, India.` : `${BUSINESS.product} is operated by ${BUSINESS.name}.`} Last updated {BUSINESS.updated}.</p>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
