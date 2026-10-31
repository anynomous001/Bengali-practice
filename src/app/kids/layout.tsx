import type { Metadata } from "next";
import { cookies } from "next/headers";
import { requireAccess } from "@/lib/access";
import KidsShell from "./KidsShell";
import "./kids.css";

export const metadata: Metadata = { title: "ছোটদের · Kids", robots: { index: false } };

export default async function KidsLayout({ children }: { children: React.ReactNode }) {
  await requireAccess();
  const english = (await cookies()).get("bp_kids_en")?.value !== "0";
  return <KidsShell initialEnglish={english}>{children}</KidsShell>;
}
