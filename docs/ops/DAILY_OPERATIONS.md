# Daily Operations

> Follow this page. Do not improvise.
> **Sheet:** Google Sheet `Killough Works — Client Master Tracker`
> **Folders:** `Clients/YYYY-MM-business-slug/`
> **Templates:** `docs/ops/*_EMAIL_TEMPLATE.md`

---

## When a payment arrives

**Time: ~10 minutes. Do this before any work.**

1. Open **Stripe** — copy payer name, email, amount, date, receipt/PI ID
2. Open **Resend inbox** — find `Payment terms accepted: [Tier]` within 30 min before payment
3. Confirm tier and amount match
4. Assign next **Client ID** (`KW-YYYY-###`)
5. Create folder: `Clients/YYYY-MM-business-slug/`
6. Create subfolders: `Payment/` and `Intake/`
7. Save to `Payment/`:
   - Resend audit (paste → `audit-email.txt`)
   - Acceptance JSON (copy from `data/payment-acceptances.json` → `acceptance-record.json`)
   - Stripe receipt (PDF or screenshot)
8. Add row to **Google Sheet** — fill payment columns; **Lifecycle** → `Paid`; **Dispute** → `None`
9. Send **Kickoff Email** (pick Friction Check or First Fix/Mini Build body)
10. Save kickoff → `Intake/kickoff-YYYY-MM-DD.txt`
11. Sheet: **Lifecycle** → `Intake`
12. Sync `CLIENT_MASTER_TRACKER.md` backup

**Stop if:** No Resend audit match within 2 hours — investigate before kickoff.

---

## When a client replies

### Reply has materials (link, screenshot, notes)

1. Save reply → `Intake/client-reply-YYYY-MM-DD.txt`
2. Sheet: **Intake received** → today
3. **Friction Check:** Sheet **Lifecycle** → `Work Performed` · set **Work started at** · begin review
4. **First Fix / Mini Build:** Send **Scope Confirmation Email** · save → `Intake/scope-sent-YYYY-MM-DD.txt` · Sheet **Scope gate** → `Pending`

### Reply is `confirmed` (First Fix / Mini Build only)

1. Save reply → `Intake/scope-confirmed-YYYY-MM-DD.txt`
2. Sheet: **Scope gate** → `Confirmed` · **Scope confirmed at** → today · **Lifecycle** → `Scope Confirmed`
3. Sheet: **Work started at** → today · **Lifecycle** → `Work Performed`
4. Begin work (live edits: before screenshot → `Deliverables/`)

### Reply asks for more than tier includes

1. Do not start extra work
2. Reply: out of scope — offer new First Fix or quote
3. Note in Sheet **Notes**

### No reply after 7 days (stuck in Intake)

1. Send one follow-up
2. Still no materials → discuss refund per Refund Policy · note in **Notes**

---

## When work is delivered

**Time: ~15 minutes. Same day work finishes.**

1. Fill **Delivery Email** — concrete bullets, links, acceptance deadline (today + 7 days)
2. Send to **Stripe payer email** when possible
3. `Deliverables/` — Loom, screenshots, files
4. `Acceptance/delivery-YYYY-MM-DD.txt` — paste full sent email
5. Sheet: **Delivered at** → today · **Sent to email** → address used · **Acceptance deadline** → today + 7 days · **Lifecycle** → `Acceptance Window`
6. Sync `CLIENT_MASTER_TRACKER.md` backup

**When acceptance deadline passes with no material issue:**

1. `Archive/closed-YYYY-MM-DD.txt` — one-sentence summary
2. Sheet: **Archived at** → today · **Lifecycle** → `Archived`
3. Sync backup

---

## When a dispute arrives

**Time: ~30 minutes. Follow `DISPUTE_RESPONSE_CHECKLIST.md` exactly.**

1. Sheet: **Dispute** → `Open`
2. Pull row + folder for **Client ID**
3. Bundle: `Payment/` + `Intake/` + `Deliverables/` + `Acceptance/`
4. Fill Stripe narrative from checklist
5. Submit evidence in Stripe Dashboard
6. Screenshot confirmation → `Payment/dispute-YYYY-MM-DD/`
7. Sheet: **Dispute** → `Won` or `Lost` when closed
8. Sync backup

**Do not:** refund first, argue without files, or submit only generic terms.

---

## Morning scan (2 minutes)

- [ ] New Stripe payments overnight? → Run payment workflow
- [ ] Any **Acceptance deadline** today or past? → Archive
- [ ] Any **Intake** stuck > 7 days? → Follow up
- [ ] Any **Dispute** = `Open`? → Check Stripe status