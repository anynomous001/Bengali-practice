import Link from "next/link";
import { redirect } from "next/navigation";
import { COURSES, allLessons } from "@/data/curriculum";
import { PREVIEW_LESSONS } from "@/data/preview";
import { getUser } from "@/lib/auth";
import Icon from "../Icon";

/** Where a free preview account lands when it opens a lesson that is part of the full course. */
export default async function LockedPage() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (user.hasAccess) redirect("/learn");
  const open = COURSES.flatMap((c) => allLessons(c)).filter((l) => PREVIEW_LESSONS.includes(l.id));
  return (
    <main className="course">
      <p className="eyebrow"><Icon name="lock" size={14} /> Full course</p>
      <h1>This lesson is in the full course</h1>
      <p className="lede">The free preview opens a few sample lessons so you can see how the practice works. The rest of the course, with every lesson, quiz and exam, opens when you get access.</p>
      <p><Link href="/buy" className="btn">Unlock everything</Link> <Link href="/learn" className="btn ghost">Back to my lessons</Link></p>
      <h2>Open in the preview</h2>
      <ul className="pv-list">
        {open.map((l) => (<li key={l.id}><Link href={l.href}><b>{l.title}</b><small>{l.blurb}</small></Link></li>))}
      </ul>
    </main>
  );
}
