"use client";

import { ArrowRight, CircleCheck, Loader2 } from "lucide-react";
import { useActionState } from "react";
import { subscribeToNewsletter } from "@/app/actions";
import { initialFormState } from "@/lib/form-state";
import { Honeypot } from "./form-fields";
import { buttonClass } from "./ui";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialFormState);

  if (state.status === "success") {
    return (
      <p role="status" className="flex items-center gap-3 rounded-2xl bg-cream-50/5 p-5 text-cream-50">
        <CircleCheck className="size-6 shrink-0 text-mustard-500" />
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="relative grid gap-3">
      <Honeypot />
      <label htmlFor="newsletter-email" className="sr-only">
        Your email
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Your email"
        defaultValue={state.values?.email}
        className="w-full rounded-full border border-cream-50/15 bg-cream-50/5 px-5 py-3.5 text-cream-50 placeholder:text-cream-50/45 focus:border-mustard-500 focus:outline-none"
      />
      <label className="flex items-start gap-2.5 text-xs text-cream-50/60">
        <input type="checkbox" name="consent" required className="mt-0.5 size-4 accent-mustard-500" />
        I agree to receive updates from Nafsi Africa and accept the privacy policy.
      </label>
      {state.status === "error" && (
        <p role="alert" className="text-sm text-mustard-400">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${buttonClass("primary", "lg")} w-full`}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : null}
        Subscribe
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
