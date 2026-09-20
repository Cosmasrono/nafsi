"use client";

import { Check, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Heart, Loader2, ShieldCheck } from "lucide-react";
import { useActionState, useState } from "react";
import { startDonation } from "@/app/actions";
import { initialFormState } from "@/lib/form-state";
import { FormError, Honeypot } from "./form-fields";

export const donationPurposes = [
  {
    slug: "where-needed",
    title: "General support",
    desc: "Where it's needed most",
  },
  {
    slug: "support-a-child",
    title: "Support a child",
    desc: "Safe spaces, training and mentorship",
  },
  {
    slug: "performing-arts",
    title: "Performing arts training",
    desc: "Dance, music, acrobatics, theatre",
  },
  {
    slug: "tangaza",
    title: "A youth digital-media trainee",
    desc: "Filmmaking, editing, storytelling",
  },
  {
    slug: "outreach",
    title: "Community outreach",
    desc: "Centres across Nairobi's settlements",
  },
  {
    slug: "naiwave",
    title: "NaiWave Studios",
    desc: "Youth podcast and online radio",
  },
  {
    slug: "equipment",
    title: "Equipment",
    desc: "Cameras, instruments, studio gear",
  },
];

const usdPresets = [10, 25, 50, 100, 250];
const eurPresets = [10, 25, 50, 100, 250];
const kesPresets = [1000, 2500, 5000, 10000, 25000];

function getImpactDescription(currency: "USD" | "EUR" | "KES", amount: number): string {
  if (currency === "USD" || currency === "EUR") {
    const sym = currency === "USD" ? "$" : "€";
    if (amount >= 250) return `${sym}250 helps sustain a trainer at a community centre.`;
    if (amount >= 100) return `${sym}100 supports a young person through a full workshop cycle.`;
    if (amount >= 50) return `${sym}50 can put a smartphone in the hands of a Tangaza trainee.`;
    if (amount >= 25) return `${sym}25 helps stock a community training session with materials.`;
    return `${sym}10 provides daily workshop materials and snacks for youth.`;
  }
  if (amount >= 25000) return "KES 25,000 helps sustain a trainer at a community centre.";
  if (amount >= 10000) return "KES 10,000 supports a young person through a full workshop cycle.";
  if (amount >= 5000) return "KES 5,000 can put a smartphone in the hands of a Tangaza trainee.";
  if (amount >= 2500) return "KES 2,500 helps stock a community training session with materials.";
  return "KES 1,000 provides daily workshop materials and snacks for youth.";
}

