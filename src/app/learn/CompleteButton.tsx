"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLessonDone } from "../actions";
import Icon from "./Icon";

/** "Complete and continue" / "Next lesson" footer actions for a lesson. */
export default function CompleteButton({ lessonId, done, nextHref, courseHref }: { lessonId: string; done: boolean; nextHref: string | null; courseHref: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const toggle = (value: boolean, go?: string) =>
    start(async () => {
      await setLessonDone(lessonId, value);
      if (go) router.push(go);
      else router.refresh();
    });

  if (!done) {
    return (
      <button type="button" className="btn" disabled={pending} onClick={() => toggle(true, nextHref ?? courseHref)}>
        <Icon name="done" size={18} />{pending ? "Saving…" : nextHref ? "Complete and continue" : "Complete lesson"}
      </button>
    );
  }
  return (
    <div className="done-actions">
      <span className="done-badge"><Icon name="done" size={18} />Completed</span>
      {nextHref ? <Link href={nextHref} className="btn">Next lesson<Icon name="next" size={18} /></Link> : <Link href={courseHref} className="btn">Back to course</Link>}
      <button type="button" className="textbtn" disabled={pending} onClick={() => toggle(false)}>Mark incomplete</button>
    </div>
  );
}
