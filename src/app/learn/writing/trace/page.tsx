import Link from "next/link";
import { loadWriting } from "@/lib/progress";
import Trace from "./Trace";

export default async function TracePage() {
  return (
    <main>
      <p><Link href="/learn/writing">← Writing</Link></p>
      <h1>Trace letters</h1>
      <Trace initialCounts={await loadWriting()} />
    </main>
  );
}
