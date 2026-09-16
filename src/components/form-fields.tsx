"use client";

import { CircleCheck, Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import type { FormState } from "@/lib/form-state";
import { buttonClass } from "./ui";

const inputClass =
  "mt-2 block w-full rounded-xl border bg-cream-50 px-4 py-3 text-[0.95rem] text-cocoa-900 placeholder:text-muted/60 transition-colors focus:border-mustard-500 focus:outline-none focus:ring-2 focus:ring-mustard-500/30";

type FieldProps = {
  label: string;
  name: string;
  state: FormState;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  textarea?: boolean;
};

export function Field({ label, name, state, type = "text", required, placeholder, autoComplete, textarea }: FieldProps) {
  const error = state.errors?.[name];
  const id = `field-${name}`;
  const shared = {
    id,
    name,
    required,
    placeholder,
    autoComplete,
    defaultValue: state.values?.[name],
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: `${inputClass} ${error ? "border-red-400" : "border-sand-200"}`,
  };

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-cocoa-900">
        {label}
        {!required && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {textarea ? <textarea rows={5} {...shared} /> : <input type={type} {...shared} />}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
      <label>
        Leave this field empty
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={pending} className={`${buttonClass("primary", "lg")} w-full`}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {children}
    </button>
  );
}

export function FormError({ state }: { state: FormState }) {
  if (state.status !== "error") return null;
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
      {state.message}
    </p>
  );
}

export function FormSuccess({ state, onReset }: { state: FormState; onReset?: () => void }) {
  return (
    <div role="status" className="flex flex-col items-start gap-4 rounded-2xl bg-mustard-100 p-6 text-cocoa-900">
      <CircleCheck className="size-8 text-mustard-600" />
      <p className="text-lg font-semibold leading-snug">{state.message}</p>
      {onReset && (
        <button type="button" onClick={onReset} className="text-sm font-semibold text-mustard-600 underline underline-offset-4">
          Send another message
        </button>
      )}
    </div>
  );
}
