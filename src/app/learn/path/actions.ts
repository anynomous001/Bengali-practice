"use server";

import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { getGoal } from "@/data/paths";

/** Saves the goal and the answer to "can you read Bengali letters?". Only these two small facts are stored. */
export async function choosePath(fd: FormData) {
  const user = await getUser();
  if (!user?.hasAccess) redirect("/login");
  const goal = String(fd.get("goal") ?? "");
  const reads = String(fd.get("reads") ?? "no");
  if (!getGoal(goal)) redirect("/learn/path");
  await query(
    `INSERT INTO student_path (email, goal, reads) VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET goal = EXCLUDED.goal, reads = EXCLUDED.reads, updated_at = now()`,
    [user.email, goal, ["no", "little", "yes"].includes(reads) ? reads : "no"],
  );
  redirect("/learn/path");
}
