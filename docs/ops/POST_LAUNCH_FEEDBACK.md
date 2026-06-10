# Post-Launch Feedback

> **Status:** Operational system frozen as of v1.1 launch.
> **Purpose:** Learn from the first 10 real clients. Do not redesign until patterns repeat.
> **Operator page:** `DAILY_OPERATIONS.md` — keep following it during this learning phase.

---

## 1. What to collect from the first 10 clients

Record these in the existing Google Sheet **Notes** column and/or `Clients/[slug]/Archive/closed-*.txt`. Do not create new trackers.

### Per client (minimum)

| Data point | Where it already lives | What to add in Notes |
|------------|------------------------|----------------------|
| Tier purchased | Sheet column E | — |
| Time payment → kickoff sent | Sheet Paid at + your memory | Minutes delayed, if any |
| Time kickoff → intake received | Sheet dates | Days waited |
| Scope confirmation needed? | Sheet Scope gate | Y/N, rounds of revision |
| Time intake → delivery | Sheet dates | Total calendar days |
| Delivery channel | `Acceptance/delivery-*.txt` | Email only, or also DM/text |
| Client replied after delivery? | Inbox | Y/N, nature of reply |
| Dispute or refund request? | Sheet Dispute | Y/N, outcome |
| Would you take this client again? | Notes | Yes / No / With changes |

### After each of the 10 (one paragraph)

Write in `Archive/closed-*.txt` or Notes:

```text
What they thought they bought:
What they actually needed:
What surprised me:
What took longer than expected:
Evidence gaps (if any):
```

### After client 10 (half-page summary)

Answer once in a plain text file `Clients/launch-feedback-summary.txt`:

- How many Friction Check / First Fix / Mini Build?
- Average days payment → delivery
- How many skipped scope confirmation or folder steps?
- Any disputes, chargebacks, or refund demands?
- Which email template caused the most back-and-forth?
- One thing that worked reliably
- One thing that broke repeatedly

---

## 2. Signs the workflow is working

| Signal | What it means |
|--------|---------------|
| Every paid client has a Sheet row within 15 min of payment | Payment reconciliation habit is holding |
| Every `Clients/` folder has `Payment/` populated before work starts | Golden rule is holding |
| Kickoff sent within 24h for all 10 | Payment → intake handoff is smooth |
| First Fix / Mini Build clients have `scope-confirmed-*.txt` before work | Scope gate is holding |
| Every delivery has `Acceptance/delivery-*.txt` same day as work | Delivery evidence chain is intact |
| `CLIENT_MASTER_TRACKER.md` backup synced after changes | Backup habit exists |
| No Stripe disputes, or disputes won with folder evidence | System is dispute-ready in practice |
| Clients reply to kickoff with materials without confusion | Offer language matches expectations |
| Acceptance deadlines pass without argument | Delivery email + 7-day window is understood |
| You can assemble a dispute packet in under 30 minutes | `DISPUTE_RESPONSE_CHECKLIST.md` matches reality |

**Working does not mean perfect.** It means you can find the file, send the email, and close the loop without improvising.

---

## 3. Signs the workflow is failing

| Signal | Likely failure |
|--------|----------------|
| Stripe payment with no matching Resend audit | Acceptance ↔ payment link breaking |
| Work started with empty `Payment/` or `Intake/` | Golden rule skipped — evidence hole |
| Delivery sent via text/DM only | "I never received it" exposure |
| First Fix completed with no `scope-confirmed-*.txt` | Scope dispute exposure |
| Sheet row missing or weeks out of date | Tracker is decorative, not operational |
| Same client email ≠ Stripe payer email, undocumented | Dispute narrative weak |
| Refund or chargeback you did not see coming | Expectation mismatch or delivery gap |
| You dread updating the Sheet | System too heavy or unclear — note why |
| Clients ask "is support included?" after delivery | Delivery or kickoff wording not landing |
| You cannot find acceptance record at dispute time | Audit trail not saved to folder |

**One failure is a mistake. The same failure 3+ times is a pattern worth fixing.**

---

## 4. Friction points to watch for

Watch these during the first 10 clients. Log in Notes when they happen.

### Payment → intake

