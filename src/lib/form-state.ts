export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
  // Echoed back on validation errors so React's automatic form reset keeps what the user typed.
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readText(formData: FormData, name: string, max = 2000) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function isEmail(value: string) {
  return EMAIL_RE.test(value);
}
