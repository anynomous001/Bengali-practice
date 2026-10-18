"use client";

import { useActionState, useState } from "react";
import { saveReview } from "./actions";

const WORDS = ["Not helpful", "A little helpful", "Helpful", "Very helpful", "Extremely helpful"];

export default function ReviewForm({ rating: initial, comment }: { rating: number; comment: string }) {
  const [state, action, pending] = useActionState(saveReview, undefined);
  const [rating, setRating] = useState(initial);
  return (
    <form action={action} className="stack card-static fb-page-form">
      <fieldset className="rate-field">
        <legend>How helpful is this website for your Bengali?</legend>
        <div className="rate-stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className={"rate-star" + (n <= rating ? " on" : "")}>
              <input type="radio" name="rating" value={n} checked={rating === n} onChange={() => setRating(n)} required />
              <span aria-hidden>★</span>
              <span className="visually-hidden">{n} of 5, {WORDS[n - 1]}</span>
            </label>
          ))}
        </div>
        <p className="muted rate-word" aria-live="polite">{rating ? WORDS[rating - 1] : "Tap a star"}</p>
      </fieldset>
      <label>Anything you would like to add? (optional)
        <textarea name="comment" rows={3} maxLength={1000} defaultValue={comment} placeholder="What helps you most, or what would make it more helpful?" />
      </label>
      <button className="btn" disabled={pending || !rating}>{pending ? "Saving…" : initial ? "Update my review" : "Send my review"}</button>
      {state && <p className={"msg " + (state.ok ? "good" : "bad")} role="status">{state.message}</p>}
    </form>
  );
}
