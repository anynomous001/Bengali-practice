"use client";

import { useActionState } from "react";
import { sendFeedback } from "./actions";
import { FEEDBACK_KINDS } from "./kinds";

export default function FeedbackForm() {
  const [state, action, pending] = useActionState(sendFeedback, undefined);
  return (
    <form action={action} className="stack card-static fb-page-form">
      <label>What is it about?
        <select name="kind" defaultValue={FEEDBACK_KINDS[0]}>{FEEDBACK_KINDS.map((k) => <option key={k}>{k}</option>)}</select>
      </label>
      <label>Your message
        <textarea name="message" rows={6} maxLength={2000} required placeholder="Say it in your own words. If it is about a page or lesson, mention which one." />
      </label>
      <button className="btn" disabled={pending}>{pending ? "Sending…" : "Send feedback"}</button>
      {state && <p className={"msg " + (state.ok ? "good" : "bad")} role="status">{state.message}</p>}
    </form>
  );
}
