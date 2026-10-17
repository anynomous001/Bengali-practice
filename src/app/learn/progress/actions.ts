"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { GOALS } from "@/lib/points";

/** Saves the daily goal, the name shown on the class board, and the reminder choice. */
export type SaveState = { ok: boolean; message: string; n: number } | undefined;

export async function saveSettings(_prev: SaveState, fd: FormData): Promise<SaveState> {
  const n = Date.now();
  const user = await getUser();
  if (!user?.hasAccess) return { ok: false, message: "Please sign in again.", n };
  const goal = Number(fd.get("goal"));
  const goalOk = GOALS.some((g) => g.id === goal) ? goal : 40;
  const name = String(fd.get("name") ?? "").replace(/\s+/g, " ").trim().slice(0, 24);
  const remind = fd.get("remind") === "on";
  const showBoard = fd.get("showBoard") === "on";
  await query(
    `INSERT INTO student_settings (email, daily_goal, display_name, remind, show_board) VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO UPDATE SET daily_goal = $2, display_name = $3, remind = $4, show_board = $5`,
    [user.email, goalOk, name || null, remind, showBoard],
  );
  revalidatePath("/learn", "layout");
  return { ok: true, message: "Saved. Your settings are updated.", n };
}
