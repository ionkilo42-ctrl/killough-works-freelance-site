# Scope Confirmation Email — Final

> **First Fix and Mini Build only.** Skip for Friction Check.
> **Hard rule:** No CMS login, deploy, or production change until client replies `confirmed`.

---

## Subject

```text
Confirming scope — [BUSINESS NAME] — [CLIENT ID]
```

---

## Body

```text
Hi [CLIENT FIRST NAME],

Before I start your [First Fix / Mini Build], confirming scope:

Client reference: [CLIENT ID]
Offer paid: [TIER] — $[AMOUNT]

In scope (this engagement only):
- [DELIVERABLE 1 — one specific item]
- [DELIVERABLE 2 — only if truly included]
- Delivery format: [live change / Loom walkthrough / written instructions / file handoff]

Out of scope (unless we add a separate change order):
- Ongoing support, maintenance, or monitoring
- Full redesign or unlimited revisions
- Additional pages, features, or integrations not listed above
- Fixes for issues caused by third-party updates after delivery

Backup note:
You are responsible for backups before live changes. Reply "backup confirmed" if you have a current backup. Reply "proceed without backup" if you want me to proceed without verifying one.

To authorize this specific work, reply with:
confirmed

If anything above does not match what you expect, reply before I start.

— Jonathan
Killough Works
jonathan@killough.works
```

---

## After send

| Step | Action |
|------|--------|
| 1 | Save sent email → `Intake/scope-sent-[YYYY-MM-DD].txt` |
| 2 | Sheet: **Scope gate** → `Pending` |

---

## When client replies

| Reply | Action |
|-------|--------|
| `confirmed` | Save reply → `Intake/scope-confirmed-[YYYY-MM-DD].txt` · Sheet: **Scope gate** → `Confirmed` · **Scope confirmed at** → today · **Lifecycle** → `Scope Confirmed` |
| Questions or changes | Revise and resend. Do not start work. |
| Scope too large | Quote upgrade or refund. Note in **Notes**. |