export function DonateForm({ defaultProgramme = "where-needed" }: { defaultProgramme?: string }) {
  const [state, formAction, pending] = useActionState(startDonation, initialFormState);

  // Steps: 1 = AMOUNT, 2 = DETAILS, 3 = CONFIRM
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Amount, currency, frequency, purpose
  const [currency, setCurrency] = useState<"USD" | "EUR" | "KES">("USD");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [preset, setPreset] = useState<number | null>(50);
  const [custom, setCustom] = useState("");
  const [programme, setProgramme] = useState(
    donationPurposes.some((p) => p.slug === defaultProgramme) ? defaultProgramme : "where-needed"
  );

  // Step 2: Donor details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stepErrors, setStepErrors] = useState<{ amount?: string; name?: string; email?: string }>({});

  const amount = preset ?? (Number(custom) || 0);

  const formattedAmount =
    currency === "USD"
      ? `$${amount}`
      : currency === "EUR"
      ? `€${amount}`
      : `KES ${amount.toLocaleString("en-KE")}`;

  const selectedPurpose = donationPurposes.find((p) => p.slug === programme) || donationPurposes[0];

  function validateStep1() {
    const minAmount = currency === "USD" || currency === "EUR" ? 1 : 100;
    if (!amount || amount < minAmount) {
      setStepErrors((prev) => ({
        ...prev,
        amount: `Please enter an amount of at least ${
          currency === "USD" ? "$1" : currency === "EUR" ? "€1" : "KES 100"
        }.`,
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
    setPreset(currency === "KES" ? 5000 : 50);
    setCustom("");
    setStepErrors({});
    if (state.status === "success") {
      state.status = "idle";
      state.message = "";
    }
  }

  // Asante Sana confirmation screen
  if (state.status === "success") {
    const firstName = (state.values?.name || name).split(" ")[0];
    const displayAmount = state.values?.formattedAmount || formattedAmount;
    const displayFreq = (state.values?.frequency || frequency) === "monthly" ? "monthly" : "one-time";
    const displayPurpose = state.values?.purposeTitle || selectedPurpose.title;
    const displayEmail = state.values?.email || email;

    return (
      <div className="flex flex-col items-center py-6 text-center animate-modal-in">
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
          You can complete your payment securely via PayPal. Thank you for turning creativity into opportunity.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://www.paypal.com/ncp/payment/NDG9RFXNW7LGC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-mustard-500 px-6 py-3 text-sm font-bold text-cocoa-900 shadow-sm transition-transform hover:bg-mustard-400 active:scale-[0.99]"
          >
            Open PayPal Checkout
            <ExternalLink className="size-4" />
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-full border border-sand-200 bg-white px-6 py-3 text-sm font-semibold text-cocoa-900 transition-colors hover:border-mustard-500 hover:bg-mustard-50"
          >
            Make another gift
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, label: "AMOUNT" },
    { num: 2, label: "DETAILS" },
    { num: 3, label: "CONFIRM" },
  ];

  const presets = currency === "USD" ? usdPresets : currency === "EUR" ? eurPresets : kesPresets;

  return (
    <form action={formAction} className="relative grid gap-6" noValidate>
      <Honeypot />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="frequency" value={frequency} />
      <input type="hidden" name="programme" value={programme} />
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="email" value={email} />

      {/* STEP INDICATOR HEADER (matching screenshot) */}
      <div className="flex items-center justify-between border-b border-sand-200/70 px-1 pb-4">
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
                    isActive
                      ? "bg-mustard-500 text-cocoa-950 font-black ring-2 ring-mustard-500/30"
                      : isDone
                      ? "bg-cocoa-900 text-cream-50"
                      : "border border-sand-200 bg-sand-100 text-cocoa-700"
                  }`}
                >
                  {s.num}
                </span>
                <span
                  className={`text-[0.72rem] font-bold tracking-wider uppercase sm:text-xs ${
                    isActive ? "text-cocoa-900 font-extrabold" : isDone ? "text-cocoa-800" : "text-muted"
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
        <div className="grid gap-5 animate-modal-in">
          {/* Frequency Toggle: One-Time / Monthly */}
          <div
            className="grid grid-cols-2 rounded-full bg-[#efeae2] p-1.5 shadow-inner"
            role="radiogroup"
            aria-label="Donation frequency"
          >
            <button
              type="button"
              role="radio"
              aria-checked={frequency === "once"}
              onClick={() => setFrequency("once")}
              className={`rounded-full py-2.5 text-xs sm:text-sm font-bold transition-all ${
                frequency === "once"
                  ? "bg-cocoa-900 text-cream-50 shadow-sm"
                  : "text-cocoa-800 hover:text-cocoa-950"
              }`}
            >
              One-Time
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={frequency === "monthly"}
              onClick={() => setFrequency("monthly")}
              className={`rounded-full py-2.5 text-xs sm:text-sm font-bold transition-all ${
                frequency === "monthly"
                  ? "bg-cocoa-900 text-cream-50 shadow-sm"
                  : "text-cocoa-800 hover:text-cocoa-950"
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Currency Dropdown + Amount Input Row */}
          <div className="flex items-center gap-2 rounded-2xl border border-sand-200 bg-sand-50/50 p-2 focus-within:border-mustard-500 focus-within:ring-2 focus-within:ring-mustard-500/20 transition-all">
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => {
                  const cur = e.target.value as "USD" | "EUR" | "KES";
                  setCurrency(cur);
                  setPreset(cur === "KES" ? 5000 : 50);
                  setCustom("");
                  setStepErrors((prev) => ({ ...prev, amount: undefined }));
                }}
                className="appearance-none rounded-xl border border-sand-200 bg-white py-2 pl-3.5 pr-8 text-xs sm:text-sm font-bold text-cocoa-900 shadow-sm focus:outline-none focus:border-mustard-500 cursor-pointer"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="KES">KES</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-cocoa-700" />
            </div>

            <div className="flex flex-1 items-center gap-2 px-2">
              <span className="text-sm sm:text-base font-bold text-cocoa-700">
                {currency === "USD" ? "$" : currency === "EUR" ? "€" : "KSh"}
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={custom !== "" ? custom : preset !== null ? String(preset) : ""}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^\d]/g, "");
                  setCustom(val);
                  setPreset(val ? Number(val) : null);
                  setStepErrors((prev) => ({ ...prev, amount: undefined }));
                }}
                placeholder="50"
                className="w-full bg-transparent text-base sm:text-lg font-bold text-cocoa-900 placeholder:text-muted/60 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick preset amount buttons */}
          <div className="grid grid-cols-5 gap-2">
            {presets.map((val) => {
              const isSelected = preset === val && custom === "";
              return (
                <button
                  key={val}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setPreset(val);
                    setCustom("");
                    setStepErrors((prev) => ({ ...prev, amount: undefined }));
                  }}
                  className={`rounded-xl py-3 text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? "border border-mustard-500 bg-mustard-500 text-cocoa-950 shadow-sm"
                      : "border border-transparent bg-[#f0ebe3] text-cocoa-800 hover:bg-[#e7e1d8]"
                  }`}
                >
                  {currency === "USD" ? `$${val}` : currency === "EUR" ? `€${val}` : val.toLocaleString("en-KE")}
                </button>
              );
            })}
          </div>

          {stepErrors.amount && <p className="text-sm font-medium text-red-600">{stepErrors.amount}</p>}

          {/* YOUR SUPPORT CREATES */}
          <div>
            <p className="text-[0.72rem] font-bold tracking-wider uppercase text-cocoa-700">
              — YOUR SUPPORT CREATES
            </p>
            <div className="mt-2 rounded-2xl border border-[#eadccf] bg-[#f7efe6] px-4 py-3 text-xs sm:text-sm font-medium text-cocoa-900 leading-relaxed shadow-sm">
              {getImpactDescription(currency, amount)}
            </div>
          </div>

          {/* CHOOSE A PURPOSE */}
          <div>
            <p className="text-[0.72rem] font-bold tracking-wider uppercase text-cocoa-700">
              CHOOSE A PURPOSE
            </p>
            <div className="mt-2.5 grid sm:grid-cols-2 gap-2.5">
              {donationPurposes.map((p) => {
                const isSelected = programme === p.slug;
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setProgramme(p.slug)}
                    className={`rounded-2xl p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-2 border-mustard-500 bg-[#fffcf5] shadow-sm ring-2 ring-mustard-500/20"
                        : "border border-sand-200 bg-white hover:border-sand-300"
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-bold text-cocoa-900">{p.title}</p>
                    <p className="mt-0.5 text-[0.72rem] sm:text-xs text-muted leading-snug">{p.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Continue button */}
          <button
            type="button"
            onClick={() => {
              if (validateStep1()) setCurrentStep(2);
            }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-mustard-500 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-cocoa-950 shadow-md transition-transform hover:bg-mustard-400 active:scale-[0.99]"
          >
            Continue →
          </button>
        </div>
      )}

      {/* ======================= STEP 2: DETAILS ======================= */}
      {currentStep === 2 && (
        <div className="grid gap-5 animate-modal-in">
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-cocoa-900">
              Your details
            </h3>
            <p className="mt-1 text-xs text-muted">
              We need your name and email to record your gift and send your receipt.
            </p>
          </div>

          <div>
            <label htmlFor="donor-name" className="text-xs sm:text-sm font-semibold text-cocoa-900">
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
              className={`mt-2 block w-full rounded-2xl border bg-sand-50/50 px-4 py-3 text-sm text-cocoa-900 focus:border-mustard-500 focus:bg-white focus:outline-none ${
                stepErrors.name ? "border-red-400" : "border-sand-200"
              }`}
            />
            {stepErrors.name && <p className="mt-1.5 text-xs text-red-600">{stepErrors.name}</p>}
          </div>

          <div>
            <label htmlFor="donor-email" className="text-xs sm:text-sm font-semibold text-cocoa-900">
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
              className={`mt-2 block w-full rounded-2xl border bg-sand-50/50 px-4 py-3 text-sm text-cocoa-900 focus:border-mustard-500 focus:bg-white focus:outline-none ${
                stepErrors.email ? "border-red-400" : "border-sand-200"
              }`}
            />
            {stepErrors.email && <p className="mt-1.5 text-xs text-red-600">{stepErrors.email}</p>}
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
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-mustard-500 py-3 text-sm font-bold text-cocoa-950 shadow-md transition-transform hover:bg-mustard-400 active:scale-[0.99]"
            >
              Review & Confirm →
            </button>
          </div>
        </div>
      )}

      {/* ======================= STEP 3: CONFIRM & PAY ======================= */}
      {currentStep === 3 && (
        <div className="grid gap-6 animate-modal-in">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-cocoa-900">
              Confirm your gift
            </h3>
            <p className="mt-1 text-xs text-muted">
              Review your details below and complete your donation using PayPal.
            </p>
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
              <span className="font-bold text-cocoa-900 text-right">{selectedPurpose.title}</span>
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
              Your details are securely stored. All payments are processed securely through PayPal. You will receive an Asante Sana confirmation email.
            </p>
          </div>

          {/* PayPal Checkout Button */}
          <div className="rounded-2xl border border-sand-200 bg-sand-50/50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-cocoa-700">Pay with PayPal</p>
            <p className="mt-1 text-xs text-muted">
              Click below to complete your {formattedAmount} donation securely on PayPal.
            </p>
            <a
              href="https://www.paypal.com/ncp/payment/NDG9RFXNW7LGC"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#0070BA] hover:bg-[#005ea6] py-3 text-sm font-bold text-white shadow-sm transition-all"
            >
              Continue to PayPal Checkout
              <ExternalLink className="size-4" />
            </a>
          </div>

          <FormError state={state} />

          {/* Action buttons: Back and Record Pledge */}
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
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-mustard-500 py-3.5 text-sm font-bold text-cocoa-950 shadow-md transition-transform hover:bg-mustard-400 active:scale-[0.99] disabled:opacity-50"
            >
              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Heart className="size-4 fill-current" />
              )}
              Confirm & Record {formattedAmount}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
