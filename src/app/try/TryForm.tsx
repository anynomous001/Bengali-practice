"use client";

import { useActionState } from "react";
import { requestPreview } from "../actions";

export default function TryForm() {
  const [state, action, pending] = useActionState(requestPreview, undefined);
  return (
    <form action={action} className="stack">
      <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
      <button className="btn" disabled={pending}>{pending ? "Sending…" : "Email me a sign-in link"}</button>
      {state && <p className={"msg " + (state.ok ? "good" : "bad")} role="status">{state.message}</p>}
    </form>
  );
}