- Client pays but never sends materials (how many days until follow-up?)
- Client sends materials before you send kickoff
- Wrong tier purchased (wanted First Fix, bought Friction Check)
- Shared inbox / spouse paid / email mismatch

### Scope

- Client will not reply `confirmed` — stalls project
- Client says `confirmed` then asks for more during work
- Job is obviously bigger than tier — did you stop and quote?

### Delivery

- Loom or file delivery feels awkward for client
- Client replies "thanks" vs "this isn't what I expected" — ratio matters
- Client asks for changes after acceptance deadline

### Your side (honest)

- Skipped folder save because busy
- Skipped Sheet update until end of week
- Did extra unpaid work to avoid awkward conversation
- Backup / screenshot step skipped on live edits

### Business signal

- Friction Check → First Fix upsell happened or not?
- Client ghosted after delivery
- Client asked for ongoing support
- Review or referral offered without asking

---

## 5. Questions to ask after each completed engagement

Send yourself an internal note (not to the client) before archiving. Copy into `Archive/closed-*.txt`.

### Operations (did the system work?)

1. Did I complete the payment workflow within 15 minutes?
2. Is every required file in the client folder?
3. Did I send all three emails that applied (kickoff, scope, delivery)?
4. Could I prove delivery to a stranger using only this folder?

### Expectations (did the offer match reality?)

5. Did the client understand what tier they bought?
6. Was anything left unsaid that caused friction?
7. Was the job actually inside the tier, or did I absorb scope creep?

### Evidence (would I win a dispute?)

8. Does payer email match delivery email?
9. Does delivery match scope confirmation (if applicable)?
10. Is there a gap I would not want Stripe to see?

### Learning (what to repeat or stop)

11. What would I do identically next time?
12. What would I not do again?
13. One sentence: worth it at this price?

### Optional — one client email (only if relationship is good)

After archive, optionally send:

```text
Quick question — no pressure: Was the process clear, and was the deliverable what you expected? One sentence is plenty.
```

Do not send if the engagement was contentious. Log reply in Notes.

---

## 6. When and how to update the system

**Rule:** Do not change templates, checklists, or workflow until the **same problem appears 3 times** across real clients — not from one bad experience or hypothetical worry.

### Frozen (do not touch during first 10)

- `DAILY_OPERATIONS.md`
- Email templates
- `DISPUTE_RESPONSE_CHECKLIST.md`
- Sheet schema
- Client folder structure
- Legal package v1.1

### Allowed without "3x pattern"

- Fix typos in templates
- Update `CLIENT_MASTER_TRACKER.md` backup rows
- Add one line to **Notes** column guidance in your head, not in docs

### Pattern threshold — update only when

| Pattern (3+ times) | Allowed change |
|--------------------|----------------|
| Clients confused about what to send after payment | Adjust kickoff email wording only |
| Scope replies never say `confirmed` | Adjust scope email instructions only |
| "Never received" or spam issues | Adjust delivery subject line or send timing only |
| Audit ↔ payment mismatch | Add one line to `DAILY_OPERATIONS.md` payment section only |
| Specific dispute type lost | Add one bullet to `DISPUTE_RESPONSE_CHECKLIST.md` only |
| Sheet column never used | Remove or relabel that column — not add new ones |

### How to make a change (when threshold met)

1. Write the pattern in `Clients/launch-feedback-summary.txt`:

   ```text
   Pattern: [what happened 3+ times]
   Evidence: Client IDs KW-...
   Proposed change: [one specific edit to one existing file]
   ```

2. Edit **one file only**
3. Note change date at bottom of edited file
4. Do not cascade changes to other docs the same day
5. Run next 5 clients on the new wording before any further edits

### What never to add from feedback alone

- New SaaS tools
- New templates or trackers
- New lifecycle stages
- New policy pages
- Webhooks or automations (unless chargebacks are actually happening and manual process failed)

### When to escalate outside ops docs

- Actual chargeback lost → attorney review of evidence packet, not new policies
- Client threatens legal action → attorney, not template rewrite
- Repeated "you broke my site" → tighten scope/backup ritual in existing scope email, not new workflow

---

## Closing rule

The first 10 clients are the curriculum. The frozen system is the syllabus. Change the syllabus only when the same lesson fails three times.

Until then: follow `DAILY_OPERATIONS.md`, log honestly in Notes and Archive, and summarize after client 10.