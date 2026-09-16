import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

type Submission = Record<string, string | number>;

/**
 * Delivers a form submission to the Nafsi team.
 * With RESEND_API_KEY + NOTIFY_EMAIL set it sends an email; otherwise it appends
 * to .data/submissions.jsonl so forms work during local development.
 */
export async function recordSubmission(kind: string, data: Submission) {
  const entry = { kind, receivedAt: new Date().toISOString(), ...data };
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;

  if (apiKey && to) {
    const text = Object.entries(entry)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM ?? "Nafsi Africa Website <onboarding@resend.dev>",
        to: [to],
        reply_to: typeof data.email === "string" ? data.email : undefined,
        subject: `New ${kind} submission — nafsiafrica.org`,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Email delivery failed with status ${res.status}`);
    return;
  }

  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "submissions.jsonl"), JSON.stringify(entry) + "\n", "utf8");
}
