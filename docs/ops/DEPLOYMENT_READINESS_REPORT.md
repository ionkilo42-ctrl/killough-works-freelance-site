# Deployment Readiness Report — v1.1 Candidate

> **Generated:** 2026-06-10  
> **Status:** Ready for preview deployment (not deployed)  
> **Phase:** 2A complete

---

## Summary

| Check | Result |
|-------|--------|
| Production build | **Pass** (29 static pages) |
| Unit tests | **Pass** (40/40) |
| Legal routes | **6/6 return 200** — no Terms cross-link 404s |
| Payment gate | **Pass** (unit tests + API 200) |
| Public placeholders | **Removed** from `src/content/legal/v1.1/` |
| Readability overlays | **Reduced** in `globals.css` |

---

## Routes (complete list)

| Route | Status |
|-------|--------|
| `/` | 200 |
| `/pay` | 200 |
| `/paid` | 200 |
| `/terms` | 200 |
| `/privacy` | 200 |
| `/refund` | 200 |
| `/ai-disclosure` | 200 |
| `/intellectual-property` | 200 |
| `/service-agreement` | 200 |
| `/demos` | 200 |
| `/demos/missed-call-quote-form` | SSG |
| `/demos/pressure-washing-quote` | SSG |
| `/demos/junk-removal-request` | SSG |
| `/demos/landscaping-request` | SSG |
| `/demos/service-booking-flow` | SSG |
| `/demos/deposit-payment-flow` | SSG |
| `/demos/estimate-approval-flow` | SSG |
| `/demos/review-request-flow` | SSG |
| `/demos/customer-reactivation` | SSG |
| `/demos/lead-follow-up-dashboard` | SSG |
| `/demos/local-service-landing-page` | SSG |
| `/demos/live-bible-companion` | SSG |
| `/field-notes` | 200 |
| `/api/intake` | Dynamic |
| `/api/payment-acceptance` | Dynamic |
| `/apple-icon.png` | Static |
| `/icon.png` | Static |

**Terms cross-links verified (no 404):**

- `/privacy` · `/refund` · `/ai-disclosure` · `/intellectual-property` · `/service-agreement`

---

## Phase 2A changes

### 1. Legal cross-links

- Added routes from existing `docs/legal/` content:
  - `/ai-disclosure`
  - `/intellectual-property`
  - `/service-agreement` (linked from Terms and Refund)
- Updated `src/data/legal.ts`, `src/content/legal/v1.1/`, manifest

### 2. Readability

- Reduced overlay opacity on `.section-tray::before`, card `::before`, `.console-form::before`
- Replaced `.contact-console::after` full white wash with border-only overlay
- Added `z-index` stacking so content sits above decorative layers

### 3. Public placeholders removed

- **Effective date:** June 10, 2026 (all v1.1 published docs)
- **LLC placeholders:** Removed from published content
- **Inline `[ATTORNEY REVIEW]` blocks:** Removed from published content
- **Intentional public disclaimer retained:** Legal page footer + top draft disclaimer

### 4. Verification

```text
npm run test:unit  → 40 passed
npm run build      → success, 29 pages
localhost routes   → all legal + payment API 200
```

---

## Payment gate

| Component | Status |
|-----------|--------|
| `PaymentTermsCheckbox` | Unit tests pass |
| `GatedStripeButton` | Disabled until checked; logs before Stripe |
| `POST /api/payment-acceptance` | Returns 200 locally |
| Resend audit email | Requires `RESEND_API_KEY` + inbox vars on deploy host |

**Local `.env.local`:** Stripe URLs configured; Resend **not** configured (acceptance saves locally).

**Production requirement before first client:** Set on Vercel:

- `RESEND_API_KEY`
- `INTAKE_TO_EMAIL`
- `INTAKE_FROM_EMAIL`

---

## Pre-deploy checklist (operator)

- [ ] Commit and push v1.1 candidate
- [ ] Confirm Vercel env vars (Stripe + Resend)
- [ ] Deploy preview URL
- [ ] Smoke test: checkbox → API → Stripe on preview
- [ ] Confirm Resend audit email arrives
- [ ] Set up Google Sheet tracker (`docs/ops/CLIENT_MASTER_TRACKER.md`)

---

## Not in this release

- `/accessibility` route (not linked from published Terms)
- `docs/legal/` source files still contain draft placeholders (not served)
- `outputs/`, `.codex-artifacts/`, `.tmp/` — do not commit

---

## Git status summary

See `GIT_STATUS_SUMMARY.md` in this folder (generated with this pass).