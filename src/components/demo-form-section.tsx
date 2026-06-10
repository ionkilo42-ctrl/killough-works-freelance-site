"use client";

import type { ReactNode } from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";

import { SuccessState } from "@/components/success-state";
import type { DemoDefinition, DemoField } from "@/data/demos";

type DemoFormSectionProps = {
  demo: DemoDefinition;
};

function emptyFormState(fields: DemoField[] = []) {
  return Object.fromEntries(
    fields.filter((field) => field.type !== "file").map((field) => [field.name, ""]),
  ) as Record<string, string>;
}

type DemoFieldsProps = {
  fields: DemoField[];
  form: Record<string, string>;
  selectedFiles: Record<string, number>;
  updateField: (name: string, value: string) => void;
  handleFileChange: (name: string, event: ChangeEvent<HTMLInputElement>) => void;
};

function DemoFields({
  fields,
  form,
  selectedFiles,
  updateField,
  handleFileChange,
}: DemoFieldsProps) {
  return (
    <div className="demo-field-stack">
      {fields.map((field) => {
        if (field.type === "textarea") {
          return (
            <label key={field.name} className="demo-field">
              <span>{field.label}</span>
              <textarea
                name={field.name}
                rows={field.rows ?? 4}
                required={field.required}
                placeholder={field.placeholder}
                value={form[field.name] ?? ""}
                onChange={(event) => updateField(field.name, event.target.value)}
              />
              {field.help ? <small>{field.help}</small> : null}
            </label>
          );
        }

        if (field.type === "select") {
          return (
            <label key={field.name} className="demo-field">
              <span>{field.label}</span>
              <select
                name={field.name}
                required={field.required}
                value={form[field.name] ?? ""}
                onChange={(event) => updateField(field.name, event.target.value)}
              >
                {field.options.map((option) => (
                  <option key={`${field.name}-${option.value || "blank"}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {field.help ? <small>{field.help}</small> : null}
            </label>
          );
        }

        if (field.type === "file") {
          const fileCount = selectedFiles[field.name] ?? 0;

          return (
            <label key={field.name} className="demo-field demo-upload-field">
              <span>{field.label}</span>
              <div className="demo-upload-box">
                <input
                  name={field.name}
                  type="file"
                  accept={field.accept}
                  multiple={field.multiple}
                  onChange={(event) => handleFileChange(field.name, event)}
                />
                <p>{fileCount > 0 ? `${fileCount} file${fileCount === 1 ? "" : "s"} selected` : "Tap to add photos"}</p>
              </div>
              {field.help ? <small>{field.help}</small> : null}
            </label>
          );
        }

        return (
          <label key={field.name} className="demo-field">
            <span>{field.label}</span>
            <input
              name={field.name}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              value={form[field.name] ?? ""}
              onChange={(event) => updateField(field.name, event.target.value)}
            />
            {field.help ? <small>{field.help}</small> : null}
          </label>
        );
      })}
    </div>
  );
}

function DemoMobileShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="demo-mobile-frame">
      <div className="demo-mobile-topbar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="demo-mobile-body">
        <div className="demo-mobile-copy">
          <p className="demo-mobile-eyebrow">Interactive prototype — front-end demonstration.</p>
          <h3>{title}</h3>
          <p>{intro}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export function DemoFormSection({ demo }: DemoFormSectionProps) {
  const fields = demo.fields ?? [];
  const [form, setForm] = useState<Record<string, string>>(() => emptyFormState(fields));
  const [selectedFiles, setSelectedFiles] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleFileChange(name: string, event: ChangeEvent<HTMLInputElement>) {
    const count = event.target.files?.length ?? 0;
    setSelectedFiles((current) => ({ ...current, [name]: count }));
  }

  function resetDemo() {
    setForm(emptyFormState(fields));
    setSelectedFiles({});
    setSubmitted(false);
  }

  function onSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setSubmitted(true);
  }

  function renderInteractiveDemo() {
    if (demo.demoKind === "landing") {
      return (
        <div className="demo-form">
          <DemoMobileShell title={demo.title} intro={demo.intro}>
            <section className="demo-landing-hero">
              <p className="panel-label">Fast local replies</p>
              <h4>Pressure washing that actually makes it easy to get a quote.</h4>
              <p>Simple quote request. Before and after photos. Clear next step.</p>
              <button className="button primary demo-submit" type="button" onClick={() => onSubmit()}>
                {demo.submitLabel}
              </button>
            </section>

            <section className="demo-preview-grid">
              {(demo.serviceCards ?? []).map((service) => (
                <article key={service} className="demo-preview-card">
                  <p className="panel-label">Service</p>
                  <h5>{service}</h5>
                  <p>Clear service copy with one simple quote action.</p>
                </article>
              ))}
            </section>

            <section className="demo-trust-strip">
              {(demo.trustMarkers ?? []).map((marker) => (
                <p key={marker}>{marker}</p>
              ))}
            </section>

            <section className="demo-highlight-card">
              <p className="panel-label">{demo.highlightTitle}</p>
              <p>{demo.highlightCopy}</p>
            </section>
          </DemoMobileShell>
        </div>
      );
    }

    if (demo.demoKind === "dashboard") {
      return (
        <div className="demo-form">
          <DemoMobileShell title={demo.title} intro={demo.intro}>
            <section className="demo-dashboard-header">
              <div>
                <p className="panel-label">Today</p>
                <h4>4 leads need attention</h4>
              </div>
              <button className="button secondary demo-dashboard-action" type="button" onClick={() => onSubmit()}>
                {demo.submitLabel}
              </button>
            </section>

            <section className="demo-dashboard-list">
              {(demo.leadCards ?? []).map((lead) => (
                <article key={`${lead.customer}-${lead.service}`} className="demo-dashboard-card">
                  <div className="demo-dashboard-row">
                    <h5>{lead.customer}</h5>
                    <span className={`demo-status-pill demo-status-${lead.status.toLowerCase().replaceAll(" ", "-")}`}>
                      {lead.status}
                    </span>
                  </div>
                  <p>{lead.service}</p>
                  <div className="demo-dashboard-meta">
                    <span>{lead.town}</span>
                    <span>{lead.urgency}</span>
                  </div>
                  <div className="demo-dashboard-buttons">
                    <button type="button">Call back</button>
                    <button type="button">Update status</button>
                  </div>
                </article>
              ))}
            </section>
          </DemoMobileShell>
        </div>
      );
    }

    if (demo.demoKind === "payment") {
      return (
        <form className="demo-form" onSubmit={onSubmit}>
          <DemoMobileShell title={demo.title} intro={demo.intro}>
            <section className="demo-summary-card">
              <p className="panel-label">Job summary</p>
              <h4>{demo.packageSummary?.title}</h4>
              <ul className="messy-list">
                {(demo.packageSummary?.items ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="demo-option-pills">
                {(demo.packageSummary?.options ?? []).map((option) => (
                  <span key={option}>{option}</span>
                ))}
              </div>
            </section>
            <DemoFields
              fields={fields}
              form={form}
              selectedFiles={selectedFiles}
              updateField={updateField}
              handleFileChange={handleFileChange}
            />
            <button className="button primary demo-submit" type="submit">
              {demo.submitLabel}
            </button>
          </DemoMobileShell>
        </form>
      );
    }

    if (demo.demoKind === "estimate") {
      return (
        <form className="demo-form" onSubmit={onSubmit}>
          <DemoMobileShell title={demo.title} intro={demo.intro}>
            <section className="demo-summary-card">
              <p className="panel-label">Estimate summary</p>
              <h4>{demo.estimateSummary?.projectTitle}</h4>
              <div className="demo-line-item-list">
                {(demo.estimateSummary?.lineItems ?? []).map((item) => (
                  <div key={`${item.label}-${item.value}`} className="demo-line-item">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              <p>{demo.estimateSummary?.note}</p>
            </section>
            <div className="demo-estimate-actions">
              <button className="button secondary" type="button">
                Ask a question
              </button>
            </div>
            <DemoFields
              fields={fields}
              form={form}
              selectedFiles={selectedFiles}
              updateField={updateField}
              handleFileChange={handleFileChange}
            />
            <button className="button primary demo-submit" type="submit">
              {demo.submitLabel}
            </button>
          </DemoMobileShell>
        </form>
      );
    }

    return (
      <form className="demo-form" onSubmit={onSubmit}>
        <DemoMobileShell title={demo.title} intro={demo.intro}>
          <DemoFields
            fields={fields}
            form={form}
            selectedFiles={selectedFiles}
            updateField={updateField}
            handleFileChange={handleFileChange}
          />
          <button className="button primary demo-submit" type="submit">
            {demo.submitLabel}
          </button>
        </DemoMobileShell>
      </form>
    );
  }

  return (
    <section className="section-tray demo-form-shell">
      <div className="section-heading">
        <p className="section-label">Working demo</p>
        <h2>{demo.title}</h2>
        <p>{demo.formIntro}</p>
      </div>

      {submitted ? (
        <SuccessState
          title={demo.successTitle}
          message={demo.successMessage}
          resetLabel="Try the demo again"
          onReset={resetDemo}
        />
      ) : (
        renderInteractiveDemo()
      )}

      <div className="demo-cta-row">
        <div>
          <p className="panel-label">Interested in a build like this?</p>
          <p className="demo-starter-price">Start with a conversation about scope and fit.</p>
        </div>
        <Link className="button tertiary" href="/#contact">
          Start a Conversation
        </Link>
      </div>
    </section>
  );
}
