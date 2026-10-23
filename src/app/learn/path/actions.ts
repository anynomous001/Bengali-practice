"use server";

import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { getGoal } from "@/data/paths";

const MAX_GOALS = 4;

/** Saves the goals (one to four) and the answer to "can you read Bengali letters?". Only these small facts are stored. */
export async function choosePath(fd: FormData) {
  const user = await getUser();
  if (!user?.hasAccess) redirect("/login");
  const goals = [...new Set(fd.getAll("goal").map(String))].filter((g) => getGoal(g)).slice(0, MAX_GOALS);
  const reads = String(fd.get("reads") ?? "no");
  if (!goals.length) redirect("/learn/path?change=1&need=1");
  await query(
    `INSERT INTO student_path (email, goal, reads) VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET goal = EXCLUDED.goal, reads = EXCLUDED.reads, updated_at = now()`,
    [user.email, goals[0], ["no", "little", "yes"].includes(reads) ? reads : "no"],
  );
  await query("DELETE FROM student_goals WHERE email = $1", [user.email]);
  for (const [i, g] of goals.entries()) await query("INSERT INTO student_goals (email, goal, position) VALUES ($1, $2, $3)", [user.email, g, i]);
  redirect("/learn/path");
}
