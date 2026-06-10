"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { legalRoutes } from "@/data/legal";
import { contactDetails } from "@/data/site";

const initialState = {
  name: "",
  email: "",
  business: "",
  website: "",
  budget: "",
  summary: "",
};

export function LeadForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      // TODO: True file upload support would require multipart/FormData from this form,
      // parsing multipart in src/app/api/intake/route.ts, attachment/storage support in
      // src/lib/intake.ts, and a real email/storage path for forwarded files.
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.message ?? "Something went wrong. Please email directly.");
        return;
      }

      setStatus("success");
      setMessage(payload.message ?? "Thanks. Your project details are in.");
      setForm(initialState);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please email directly.");
    }
  }

  return (
    <form className="lead-form lead-form-flat" onSubmit={onSubmit}>
      <div className="form-intro form-intro-compact">
        <p className="form-note">
          Hiring managers and collaborators: share what you&apos;re exploring. A short note is enough
          to begin.
        </p>
      </div>

      <div className="field-grid">
        <label>
          Name
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            placeholder="Where should I reply?"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
        </label>
        <label>
          Company or project (optional)
          <input
            placeholder="Company, team, or project name"
            value={form.business}
            onChange={(event) => setForm((current) => ({ ...current, business: event.target.value }))}
          />
        </label>
        <label>
          Website or social link
          <input
            placeholder="Website, LinkedIn, GitHub, or relevant link"
            value={form.website}
            onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
          />
          <span className="field-help">
            Optional. A portfolio link, job posting, repo, or project page is enough context.
          </span>
        </label>
        <label>
          What kind of conversation is this?
          <select
            required
            value={form.budget}
            onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))}
          >
            <option value="">Select one</option>
            <option>Portfolio / hiring review</option>
            <option>Collaboration or prototype</option>
            <option>Scoped client project</option>
            <option>Ministry / education tool</option>
            <option>General inquiry</option>
          </select>
          <span className="field-help">
            This helps me understand how to respond. New engagements are considered individually.
          </span>
        </label>
      </div>

      <label>
        What should I know?
        <textarea
          required
          rows={4}
          placeholder="Example: hiring for a product role, exploring a prototype collaboration, or discussing selective project work..."
          value={form.summary}
          onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
        />
      </label>

      <p className="form-consent-note">
        By submitting this form, you agree to the{" "}
        <Link href={legalRoutes.privacy} className="text-link">
          Privacy Policy
        </Link>{" "}
        and consent to being contacted about your inquiry.
      </p>

      <div className="form-actions">
        <button type="submit" disabled={status === "loading"}>
          <span className="console-form-submit">
            {status === "loading" ? "Sending..." : "Send message"}
          </span>
        </button>
        <a className="text-link" href={contactDetails.mailtoHref}>
          {contactDetails.directLabel}: {contactDetails.email}
        </a>
      </div>

      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}