import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { Resend } from "resend";

export type IntakePayload = {
  name: string;
  email: string;
  business: string;
  website?: string;
  projectType: string;
  budget: string;
  timeline: string;
  summary: string;
};

const requiredFields: Array<keyof IntakePayload> = [
  "name",
  "email",
  "business",
  "projectType",
  "budget",
  "timeline",
  "summary",
];

export function validateIntake(payload: Partial<IntakePayload>) {
  for (const field of requiredFields) {
    if (!payload[field] || !String(payload[field]).trim()) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (!payload.email?.includes("@")) {
    throw new Error("Please provide a valid email address.");
  }

  return payload as IntakePayload;
}

async function saveLocally(submission: IntakePayload & { submittedAt: string }) {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "intake-submissions.json");

  await mkdir(dataDir, { recursive: true });

  let existing: Array<IntakePayload & { submittedAt: string }> = [];
  try {
    const content = await readFile(filePath, "utf8");
    existing = JSON.parse(content) as Array<IntakePayload & { submittedAt: string }>;
  } catch {
    existing = [];
  }

  existing.unshift(submission);
  await writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");
}

export async function handleIntake(payload: Partial<IntakePayload>) {
  const submission = {
    ...validateIntake(payload),
    submittedAt: new Date().toISOString(),
  };

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.LEAD_INBOX;
  const from = process.env.LEAD_FROM_EMAIL ?? "Killough Works <onboarding@resend.dev>";

  if (apiKey && inbox) {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: [inbox],
      replyTo: submission.email,
      subject: `New freelance lead: ${submission.name} / ${submission.projectType}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Business: ${submission.business}`,
        `Website: ${submission.website || "N/A"}`,
        `Project type: ${submission.projectType}`,
        `Budget: ${submission.budget}`,
        `Timeline: ${submission.timeline}`,
        "",
        submission.summary,
      ].join("\n"),
    });

    return {
      mode: "email",
      message: "Thanks. Your project details are in. I’ll follow up by email.",
    };
  }

  await saveLocally(submission);

  return {
    mode: "local",
    message:
      "Thanks. Your project details were saved locally. Add Resend env vars before production to deliver submissions to your inbox.",
  };
}
