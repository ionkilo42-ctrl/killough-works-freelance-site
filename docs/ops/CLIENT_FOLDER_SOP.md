# Killough Works — Client Folder SOP

> Operational playbook for evidence retention. Version 1.0 — June 2026

---

## Golden rule

**Nothing starts until there is a `Payment/` folder and an `Intake/` folder.**

Create both folders before you begin work, even for a $35 Friction Check.

---

## Folder structure

```text
Clients/
 └── Acme Roofing/
      ├── Intake/
      ├── Agreement/
      ├── Payment/
      ├── Deliverables/
      ├── Acceptance/
      └── Archive/
```

| Folder | What goes here |
|--------|----------------|
| **Intake** | Form submission, kickoff emails, scope notes, client links/screenshots |
| **Agreement** | Signed Service Agreement (Mini Build+), change orders |
| **Payment** | Acceptance record JSON, Resend audit email export, Stripe receipt |
| **Deliverables** | Loom links, files, screenshots, deployment notes |
| **Acceptance** | Delivery email, 7-day window dates, client replies, deemed-acceptance note |
| **Archive** | Final snapshot when project is closed |

Naming: `Clients/YYYY-MM-business-name/`

---

## Tier workflow

| Tier | Before work starts | During | After delivery |
|------|-------------------|--------|----------------|
| **Friction Check ($35)** | `Intake/` + `Payment/` | Review materials | Delivery email → `Deliverables/` + `Acceptance/` |
| **First Fix ($75)** | Above + scope confirmation email in `Intake/` | One scoped fix | Delivery email with acceptance window |
| **Mini Build ($150+)** | Above + signed Agreement in `Agreement/` before expanded work | Milestones documented | Delivery + acceptance per milestone |

---

## Evidence chain

```text
Client viewed terms (/terms, /refund)
↓
Client accepted terms (checkbox on /pay)
↓
Acceptance recorded (API + Resend inbox email)
↓
Payment completed (Stripe receipt → Payment/)
↓
Scope confirmed (email → Intake/ or Agreement/)
↓
Work delivered (Deliverables/ + delivery email → Acceptance/)
↓
Acceptance window expires (7 days — note in Acceptance/)
↓
Project archived (Archive/)
```

---

## Email template 1 — Post-payment kickoff

**Subject:** `Killough Works — [Tier] received — next step`

```text
Hi [Name],

Thanks for starting with [Friction Check / First Fix / Mini Build].

What I received:
- Offer: [tier]
- Payment acceptance recorded: [date]
- Terms version: 1.1

Next step:
Send me [website / page / screenshot / notes] so I can review the right thing.

Scope reminder:
[Tier] is a limited-scope engagement. It does not include ongoing support, maintenance, or future updates unless we agree to something larger separately.

Reply to this email with your materials when ready.

— Jonathan
Killough Works
```

---

## Email template 2 — Scope confirmation (First Fix / Mini Build)

**Subject:** `Confirming scope — [Business name]`

```text
Hi [Name],

Before I start, confirming scope for this [First Fix / Mini Build]:

In scope:
- [bullet]

Out of scope (unless we add a change order):
- Ongoing support or maintenance
- Full redesign / unlimited revisions
- [other exclusions]

If this matches what you expect, reply "confirmed" and I'll proceed.

— Jonathan
```

---

## Email template 3 — Standardized delivery (strongest evidence)

**Subject:** `Delivered — [what was delivered] — [Business name]`

```text
Hi [Name],

Here is what was delivered for your [Friction Check / First Fix / Mini Build]:

Delivered:
- [bullet list of concrete deliverables]

Delivery date: [YYYY-MM-DD]

Acceptance window:
Please review by [date + 7 business days]. If I do not hear about a material issue by then, the deliverable is deemed accepted per our Terms of Service (section 8.3).

Support limitations:
This was a limited-scope engagement. It does not include ongoing support, monitoring, maintenance, or future updates unless purchased separately.

Next steps:
- [what client should do]
- [optional upsell if scope clearly expands]

If something material is missing from the agreed scope, reply before [acceptance deadline].

— Jonathan
Killough Works
```

Save a copy of every delivery email in `Acceptance/`.

---

## Payment folder checklist

For each client, `Payment/` should contain:

- [ ] Resend "Payment terms accepted" email (export or forward)
- [ ] `payment-acceptance-record.json` (copy from API log if needed)
- [ ] Stripe receipt PDF or screenshot
- [ ] Note of terms version accepted (currently **1.1**)

---

## Intake folder checklist

- [ ] Intake form submission or equivalent email thread
- [ ] Client-provided URLs, screenshots, or access notes
- [ ] Scope confirmation reply (First Fix / Mini Build)

---

## When legal package updates

Legal content is versioned in `src/content/legal/v1.1/` (immutable). When updating to v1.2:

1. Add new folder `v1.2/` — do not overwrite `v1.1/`
2. Bump `LEGAL_PACKAGE_VERSION` in `src/data/legal.ts`
3. Acceptance records will log the new version automatically

Old acceptance records remain tied to the version accepted at payment time.

---

## Related files

- **Daily operator page:** `docs/ops/DAILY_OPERATIONS.md`
- **Tracker:** `docs/ops/CLIENT_MASTER_TRACKER.md` (+ Google Sheet)
- **Templates:** `docs/ops/KICKOFF_EMAIL_TEMPLATE.md`, `SCOPE_CONFIRMATION_EMAIL_TEMPLATE.md`, `DELIVERY_EMAIL_TEMPLATE.md`
- **Disputes:** `docs/ops/DISPUTE_RESPONSE_CHECKLIST.md`
- Legal package: `docs/legal/`
- Service Agreement: `docs/legal/SERVICE_AGREEMENT_TEMPLATE.md`
- Payment acceptance API: `src/app/api/payment-acceptance/route.ts`
- Site payment gate: `src/components/payment-terms-gate.tsx`