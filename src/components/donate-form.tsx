"use client";

import { Check, ChevronLeft, ChevronRight, Heart, Loader2, ShieldCheck } from "lucide-react";
import { useActionState, useState } from "react";
import { startDonation } from "@/app/actions";
import { programmes } from "@/lib/content";
import { initialFormState } from "@/lib/form-state";
import { FormError, Honeypot } from "./form-fields";

const usdPresets = [10, 25, 50, 100, 250];
const kesPresets = [500, 1000, 2500, 5000, 10000];

export function DonateForm({ defaultProgramme = "support-a-child" }: { defaultProgramme?: string }) {
  const [state, formAction, pending] = useActionState(startDonation, initialFormState);

  // Steps: 1 = AMOUNT, 2 = DETAILS, 3 = CONFIRM
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Amount & purpose
  const [currency, setCurrency] = useState<"USD" | "KES">("USD");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [preset, setPreset] = useState<number | null>(10);
  const [custom, setCustom] = useState("");
  const [programme, setProgramme] = useState(defaultProgramme);

  // Step 2: Donor details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stepErrors, setStepErrors] = useState<{ amount?: string; name?: string; email?: string }>({});

  const amount = preset ?? (Number(custom) || 0);

  const formattedAmount =
    currency === "USD" ? `$${amount}` : `KES ${amount.toLocaleString("en-KE")}`;

  const purposeTitle =
    programme === "support-a-child"
      ? "Support a child"
      : programme === "where-needed"
      ? "Where it's needed most"
      : programmes.find((p) => p.slug === programme)?.title || programme;

  // Validation before step transitions
  function validateStep1() {
    const minAmount = currency === "USD" ? 1 : 100;
    if (!amount || amount < minAmount) {
      setStepErrors((prev) => ({
        ...prev,
        amount: `Please enter an amount of at least ${currency === "USD" ? "$1" : "KES 100"}.`,
      }));
      return false;
    }
    setStepErrors((prev) => ({ ...prev, amount: undefined }));
    return true;
  }

  function validateStep2() {
    const errors: { name?: string; email?: string } = {};
    if (!name.trim()) errors.name = "Please tell us your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    setStepErrors((prev) => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  }

  function handleReset() {
    setCurrentStep(1);
    setName("");
    setEmail("");
    setPreset(currency === "USD" ? 10 : 2500);
    setCustom("");
    setStepErrors({});
    if (state.status === "success") {
      state.status = "idle";
      state.message = "";
    }
  }

  // If donation action succeeded (confirmation shown as in the 4th screenshot)
  if (state.status === "success") {
    const firstName = (state.values?.name || name).split(" ")[0];
    const displayAmount = state.values?.formattedAmount || formattedAmount;
    const displayFreq = (state.values?.frequency || frequency) === "monthly" ? "monthly" : "one-time";
    const displayPurpose = state.values?.purposeTitle || purposeTitle;
    const displayEmail = state.values?.email || email;

    return (
      <div className="flex flex-col items-center py-6 text-center animate-modal-in">
        {/* Soft circle checkmark */}
        <div className="flex size-14 items-center justify-center rounded-full bg-[#f2e6d8] text-[#8e4a1a]">
          <Check className="size-6 stroke-[2.5]" />
        </div>

        <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-cocoa-900 sm:text-4xl">
          Asante sana, {firstName}.
        </h3>

        <p className="mt-4 max-w-md text-base leading-relaxed text-cocoa-800">
          Your {displayFreq} {displayAmount} gift toward{" "}
          <span className="font-semibold text-cocoa-900">{displayPurpose}</span> has been recorded. A
          confirmation has been sent to <span className="font-semibold text-cocoa-900">{displayEmail}</span>.
        </p>

        <p className="mt-4 max-w-md text-xs leading-relaxed text-muted">
          To complete your payment, our team will reach out with secure options (card / M-Pesa / bank
          transfer). Thank you for turning creativity into opportunity.
        </p>

        <button
          type="button"
          onClick={handleReset}
          className="mt-8 inline-flex items-center justify-center rounded-full border border-sand-200 bg-white px-6 py-2.5 text-sm font-semibold text-cocoa-900 transition-colors hover:border-mustard-500 hover:bg-mustard-50"
        >
          Make another gift
        </button>
      </div>
    );
  }

  const steps = [
    { num: 1, label: "AMOUNT" },
    { num: 2, label: "DETAILS" },
    { num: 3, label: "CONFIRM" },
  ];

  return (
    <form action={formAction} className="relative grid gap-6" noValidate>
      <Honeypot />
      {/* Hidden inputs to pass full state to server action */}
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="frequency" value={frequency} />
      <input type="hidden" name="programme" value={programme} />
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="email" value={email} />

      {/* STEP INDICATOR HEADER (matching screenshot with 1 AMOUNT - 2 DETAILS - 3 CONFIRM) */}
      <div className="flex items-center justify-between px-2 pt-1 pb-4">
        {steps.map((s, idx) => {
          const isActive = currentStep === s.num;
          const isDone = currentStep > s.num;

          return (
            <div key={s.num} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => {
                  if (s.num === 1) setCurrentStep(1);
                  else if (s.num === 2 && validateStep1()) setCurrentStep(2);
                  else if (s.num === 3 && validateStep1() && validateStep2()) setCurrentStep(3);
                }}
                className="group flex items-center gap-2 text-left focus:outline-none"
              >
                <span
                  className={`flex size-6 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isActive || isDone
                      ? "bg-mustard-500 text-cocoa-900 font-extrabold"
                      : "border border-sand-200 bg-sand-100 text-cocoa-700"
                  }`}
                >
                  {s.num}
                </span>
                <span
                  className={`text-[0.72rem] font-bold tracking-wider uppercase sm:text-xs ${
                    isActive ? "text-cocoa-900" : isDone ? "text-cocoa-800" : "text-muted"
                  }`}
                >
                  {s.label}
                </span>
              </button>

              {idx < steps.length - 1 && (
                <div
                  className={`mx-3 h-0.5 flex-1 transition-colors ${
                    currentStep > s.num ? "bg-mustard-500" : "bg-sand-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ======================= STEP 1: AMOUNT ======================= */}
      {currentStep === 1 && (
        <div className="grid gap-6 animate-modal-in">
          {/* Frequency & Currency selectors */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              className="grid grid-cols-2 rounded-full bg-sand-100 p-1"
              role="radiogroup"
              aria-label="Donation frequency"
            >
              {(["once", "monthly"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={frequency === option}
                  onClick={() => setFrequency(option)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold sm:text-sm transition-colors ${
                    frequency === option ? "bg-cocoa-900 text-cream-50" : "text-cocoa-800"
                  }`}
                >
                  {option === "once" ? "Give once" : "Give monthly"}
                </button>
              ))}
            </div>

            <div
              className="flex rounded-full border border-sand-200 bg-sand-100 p-0.5"
              role="radiogroup"
              aria-label="Currency"
            >
              {(["USD", "KES"] as const).map((cur) => (
                <button
                  key={cur}
                  type="button"
                  role="radio"
                  aria-checked={currency === cur}
                  onClick={() => {
                    setCurrency(cur);
                    setPreset(cur === "USD" ? 10 : 2500);
                    setCustom("");
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                    currency === cur ? "bg-mustard-500 text-cocoa-900 shadow-sm" : "text-cocoa-700"
                  }`}
                >
                  {cur === "USD" ? "USD ($)" : "KES (KSh)"}
                </button>
              ))}
            </div>
          </div>

          {/* Amount buttons */}
          <fieldset>
            <legend className="text-sm font-semibold text-cocoa-900">
              Amount ({currency === "USD" ? "USD $" : "KES"})
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {(currency === "USD" ? usdPresets : kesPresets).map((val) => (
                <button
                  key={val}
                  type="button"
                  aria-pressed={preset === val}
                  onClick={() => {
                    setPreset(val);
                    setCustom("");
                    setStepErrors((prev) => ({ ...prev, amount: undefined }));
                  }}
                  className={`rounded-xl border py-3 text-sm font-bold transition-colors ${
                    preset === val
                      ? "border-mustard-500 bg-mustard-500 text-cocoa-900 shadow-sm"
                      : "border-sand-200 bg-cream-50 text-cocoa-800 hover:border-mustard-500"
                  }`}
                >
                  {currency === "USD" ? `$${val}` : val.toLocaleString("en-KE")}
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
                  setStepErrors((prev) => ({ ...prev, amount: undefined }));
                }}
                className={`rounded-xl border bg-cream-50 px-3 py-3 text-center text-sm font-bold focus:border-mustard-500 focus:outline-none ${
                  preset === null && custom ? "border-mustard-500" : "border-sand-200"
                }`}
              />
            </div>
            {stepErrors.amount && <p className="mt-2 text-sm text-red-700">{stepErrors.amount}</p>}
          </fieldset>

          {/* Purpose */}
          <div>
            <label htmlFor="field-programme" className="text-sm font-semibold text-cocoa-900">
              Direct my gift to
            </label>
            <select
              id="field-programme"
              value={programme}
              onChange={(e) => setProgramme(e.target.value)}
              className="mt-2 block w-full rounded-xl border border-sand-200 bg-cream-50 px-4 py-3 text-[0.95rem] text-cocoa-900 focus:border-mustard-500 focus:outline-none"
            >
              <option value="support-a-child">Support a child</option>
              <option value="where-needed">Where it&apos;s needed most</option>
              {programmes.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              if (validateStep1()) setCurrentStep(2);
            }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-mustard-500 py-3.5 text-sm font-bold text-cocoa-900 shadow-md transition-transform hover:bg-mustard-400 active:scale-[0.99]"
          >
            Continue to Details
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}

      {/* ======================= STEP 2: DETAILS ======================= */}
      {currentStep === 2 && (
        <div className="grid gap-5 animate-modal-in">
          <div>
            <label htmlFor="donor-name" className="text-sm font-semibold text-cocoa-900">
              Full name <span className="text-red-600">*</span>
            </label>
            <input
              id="donor-name"
              type="text"
              required
              autoComplete="name"
              placeholder="e.g. Vicky Jeruto"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setStepErrors((prev) => ({ ...prev, name: undefined }));
              }}
              className={`mt-2 block w-full rounded-xl border bg-cream-50 px-4 py-3 text-[0.95rem] text-cocoa-900 focus:border-mustard-500 focus:outline-none ${
                stepErrors.name ? "border-red-400" : "border-sand-200"
              }`}
            />
            {stepErrors.name && <p className="mt-1.5 text-sm text-red-700">{stepErrors.name}</p>}
          </div>

          <div>
            <label htmlFor="donor-email" className="text-sm font-semibold text-cocoa-900">
              Email address <span className="text-red-600">*</span>
            </label>
            <input
              id="donor-email"
              type="email"
              required
              autoComplete="email"
              placeholder="vicky@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStepErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={`mt-2 block w-full rounded-xl border bg-cream-50 px-4 py-3 text-[0.95rem] text-cocoa-900 focus:border-mustard-500 focus:outline-none ${
                stepErrors.email ? "border-red-400" : "border-sand-200"
              }`}
            />
            {stepErrors.email && <p className="mt-1.5 text-sm text-red-700">{stepErrors.email}</p>}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex items-center justify-center gap-1.5 rounded-full border border-sand-200 bg-white px-5 py-3 text-sm font-semibold text-cocoa-900 transition-colors hover:bg-sand-100"
            >
              <ChevronLeft className="size-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                if (validateStep2()) setCurrentStep(3);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-mustard-500 py-3 text-sm font-bold text-cocoa-900 shadow-md transition-transform hover:bg-mustard-400 active:scale-[0.99]"
            >
              Review & Confirm
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================= STEP 3: CONFIRM (matching screenshot 3) ======================= */}
      {currentStep === 3 && (
        <div className="grid gap-6 animate-modal-in">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-cocoa-900">
              Confirm your gift
            </h3>
          </div>

          {/* Summary table */}
          <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
            <div className="flex items-center justify-between border-b border-sand-200/70 px-5 py-3.5 text-sm">
              <span className="text-muted">Amount</span>
              <span className="font-bold text-cocoa-900">
                {formattedAmount} / {frequency === "monthly" ? "monthly" : "one-time"}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-sand-200/70 px-5 py-3.5 text-sm">
              <span className="text-muted">Purpose</span>
              <span className="font-bold text-cocoa-900">{purposeTitle}</span>
            </div>

            <div className="flex items-center justify-between border-b border-sand-200/70 px-5 py-3.5 text-sm">
              <span className="text-muted">Name</span>
              <span className="font-bold text-cocoa-900">{name}</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5 text-sm">
              <span className="text-muted">Email</span>
              <span className="font-bold text-cocoa-900 truncate max-w-[180px] sm:max-w-none">
                {email}
              </span>
            </div>
          </div>

          {/* Security note with shield */}
          <div className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-mustard-600" />
            <p>
              Your details are securely stored. A Nafsi team member will follow up with secure payment
              options (card, M-Pesa or bank transfer). You will receive a confirmation email.
            </p>
          </div>

          <FormError state={state} />

          {/* Action buttons matching screenshot: [Back] [Give $10] */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex items-center justify-center gap-1.5 rounded-full border border-sand-200 bg-white px-5 py-3 text-sm font-semibold text-cocoa-900 transition-colors hover:bg-sand-100"
            >
              <ChevronLeft className="size-4" />
              Back
            </button>

            <button
              type="submit"
              disabled={pending}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-mustard-500 py-3.5 text-sm font-bold text-cocoa-900 shadow-md transition-transform hover:bg-mustard-400 active:scale-[0.99] disabled:opacity-50"
            >
              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Heart className="size-4 fill-current" />
              )}
              Give {formattedAmount}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
