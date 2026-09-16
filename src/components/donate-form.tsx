"use client";

import { Heart, Lock } from "lucide-react";
import { useActionState, useState } from "react";
import { startDonation } from "@/app/actions";
import { donationAmounts, programmes } from "@/lib/content";
import { initialFormState } from "@/lib/form-state";
import { Field, FormError, FormSuccess, Honeypot, SubmitButton } from "./form-fields";

export function DonateForm({ defaultProgramme = "where-needed" }: { defaultProgramme?: string }) {
  const [state, formAction, pending] = useActionState(startDonation, initialFormState);
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [preset, setPreset] = useState<number | null>(2500);
  const [custom, setCustom] = useState("");
  const amount = preset ?? (Number(custom) || 0);

  if (state.status === "success") return <FormSuccess state={state} />;

  return (
    <form action={formAction} className="relative grid gap-6" noValidate>
      <Honeypot />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="frequency" value={frequency} />

      <div className="grid grid-cols-2 rounded-full bg-sand-100 p-1" role="radiogroup" aria-label="Donation frequency">
        {(["once", "monthly"] as const).map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={frequency === option}
            onClick={() => setFrequency(option)}
            className={`rounded-full py-2.5 text-sm font-semibold transition-colors ${
              frequency === option ? "bg-cocoa-900 text-cream-50" : "text-cocoa-800"
            }`}
          >
            {option === "once" ? "Give once" : "Give monthly"}
          </button>
        ))}
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-cocoa-900">Amount (KES)</legend>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {donationAmounts.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={preset === value}
              onClick={() => {
                setPreset(value);
                setCustom("");
              }}
              className={`rounded-xl border py-3 text-sm font-bold transition-colors ${
                preset === value
                  ? "border-mustard-500 bg-mustard-500 text-cocoa-900"
                  : "border-sand-200 bg-cream-50 text-cocoa-800 hover:border-mustard-500"
              }`}
            >
              {value.toLocaleString("en-KE")}
            </button>
          ))}
          <label className="sr-only" htmlFor="custom-amount">
            Other amount
          </label>
          <input
            id="custom-amount"
            inputMode="numeric"
            placeholder="Other"
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value.replace(/[^\d]/g, ""));
              setPreset(null);
            }}
            className={`rounded-xl border bg-cream-50 px-3 py-3 text-center text-sm font-bold focus:border-mustard-500 focus:outline-none ${
              preset === null && custom ? "border-mustard-500" : "border-sand-200"
            }`}
          />
        </div>
        {state.errors?.amount && <p className="mt-2 text-sm text-red-700">{state.errors.amount}</p>}
      </fieldset>

      <div>
        <label htmlFor="field-programme" className="text-sm font-semibold text-cocoa-900">
          Direct my gift to
        </label>
        <select
          id="field-programme"
          name="programme"
          defaultValue={state.values?.programme ?? defaultProgramme}
          className="mt-2 block w-full rounded-xl border border-sand-200 bg-cream-50 px-4 py-3 text-[0.95rem] focus:border-mustard-500 focus:outline-none"
        >
          <option value="where-needed">Where it&apos;s needed most</option>
          {programmes.map((programme) => (
            <option key={programme.slug} value={programme.slug}>
              {programme.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" state={state} required autoComplete="name" />
        <Field label="Email" name="email" type="email" state={state} required autoComplete="email" />
      </div>

      <FormError state={state} />
      <SubmitButton pending={pending}>
        <Heart className="size-4" />
        {amount > 0 ? `Donate KES ${amount.toLocaleString("en-KE")}${frequency === "monthly" ? " / month" : ""}` : "Donate"}
      </SubmitButton>
      <p className="flex items-center justify-center gap-2 text-xs text-muted">
        <Lock className="size-3.5" />
        Secure checkout with M-Pesa or card via Paystack
      </p>
    </form>
  );
}
