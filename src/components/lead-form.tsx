"use client";

import { FormEvent, useState } from "react";

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
        <p className="panel-label">Send it to Jonathan</p>
        <p className="form-note">
          Messy is fine. Links, screenshots, rough offers, and half-formed ideas all work.
        </p>
        <p className="form-note">Submit first. I&apos;ll review it and send the smallest useful next step.</p>
        <p className="required-note">Required: name, email, business or idea, starter budget, and what needs fixing.</p>
      </div>

      <div className="field-grid">
        <label>
          Name
          <input
            required
            placeholder="What should I call you?"
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
          Business / idea
          <input
            required
            placeholder="Business, side hustle, or rough offer"
            value={form.business}
            onChange={(event) => setForm((current) => ({ ...current, business: event.target.value }))}
          />
        </label>
        <label>
          Where is the problem?
          <input
            placeholder="Paste a link or describe what you have"
            value={form.website}
            onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
          />
          <span className="field-help">
            Paste a website link, social page, shared screenshot link, or describe what you have.
            Have screenshots? Mention them here or paste a shared link for now.
          </span>
        </label>
        <label>
          Starter budget
          <select
            required
            value={form.budget}
            onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))}
          >
            <option value="">Select one</option>
            <option>$10-$35 — Starter fix</option>
            <option>$35-$100 — Larger fix</option>
            <option>$150+ — Multi-step build</option>
            <option>Not sure yet</option>
          </select>
          <span className="field-help">
            Starter fixes are for one clear friction point, not an entire business rebuild.
          </span>
        </label>
      </div>

      <label>
        What do you want fixed or built?
        <textarea
          required
          rows={6}
          placeholder="Example: people keep DMing for quotes, my offer is unclear, I need a better form, I need a simple page for this promo..."
          value={form.summary}
          onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
        />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={status === "loading"}>
          <span className="console-form-submit">{status === "loading" ? "Sending..." : "Send it to Jonathan"}</span>
        </button>
        <a className="text-link" href="mailto:ionkilo42ai@gmail.com?subject=Freelance%20Project%20Inquiry">
          Or email directly
        </a>
      </div>

      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}
