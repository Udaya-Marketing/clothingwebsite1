"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type NewsletterState } from "@/app/actions";

const initialState: NewsletterState = { message: "", success: false };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  return (
    <form action={formAction} className="newsletter-form">
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <div className="newsletter-input">
        <input autoComplete="email" id="newsletter-email" name="email" placeholder="Your email address" required type="email" />
        <button aria-label="Subscribe to studio notes" disabled={pending} type="submit">
          {pending ? "Sending…" : "Join us"} <span aria-hidden="true">↗</span>
        </button>
      </div>
      <label className="consent-label">
        <input name="consent" required type="checkbox" />
        <span>I agree to receive occasional notes from the studio.</span>
      </label>
      <p aria-live="polite" className={state.success ? "form-message is-success" : "form-message"}>
        {state.message}
      </p>
    </form>
  );
}
