"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import { sendInvolvementRequest } from "@/app/actions";
import type { InvolvementType } from "@/lib/content";
import { initialFormState } from "@/lib/form-state";
import { Field, FormError, FormSuccess, Honeypot, SubmitButton } from "./form-fields";

const messagePrompts: Record<InvolvementType, string> = {
  volunteer: "Which skills would you like to share, and when are you available?",
  partner: "Tell us about your organization and the partnership you have in mind.",
  sponsor: "Which centre, trainer, cohort or tour would you like to sponsor?",
  "book-performance": "Tell us about your event: audience, venue and the kind of performance you'd like.",
  "book-studio": "What are you recording, and how many hours do you need?",
};

export function InvolveForm({ type }: { type: InvolvementType }) {
  const [state, formAction, pending] = useActionState(sendInvolvementRequest.bind(null, type), initialFormState);
  const isBooking = type === "book-performance" || type === "book-studio";

  return (
    <div className="rounded-3xl border border-sand-200 bg-white p-6 shadow-xl shadow-cocoa-900/5 sm:p-8">
      {state.status === "success" ? (
        <FormSuccess state={state} />
      ) : (
        <form action={formAction} className="relative grid gap-5" noValidate>
          <Honeypot />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" name="name" state={state} required autoComplete="name" />
            <Field label="Email" name="email" type="email" state={state} required autoComplete="email" />
            <Field label="Phone" name="phone" type="tel" state={state} autoComplete="tel" />
            <Field label="Organization" name="organization" state={state} autoComplete="organization" />
          </div>
          {isBooking && <Field label="Preferred date" name="date" type="date" state={state} />}
          <Field label="Message" name="message" state={state} required textarea placeholder={messagePrompts[type]} />
          <FormError state={state} />
          <SubmitButton pending={pending}>
            <Send className="size-4" />
            Send request
          </SubmitButton>
        </form>
      )}
    </div>
  );
}
