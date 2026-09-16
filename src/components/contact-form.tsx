"use client";

import { Send } from "lucide-react";
import { useActionState, useState } from "react";
import { sendContactMessage } from "@/app/actions";
import { initialFormState } from "@/lib/form-state";
import { Field, FormError, FormSuccess, Honeypot, SubmitButton } from "./form-fields";

const interests = ["General", "Volunteer", "Partnership", "Sponsorship", "Booking"];

export function ContactForm({ title = "Send a message", showInterests = false }: { title?: string; showInterests?: boolean }) {
  // Remounting with a new key gives a fresh form after a successful send.
  const [formKey, setFormKey] = useState(0);
  return <ContactFormInner key={formKey} title={title} showInterests={showInterests} onReset={() => setFormKey((k) => k + 1)} />;
}

function ContactFormInner({ title, showInterests, onReset }: { title: string; showInterests: boolean; onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialFormState);
  const [interest, setInterest] = useState(interests[0]);

  return (
    <div className="rounded-3xl border border-sand-200 bg-white p-6 shadow-xl shadow-cocoa-900/5 sm:p-8">
      {state.status === "success" ? (
        <FormSuccess state={state} onReset={onReset} />
      ) : (
        <form action={formAction} className="relative grid gap-5" noValidate>
          <Honeypot />
          {showInterests ? (
            <fieldset>
              <legend className="text-sm font-semibold text-cocoa-900">I want to…</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {interests.map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-mustard-500 ${
                      interest === option ? "bg-mustard-500 text-cocoa-900" : "bg-sand-100 text-cocoa-800 hover:bg-sand-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="interest"
                      value={option}
                      checked={interest === option}
                      onChange={() => setInterest(option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
          ) : (
            <h3 className="font-display text-xl font-bold text-cocoa-900">{title}</h3>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" name="name" state={state} required autoComplete="name" />
            <Field label="Email" name="email" type="email" state={state} required autoComplete="email" />
            <Field label="Phone" name="phone" type="tel" state={state} autoComplete="tel" />
            <Field label="Organization" name="organization" state={state} autoComplete="organization" />
          </div>
          <Field label="Message" name="message" state={state} required textarea placeholder="Tell us how you'd like to get involved…" />
          <FormError state={state} />
          <SubmitButton pending={pending}>
            <Send className="size-4" />
            Send message
          </SubmitButton>
        </form>
      )}
    </div>
  );
}
