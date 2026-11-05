import Link from "next/link";
import Icon from "./Icon";

/** Shown to free preview accounts on every page: what they are in, and the way to the full course. */
export default function PreviewBanner() {
  return (
    <div className="preview-banner" role="note">
      <Icon name="lock" size={18} />
      <span><b>You are in the free preview.</b> A few sample lessons are open. The rest of the course is locked.</span>
      <Link href="/buy" className="btn small">Unlock everything</Link>
    </div>
  );
}
