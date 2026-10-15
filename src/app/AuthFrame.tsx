import Logo from "./Logo";
import Link from "next/link";
import Icon from "./learn/Icon";

/** Split-screen frame for sign-in, purchase and other account pages. */
export default function AuthFrame({ children, back = true, wide = false }: { children: React.ReactNode; back?: boolean; wide?: boolean }) {
  return (
    <div className="auth">
      <aside className="auth-aside">
        <Link href="/" className="side-brand on-dark">
          <Logo />
          <span><b>Shikhi</b><small lang="bn">শিখি</small></span>
        </Link>
        <div className="auth-quote">
          <p className="glyph" lang="bn" aria-hidden>অ আ ক খ</p>
          <p className="auth-line">Read it. Say it. Write it.</p>
          <p className="auth-sub">Learn Bengali with your teacher.</p>
        </div>
        <p className="auth-foot">Kolkata · Bengali for English speakers</p>
      </aside>
      <main className={"auth-main" + (wide ? " wide" : "")}>
        <div className="auth-card">
          {back && <Link href="/" className="back"><Icon name="prev" size={16} />Home</Link>}
          {children}
        </div>
      </main>
    </div>
  );
}
