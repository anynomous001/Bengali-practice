"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** A thin bar with the way in, shown on phones once the visitor has scrolled past the top. */
export default function StickyCta({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const pricing = document.getElementById("pricing")?.getBoundingClientRect();
      const atPricing = !!pricing && pricing.top < window.innerHeight && pricing.bottom > 0;
      setShow(window.scrollY > 500 && !atPricing);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={"sticky-cta" + (show ? " on" : "")} aria-hidden={!show}>
      <Link className="btn" href="/buy" tabIndex={show ? 0 : -1}>{label}</Link>
    </div>
  );
}
