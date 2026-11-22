"use client";

import { useState } from "react";
import type { PickerGroup } from "@/lib/lesson-picker";
import { retagFile } from "../actions";
import LessonPicker from "./LessonPicker";

/** Change which lessons one PDF appears in. */
export default function RetagForm({ id, groups, initial }: { id: number; groups: PickerGroup[]; initial: string[] }) {
  const [lessons, setLessons] = useState(initial);
  return (
    <form action={retagFile} className="stack-form">
      <input type="hidden" name="id" value={id} />
      <LessonPicker groups={groups} value={lessons} onChange={setLessons} name="lesson" />
      <button className="btn small" disabled={!lessons.length}>Save lessons</button>
    </form>
  );
}
