# Client Master Tracker

> **Canonical copy:** Google Sheet named `Killough Works — Client Master Tracker`
> **Backup copy:** This file (sync after every change)

**Rule:** No work starts until the row exists and `Payment/` + `Intake/` folders exist.

---

## Google Sheets setup (one-time)

1. Create a new Google Sheet: `Killough Works — Client Master Tracker`
2. Rename tab: `Clients`
3. Row 1: paste headers from [Import row](#import-row) below
4. Freeze row 1 and column A
5. Add data validation (see [Validation rules](#validation-rules))
6. Optional: conditional format `Acceptance deadline` when date is today or past and `Lifecycle` = `Acceptance Window`

**Import shortcut:** Upload `CLIENT_MASTER_TRACKER.csv` from this folder (headers only).

---

## Import row

Copy row 1 exactly:

```text
Client ID,Business,Client name,Client email,Tier,Lifecycle,Scope gate,Accepted at (UTC),Acceptance record ID,Paid at (UTC),Stripe receipt ref,Amount USD,Intake received,Scope confirmed at,Work started at,Delivered at,Sent to email,Acceptance deadline,Archived at,Folder path,Dispute,Notes
```

---

## Column schema

| Col | Header | Type | Required | Fill when |
|-----|--------|------|----------|-----------|
| A | Client ID | Text | Yes | Payment reconciled — `KW-YYYY-###` |
| B | Business | Text | Yes | Payment reconciled |
| C | Client name | Text | Yes | Payment reconciled |
| D | Client email | Email | Yes | Stripe payer email |
| E | Tier | Dropdown | Yes | Payment reconciled |
| F | Lifecycle | Dropdown | Yes | Every status change |
| G | Scope gate | Dropdown | Yes | Payment (`N/A` for Friction Check) |
| H | Accepted at (UTC) | Text | Yes | Payment reconciled — from Resend audit |
| I | Acceptance record ID | Text | Yes | Payment reconciled — from Resend audit |
| J | Paid at (UTC) | Text | Yes | Payment reconciled — from Stripe |
| K | Stripe receipt ref | Text | Yes | Payment reconciled — PI/charge/receipt # |
| L | Amount USD | Number | Yes | Payment reconciled |
| M | Intake received | Date | No | Client sends materials |
| N | Scope confirmed at | Date | If FF/MB | Client replies `confirmed` |
| O | Work started at | Date | No | Work begins |
| P | Delivered at | Date | No | Delivery email sent |
| Q | Sent to email | Email | No | Delivery email sent |
| R | Acceptance deadline | Date | No | Delivery email sent — delivered + 7 days |
| S | Archived at | Date | No | Acceptance window ends |
| T | Folder path | Text | Yes | Payment reconciled |
| U | Dispute | Dropdown | Yes | Default `None` |
| V | Notes | Text | No | Anytime |

---

## Validation rules

Apply to **all rows from row 2 down** (adjust range as you grow).

| Column | Validation |
|--------|------------|
| E — Tier | List: `Friction Check`, `First Fix`, `Mini Build` |
| F — Lifecycle | List: `Accepted Terms`, `Paid`, `Intake`, `Scope Confirmed`, `Work Performed`, `Delivered`, `Acceptance Window`, `Archived` |
| G — Scope gate | List: `N/A`, `Pending`, `Confirmed` |
| U — Dispute | List: `None`, `Open`, `Won`, `Lost` |

---

## Lifecycle values (use exactly)

```text
Accepted Terms → Paid → Intake → Scope Confirmed → Work Performed → Delivered → Acceptance Window → Archived
```

| Tier | Scope Confirmed stage |
|------|------------------------|
| Friction Check | Skip — use `N/A` in Scope gate |
| First Fix | Required before work |
| Mini Build | Required before work |

---

## Payment matching (every payment)

1. Stripe payment notification arrives
2. Find Resend email `Payment terms accepted: [Tier]` within **30 minutes before** payment time
3. Confirm **Offer** matches **Tier** and **Amount USD**
4. Copy `Record ID` → Acceptance record ID
5. Copy `Accepted At` → Accepted at (UTC)
6. If no match within 2 hours → **do not start work** — investigate first

---

## Markdown backup (sync from Sheet)

Update this table when you update the Sheet. One row per paying client.

| Client ID | Business | Client name | Client email | Tier | Lifecycle | Scope gate | Accepted at (UTC) | Acceptance record ID | Paid at (UTC) | Stripe receipt ref | Amount USD | Intake received | Scope confirmed at | Work started at | Delivered at | Sent to email | Acceptance deadline | Archived at | Folder path | Dispute | Notes |
|-----------|----------|-------------|--------------|------|-----------|------------|-------------------|----------------------|---------------|-------------------|------------|-----------------|-------------------|-----------------|--------------|---------------|---------------------|-------------|-------------|---------|-------|
| | | | | | | | | | | | | | | | | | | | | None | |

---

## Next Client ID

Assign sequentially. Check Sheet column A for highest `KW-YYYY-###`, then increment.

**Current counter (update manually):** `KW-2026-001`

---

## Related

- Daily steps: `DAILY_OPERATIONS.md`
- Lifecycle detail: `CLIENT_LIFECYCLE.md`
- Folders: `CLIENT_FOLDER_SOP.md`