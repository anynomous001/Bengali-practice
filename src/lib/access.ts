import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { previewAllows } from "@/data/preview";
import { getUser, type User } from "./auth";

/**
 * Call at the top of every page that serves lessons. Layouts are not re-run on
 * client-side navigation, so the check must live in each page, next to the data.
 */
export async function requireAccess(): Promise<User> {
  const user = await getUser();
  if (!user) redirect("/login");
  if (user.hasAccess) return user;
  if (user.preview) {
    const path = (await headers()).get("x-bp-path") ?? "";
    if (previewAllows(path)) return user;
    redirect(`/learn/locked?from=${encodeURIComponent(path)}`);
  }
  redirect("/access-ended");
}
