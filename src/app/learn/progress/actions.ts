"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { GOALS } from "@/lib/points";

/** Saves the daily goal, the name shown on the class board, and the reminder choice. */
export async function saveSettings(fd: FormData) {
  const user = await getUser();
  if (!user?.hasAccess) return;
  const goal = Number(fd.get("goal"));
  const goalOk = GOALS.some((g) => g.id === goal) ? goal : 40;
  const name = String(fd.get("name") ?? "").replace(/\s+/g, " ").trim().slice(0, 24);
  const remind = fd.get("remind") === "on";
  await query(
    `INSERT INTO student_settings (email, daily_goal, display_name, remind) VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO UPDATE SET daily_goal = $2, display_name = $3, remind = $4`,
    [user.email, goalOk, name || null, remind],
  );
  revalidatePath("/learn", "layout");
}
