# Dispute Response Checklist — Final

> Trigger: Stripe emails "Dispute opened" OR client threatens chargeback.
> Time budget: 30 minutes. Do not refund until evidence is submitted.

---

## 0. Pause (2 min)

- [ ] Sheet: **Dispute** → `Open`
- [ ] Write Stripe dispute reason in **Notes**
- [ ] Do not respond in Stripe until packet is ready

---

## 1. Find client row (3 min)

- [ ] Locate **Client ID** in Google Sheet (backup: `CLIENT_MASTER_TRACKER.md`)
- [ ] **Tier** and **Amount USD** match disputed charge
- [ ] **Stripe receipt ref** matches dispute transaction
- [ ] **Sent to email** matches Stripe customer email (or explain mismatch in narrative)

---

## 2. Payment folder — `Payment/` (5 min)

- [ ] Resend audit: `Payment terms accepted: [Tier]`
- [ ] `acceptance-record.json`
- [ ] Stripe receipt PDF or screenshot

**Claim:** Terms accepted before payment (version, timestamp, record ID).

---

## 3. Intake folder — `Intake/` (5 min)

- [ ] `kickoff-*.txt` + client materials reply
- [ ] `scope-sent-*.txt` + `scope-confirmed-*.txt` (First Fix / Mini Build)

**Claim:** Client knew scope and authorized work.

---

## 4. Delivery folder — `Deliverables/` + `Acceptance/` (5 min)

- [ ] `delivery-*.txt` with date and acceptance deadline
- [ ] Loom link, screenshots, files
- [ ] Proof sent (Gmail Sent folder)

**Claim:** Service delivered; 7-day review window given.

---

## 5. Stripe narrative (10 min)

Paste and fill:

```text
The customer purchased [TIER] for $[AMOUNT] on [PAID DATE].

Before payment, the customer agreed to our Terms of Service and Refund Policy (version [TERMS VERSION], accepted at [ACCEPTED AT], record [ACCEPTANCE RECORD ID]).

The customer provided materials on [INTAKE DATE]. [First Fix/Mini Build only: Scope was confirmed on [SCOPE CONFIRMED AT].]

On [DELIVERED AT], we delivered:
- [DELIVERABLE 1]
- [DELIVERABLE 2]

Delivery was emailed to [SENT TO EMAIL] with acceptance deadline [ACCEPTANCE DEADLINE]. No material non-conformance was reported in time.

The service was performed within the limited scope of the purchased tier.
```

- [ ] Upload PDF bundle to Stripe
- [ ] Submit evidence

---

## 6. Lead evidence by dispute type

| Stripe reason | Lead with |
|---------------|-----------|
| Product not received | Delivery email + files + sent proof |
| Not as described | Scope confirmation + delivery bullets |
| Fraudulent | Acceptance audit + email thread + delivery to same address |
| Duplicate | Receipt refs — show single valid charge |

---

## 7. Close out

- [ ] Screenshot submission → `Payment/dispute-[YYYY-MM-DD]/`
- [ ] Sheet: **Dispute** → `Won` or `Lost` when resolved
- [ ] One-line post-mortem in **Notes**
- [ ] Sync backup: `CLIENT_MASTER_TRACKER.md`

---

## Missing evidence = likely loss

| Missing | Risk |
|---------|------|
| No delivery email archived | High |
| No scope confirmation (First Fix / Mini Build) | High |
| No acceptance audit match | High |
| Delivery email ≠ payer email | Medium |