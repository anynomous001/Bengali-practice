"use client";

import { useActionState } from "react";
import { requestLogin } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(requestLogin, undefined);
  return (
    <form action={action} className="stack">
      <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
      <button className="btn" disabled={pending}>{pending ? "Sending…" : "Email me a link"}</button>
      {state && <p className={"msg " + (state.ok ? "good" : "bad")} role="status">{state.message}</p>}
    </form>
  );
}
