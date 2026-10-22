import Link from "next/link";
import JsonLd from "../JsonLd";
import { PREPLY_URL, SITE_URL } from "@/lib/site";

export function Crumbs({ name, path }: { name: string; path: string }) {
  return (
    <>
      <nav className="gd-crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> › <span>{name}</span></nav>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Bengali Practice", item: SITE_URL },
        { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
      ] }} />
    </>
  );
}

/** The closing call to action: practice here, or book a live lesson. */
export function GuideCta() {
  return (
    <section className="gd-cta gd-end">
      <h2>Practice it every day, in ten minutes</h2>
      <p>Bengali Practice has the alphabet, vowel signs, vocabulary, grammar, role plays and a writing pad, with audio and flashcards. Try a letter for free, no sign-up.</p>
      <div className="cr-cta">
        <Link className="cr-btn on-dark" href="/#try">Try a letter</Link>
        <Link className="cr-btn ghost-dark" href="/#pricing">See pricing</Link>
      </div>
      <p className="cr-fine-dark" style={{ marginTop: 18 }}>Want a live teacher too? <a href={PREPLY_URL} target="_blank" rel="noopener" style={{ color: "#fff" }}>Book Pritam on Preply</a>.</p>
    </section>
  );
}
