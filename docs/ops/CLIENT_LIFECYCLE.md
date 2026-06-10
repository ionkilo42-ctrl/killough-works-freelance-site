# Client Lifecycle

> Minimum operational system for the first 50 paying clients.
> Companion: `CLIENT_FOLDER_SOP.md` · `CLIENT_MASTER_TRACKER.md`

---

## Lifecycle stages

```text
Accepted Terms
    ↓
Paid
    ↓
Intake
    ↓
Scope Confirmed      ← First Fix / Mini Build only
    ↓
Work Performed
    ↓
Delivered
    ↓
7-Day Acceptance Window
    ↓
Archived
```

---

## Stage definitions

| Stage | Meaning | Tracker lifecycle value |
|-------|---------|-------------------------|
| **Accepted Terms** | Checkbox + API log + Resend audit (automatic on site) | `Accepted Terms` |
| **Paid** | Stripe payment confirmed; client row + folders created | `Paid` |
| **Intake** | Kickoff sent; client materials received | `Intake` |
| **Scope Confirmed** | Written scope + client replied `confirmed` | `Scope Confirmed` |
| **Work Performed** | Review or implementation in progress | `Work Performed` |
| **Delivered** | Delivery email sent same day work completes | `Delivered` |
| **7-Day Acceptance Window** | Clock running; no material issue reported | `Acceptance Window` |
| **Archived** | Deadline passed or client accepted; case closed | `Archived` |

---

## Tier shortcuts

| Tier | Scope Confirmed required? | Typical timeline |
|------|---------------------------|------------------|
| **Friction Check** $35 | No — skip to Work Performed after intake | Paid → Intake → Work → Delivered → Archive |
| **First Fix** $75 | Yes — before any live edit | Paid → Intake → Scope → Work → Delivered → Archive |
| **Mini Build** $150+ | Yes — before expanded build | Same; add `Agreement/` for signed doc when scope is large |

---

## Stage-by-stage operator actions

### 1. Accepted Terms (automatic)

**System does:**
- Site checkbox → `POST /api/payment-acceptance`
- Resend audit email to inbox
- Optional local log: `data/payment-acceptances.json`

**Jonathan does:** Nothing yet.

---

### 2. Paid (manual — within 15 min of Stripe notification)

**Jonathan does:**
1. Open Stripe → copy payer email, amount, date, receipt/PI ID
2. Match Resend audit email (within ~30 min before payment)
3. Assign **Client ID** `KW-YYYY-###`
4. Create `Clients/YYYY-MM-business-slug/` with `Payment/` + `Intake/`
5. Save to `Payment/`: audit email, acceptance JSON, Stripe receipt
6. Add tracker row; set **Lifecycle** → `Paid`
7. Send [KICKOFF_EMAIL_TEMPLATE.md](./KICKOFF_EMAIL_TEMPLATE.md)

**Exit criteria:** Row exists, folders exist, kickoff sent.

---

### 3. Intake

**Jonathan does:**
1. Wait for client materials (form, reply, or post-payment handoff)
2. Save materials → `Intake/`
3. Set **Intake received** date; **Lifecycle** → `Intake`

**Exit criteria:** Enough to understand what to review or fix.

**Stuck > 7 days:** One follow-up email. No materials → refund conversation per Refund Policy.

---

### 4. Scope Confirmed (First Fix + Mini Build only)

**Jonathan does:**
1. Send [SCOPE_CONFIRMATION_EMAIL_TEMPLATE.md](./SCOPE_CONFIRMATION_EMAIL_TEMPLATE.md)
2. Wait for reply `confirmed`
3. Save reply → `Intake/`
4. **Scope gate** → `Confirmed`; **Lifecycle** → `Scope Confirmed`

**Exit criteria:** Written `confirmed` on file.

**Hard stop:** No production access without this.

---

### 5. Work Performed

**Jonathan does:**
1. Set **Work started at**
2. **Lifecycle** → `Work Performed`
3. For live edits: before screenshot → `Deliverables/`
4. Complete scoped work only

**Exit criteria:** Deliverable ready to describe in delivery email.

---

### 6. Delivered

**Jonathan does:**
1. Send [DELIVERY_EMAIL_TEMPLATE.md](./DELIVERY_EMAIL_TEMPLATE.md) to Stripe payer email when possible
2. Save artifacts → `Deliverables/`; email copy → `Acceptance/`
3. Set **Delivered at**, **Sent to email**, **Acceptance deadline**
4. **Lifecycle** → `Delivered` then `Acceptance Window`

**Exit criteria:** Client has written record of what was delivered and deadline.

---

### 7. 7-Day Acceptance Window

**Jonathan does:**
1. Monitor inbox for material issue reports
2. If issue is in scope → fix or discuss; if out of scope → change order
3. If no material issue by deadline → proceed to Archive

**Exit criteria:** Deadline date passed.

---

### 8. Archived

**Jonathan does:**
1. Add `Archive/closed-[YYYY-MM-DD].txt` — one-paragraph summary
2. **Archived at** → today; **Lifecycle** → `Archived`
3. Row stays in tracker for dispute lookup (do not delete)

---

## Evidence chain (dispute-ready)

```text
Resend audit (Accepted Terms)
    +
Stripe receipt (Paid)
    +
Kickoff + intake thread (Intake)
    +
Scope email + "confirmed" (Scope Confirmed — if applicable)
    +
Delivery email + files (Delivered / Acceptance Window)
    =
Strong Stripe response packet
```

---

## Three priorities mapped to lifecycle

| Priority | Stages covered | Primary artifact |
|----------|----------------|------------------|
| **Payment reconciliation** | Accepted Terms → Paid | Tracker row + `Payment/` |
| **Scope confirmation** | Intake → Scope Confirmed | `Intake/scope-confirmed-*.txt` |
| **Delivery tracking** | Work Performed → Acceptance Window | `Acceptance/delivery-*.txt` + `Deliverables/` |

---

## Related templates

- [KICKOFF_EMAIL_TEMPLATE.md](./KICKOFF_EMAIL_TEMPLATE.md)
- [SCOPE_CONFIRMATION_EMAIL_TEMPLATE.md](./SCOPE_CONFIRMATION_EMAIL_TEMPLATE.md)
- [DELIVERY_EMAIL_TEMPLATE.md](./DELIVERY_EMAIL_TEMPLATE.md)
- [DISPUTE_RESPONSE_CHECKLIST.md](./DISPUTE_RESPONSE_CHECKLIST.md)
- [CLIENT_MASTER_TRACKER.md](./CLIENT_MASTER_TRACKER.md)