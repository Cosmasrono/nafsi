"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { involvementTypes, programmes, site } from "@/lib/content";
import { type FormState, isEmail, readText } from "@/lib/form-state";
import { recordSubmission } from "@/lib/submissions";

const failed: FormState = {
  status: "error",
  message: "Something went wrong sending your message. Please try again or email info@nafsiafrica.org.",
};

// hidden honeypot field, only bots fill it in
function isSpam(formData: FormData) {
  return readText(formData, "company_website") !== "";
}

function invalid(errors: Record<string, string>, values: Record<string, string>): FormState | null {
  if (!Object.keys(errors).length) return null;
  return { status: "error", message: "Please fix the highlighted fields.", errors, values };
}

export async function sendContactMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Thanks, we'll be in touch soon." };

  const data = {
    name: readText(formData, "name", 120),
    email: readText(formData, "email", 200),
    phone: readText(formData, "phone", 40),
    organization: readText(formData, "organization", 160),
    interest: readText(formData, "interest", 60),
    message: readText(formData, "message", 4000),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Please tell us your name.";
  if (!isEmail(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Please write a short message (at least 10 characters).";
  const invalidState = invalid(errors, data);
  if (invalidState) return invalidState;

  try {
    await recordSubmission(data.interest ? `get-involved:${data.interest.toLowerCase()}` : "contact", data);
  } catch (error) {
    console.error(error);
    return { ...failed, values: data };
  }
  return {
    status: "success",
    message: `Thank you, ${data.name.split(" ")[0]}, your message is with the Nafsi team. We'll reply within two working days.`,
  };
}

export async function sendInvolvementRequest(type: string, _prev: FormState, formData: FormData): Promise<FormState> {
  if (!(type in involvementTypes)) return failed;
  if (isSpam(formData)) return { status: "success", message: "Thanks, we'll be in touch soon." };

  const data = {
    name: readText(formData, "name", 120),
    email: readText(formData, "email", 200),
    phone: readText(formData, "phone", 40),
    organization: readText(formData, "organization", 160),
    date: readText(formData, "date", 40),
    message: readText(formData, "message", 4000),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Please tell us your name.";
  if (!isEmail(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  const invalidState = invalid(errors, data);
  if (invalidState) return invalidState;

  try {
    await recordSubmission(`get-involved:${type}`, data);
  } catch (error) {
    console.error(error);
    return { ...failed, values: data };
  }
  return { status: "success", message: "Asante! Your request has reached the Nafsi team. We'll get back to you shortly." };
}

export async function subscribeToNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "You're subscribed." };

  const email = readText(formData, "email", 200);
  if (!isEmail(email)) return { status: "error", message: "Please enter a valid email address.", values: { email } };
  if (formData.get("consent") !== "on") {
    return { status: "error", message: "Please tick the box to agree to receive updates.", values: { email } };
  }

  try {
    await recordSubmission("newsletter", { email });
  } catch (error) {
    console.error(error);
    return { ...failed, values: { email } };
  }
  return { status: "success", message: "You're in! Look out for stories and opportunities from Nafsi Africa." };
}

export async function startDonation(_prev: FormState, formData: FormData): Promise<FormState> {
  const amount = Number(readText(formData, "amount", 12));
  const data = {
    name: readText(formData, "name", 120),
    email: readText(formData, "email", 200),
    frequency: readText(formData, "frequency", 20) === "monthly" ? "monthly" : "once",
    programme: readText(formData, "programme", 60) || "where-needed",
  };

  const errors: Record<string, string> = {};
  if (!Number.isFinite(amount) || amount < 100) errors.amount = "The minimum donation is KES 100.";
  else if (amount > 5_000_000) errors.amount = "For large gifts please contact us directly.";
  if (!data.name) errors.name = "Please tell us your name.";
  if (!isEmail(data.email)) errors.email = "Please enter a valid email address.";
  if (data.programme !== "where-needed" && !programmes.some((p) => p.slug === data.programme)) {
    errors.programme = "Please choose a programme.";
  }
  const invalidState = invalid(errors, data);
  if (invalidState) return invalidState;

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    // no Paystack key yet, save it as a pledge
    try {
      await recordSubmission("donation-pledge", { ...data, amount });
    } catch (error) {
      console.error(error);
      return { ...failed, values: data };
    }
    return {
      status: "success",
      message: `Thank you, ${data.name.split(" ")[0]}! We've recorded your pledge of KES ${amount.toLocaleString("en-KE")}. Online payments are being set up, so the Nafsi team will email you M-Pesa details.`,
    };
  }

  const origin = (await headers()).get("origin") || site.url;
  let authorizationUrl: string;
  try {
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        amount: Math.round(amount * 100),
        currency: "KES",
        callback_url: `${origin}/donate/thank-you`,
        channels: ["mobile_money", "card"],
        metadata: { name: data.name, frequency: data.frequency, programme: data.programme },
      }),
    });
    const json = (await res.json()) as { status: boolean; data?: { authorization_url: string } };
    if (!res.ok || !json.status || !json.data) throw new Error("Paystack initialisation failed");
    authorizationUrl = json.data.authorization_url;
  } catch (error) {
    console.error(error);
    return { status: "error", message: "We couldn't start the payment. Please try again in a moment.", values: data };
  }

  redirect(authorizationUrl);
}
