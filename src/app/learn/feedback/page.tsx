import { requireAccess } from "@/lib/access";
import { query } from "@/lib/db";
import FeedbackForm from "./FeedbackForm";
import ReviewForm from "./ReviewForm";

const fmt = (d: Date) => d.toLocaleDateString("en-GB", { dateStyle: "medium" });

export default async function FeedbackPage() {
  const user = await requireAccess();
  const mine = await query<{ id: number; topic: string; message: string; resolved: boolean; created_at: Date }>(
    "SELECT id, topic, message, resolved, created_at FROM feedback WHERE email = $1 AND area = 'app' ORDER BY created_at DESC LIMIT 10",
    [user.email],
  );
  const review = (await query<{ rating: number; comment: string }>("SELECT rating, comment FROM reviews WHERE email = $1", [user.email]))[0];
  return (
    <main className="wide">
      <header>
        <p className="eyebrow">Feedback</p>
        <h1>Tell your teacher what you think</h1>
        <p className="lede">An idea for a new feature, something that is not working, a mistake in a lesson, or just what helps you. It goes straight to your teacher.</p>
      </header>
      <h2>Review this website</h2>
      <ReviewForm rating={review?.rating ?? 0} comment={review?.comment ?? ""} />
      <h2>Send a message</h2>
      <FeedbackForm />
      {mine.length > 0 && (
        <>
          <h2>Your earlier messages</h2>
          <div className="list">
            {mine.map((f) => (
              <div key={f.id} className="row">
                <span><b>{f.topic}</b> <span className="muted">· {fmt(f.created_at)}{f.resolved ? " · marked done by your teacher" : ""}</span><br />{f.message}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
