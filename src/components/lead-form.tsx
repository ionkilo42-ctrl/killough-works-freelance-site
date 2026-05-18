"use client";

import { FormEvent, useState } from "react";

const initialState = {
  name: "",
  email: "",
  business: "",
  website: "",
  projectType: "",
  budget: "",
  timeline: "",
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
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <div className="field-grid">
        <label>
          Name
          <input
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
        </label>
        <label>
          Business / Brand
          <input
            required
            value={form.business}
            onChange={(event) => setForm((current) => ({ ...current, business: event.target.value }))}
          />
        </label>
        <label>
          Website or Instagram
          <input
            value={form.website}
            onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
          />
        </label>
        <label>
          Project Type
          <select
            required
            value={form.projectType}
            onChange={(event) =>
              setForm((current) => ({ ...current, projectType: event.target.value }))
            }
          >
            <option value="">Select one</option>
            <option>Landing page / website</option>
            <option>Lead capture / follow-up</option>
            <option>Automation setup</option>
            <option>AI workflow integration</option>
            <option>MVP / prototype</option>
          </select>
        </label>
        <label>
          Budget
          <select
            required
            value={form.budget}
            onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))}
          >
            <option value="">Select one</option>
            <option>Under $1k</option>
            <option>$1k-$3k</option>
            <option>$3k-$7k</option>
            <option>$7k+</option>
          </select>
        </label>
        <label>
          Timeline
          <select
            required
            value={form.timeline}
            onChange={(event) => setForm((current) => ({ ...current, timeline: event.target.value }))}
          >
            <option value="">Select one</option>
            <option>ASAP / this week</option>
            <option>2-4 weeks</option>
            <option>1-2 months</option>
            <option>Exploring options</option>
          </select>
        </label>
      </div>

      <label>
        What are you trying to fix, launch, or automate?
        <textarea
          required
          rows={6}
          value={form.summary}
          onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
        />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send Project Details"}
        </button>
        <a className="text-link" href="mailto:hello@killough.works?subject=Freelance%20Project%20Inquiry">
          Or email directly
        </a>
      </div>

      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}
