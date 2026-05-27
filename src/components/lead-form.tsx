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
    <form className="lead-form" onSubmit={onSubmit}>
      <div className="form-intro">
        <p className="panel-label">Send it to Jonathan</p>
        <p className="form-note">Messy is fine. Links, screenshots, rough offers, and half-formed ideas all work.</p>
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
          Link, screenshot, Instagram, Facebook, or website
          <input
            placeholder="Drop whatever gives me context"
            value={form.website}
            onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
          />
        </label>
        <label>
          Starter budget
          <select
            required
            value={form.budget}
            onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))}
          >
            <option value="">Select one</option>
            <option>$10-$25</option>
            <option>$25-$50</option>
            <option>$50-$100</option>
            <option>$150+</option>
            <option>Not sure yet</option>
          </select>
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
          {status === "loading" ? "Sending..." : "Send it to Jonathan"}
        </button>
        <a className="text-link" href="mailto:ionkilo42ai@gmail.com?subject=Freelance%20Project%20Inquiry">
          Or email directly
        </a>
      </div>

      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}
