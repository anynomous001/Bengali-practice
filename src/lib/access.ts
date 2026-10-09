import { redirect } from "next/navigation";
import { getUser, type User } from "./auth";

/**
 * Call at the top of every page that serves lessons. Layouts are not re-run on
 * client-side navigation, so the check must live in each page, next to the data.
 */
export async function requireAccess(): Promise<User> {
  const user = await getUser();
  if (!user) redirect("/login");
  if (!user.hasAccess) redirect("/access-ended");
  return user;
}
