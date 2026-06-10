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
    <form className="lead-form console-form" onSubmit={onSubmit}>
      <div className="form-intro">
        <p className="panel-label">Start here</p>
        <p className="form-note">
          Drop the website, social page, or rough link that feels broken. I&apos;ll tell you the
          first practical fix.
        </p>
        <p className="form-note">
          You do not need a full project brief. Short and messy is fine. After payment, this is
          where you send the context that helps me review the right thing.
        </p>
        <p className="required-note">
          Required: name, email, business name, a starting option, and a short note about what
          feels off.
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
          Business name
          <input
            required
            placeholder="Your business name"
            value={form.business}
            onChange={(event) => setForm((current) => ({ ...current, business: event.target.value }))}
          />
        </label>
        <label>
          Website or social link
          <input
            placeholder="Website, Facebook page, Instagram, booking page, or form link"
            value={form.website}
            onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
          />
          <span className="field-help">
            Messy is okay. A website, Facebook page, Instagram profile, or rough page link is
            enough to start.
          </span>
        </label>
        <label>
          Which option are you interested in?
          <select
            required
            value={form.budget}
            onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))}
          >
            <option value="">Select one</option>
            <option>$35 — Friction Check</option>
            <option>$75 — First Fix</option>
            <option>$150+ — Mini Build</option>
            <option>Not sure yet</option>
          </select>
          <span className="field-help">
            Pick the closest fit. If you are not sure yet, I can tell you the best place to start.
          </span>
        </label>
      </div>

      <label>
        What feels broken, confusing, or annoying?
        <textarea
          required
          rows={6}
          placeholder="Example: our contact form is broken, people keep messaging for quotes without details, the mobile page is messy, or there is no clear payment link..."
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
            {status === "loading" ? "Sending..." : "Send project details"}
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
