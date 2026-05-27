import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { Resend } from "resend";

export type IntakePayload = {
  name: string;
  email: string;
  business: string;
  website?: string;
  budget: string;
  summary: string;
};

const requiredFields: Array<keyof IntakePayload> = [
  "name",
  "email",
  "business",
  "budget",
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
  const inbox = process.env.INTAKE_TO_EMAIL ?? process.env.LEAD_INBOX;
  const from =
    process.env.INTAKE_FROM_EMAIL ??
    process.env.LEAD_FROM_EMAIL ??
    "Killough Works <onboarding@resend.dev>";

  if (apiKey && inbox) {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: [inbox],
      replyTo: submission.email,
      subject: `New freelance lead: ${submission.name} / ${submission.business}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Business: ${submission.business}`,
        `Reference link: ${submission.website || "N/A"}`,
        `Budget: ${submission.budget}`,
        "",
        submission.summary,
      ].join("\n"),
    });

    return {
      mode: "email",
      message: "Thanks. Your project details are in. I’ll follow up by email.",
    };
  }

  if (process.env.NODE_ENV === "production") {
    console.warn("Intake submission received without email delivery configured.", {
      submittedAt: submission.submittedAt,
      email: submission.email,
      business: submission.business,
    });

    return {
      mode: "unconfigured",
      message:
        "Thanks. Your project details are in, but email delivery is not configured yet. Please email ionkilo42ai@gmail.com directly so nothing gets missed.",
    };
  }

  await saveLocally(submission);

  return {
    mode: "local",
    message:
      "Thanks. Your project details were saved locally. Add Resend env vars before production to deliver submissions to your inbox.",
  };
}
