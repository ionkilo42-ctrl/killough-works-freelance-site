# Killough Works — Legal & Compliance Document Index

> **Disclaimer:** All documents in this folder are drafts prepared for operational use. They are **not legal advice**. Have a licensed New Jersey attorney review before publication.

**Business:** Jonathan Killough d/b/a Killough Works  
**Location:** South Jersey, New Jersey, United States  
**Contact:** jonathan@killough.works  
**Planned entity:** LLC — update placeholders after formation  
**Package version:** 1.1 (Phase 1.5 hardened)

---

## Risk-reducer priority

### Tier 1 (highest value)

1. Payment assent before Stripe — **Phase 2, after attorney gate**
2. Service Agreement for Mini Builds — **template hardened; use operationally**
3. Backup responsibility — **Phase 1.5 done**
4. Credential / platform-access language — **Phase 1.5 done**
5. Authorization to modify systems — **Phase 1.5 done**
6. Chargeback language — **Phase 1.5 done**
7. Limited-Scope Engagement ($35 / $75) — **Phase 1.5 done**

### Tier 2

8. Deemed acceptance — **Phase 1.5 done**
9. Liability-cap consistency — **Phase 1.5 done**
10. Footer links + legal routes — **Phase 2**

### Tier 3 (when regular paying clients)

11. LLC formation  
12. E&O insurance

---

## Phase 1.5 changelog (v1.1)

- Terms: Limited-Scope Engagement §6.5; backup §8.1; authorization §8.2; acceptance §8.3; chargebacks §7.5; platform access §12.1
- Service Agreement: v1.1; mirrors Terms protections; liability cap aligned; Mini Build signing requirement
- Refund Policy: Limited-Scope notes; expanded chargeback obligation
- IP Policy: Provider Materials ownership clarifier

**Do not publish or integrate into site until NJ attorney reviews the four protection documents.**

---

## Document library

| Document | Audience | Publish on site? |
|----------|----------|------------------|
| [RISK_ASSESSMENT.md](./RISK_ASSESSMENT.md) | Internal (you) | No |
| [COMPLIANCE_CHECKLIST.md](./COMPLIANCE_CHECKLIST.md) | Internal (you) | No |
| [TERMS_OF_SERVICE.md](./TERMS_OF_SERVICE.md) | Public | Yes → `/terms` |
| [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) | Public | Yes → `/privacy` |
| [REFUND_POLICY.md](./REFUND_POLICY.md) | Public | Yes → `/refund` |
| [AI_DISCLOSURE.md](./AI_DISCLOSURE.md) | Public | Yes → `/ai-disclosure` |
| [INTELLECTUAL_PROPERTY_POLICY.md](./INTELLECTUAL_PROPERTY_POLICY.md) | Public | Yes → `/intellectual-property` |
| [ACCESSIBILITY_STATEMENT.md](./ACCESSIBILITY_STATEMENT.md) | Public | Yes → `/accessibility` |
| [SERVICE_AGREEMENT_TEMPLATE.md](./SERVICE_AGREEMENT_TEMPLATE.md) | Client signing | No (use per project) |
| [BUSINESS_RECOMMENDATIONS.md](./BUSINESS_RECOMMENDATIONS.md) | Internal (you) | No |

---

## Before you publish

### 1. Replace placeholders

- `[EFFECTIVE DATE]` — set to publication date in every file  
- `[LEGAL ENTITY NAME AFTER LLC FORMATION]` — after LLC is formed  
- `[LLC ADDRESS]` — in Service Agreement template  

### 2. Attorney review checklist (send these four first)

- [ ] [TERMS_OF_SERVICE.md](./TERMS_OF_SERVICE.md) — Limited-Scope, authorization-to-modify, deemed acceptance, chargebacks, backups  
- [ ] [SERVICE_AGREEMENT_TEMPLATE.md](./SERVICE_AGREEMENT_TEMPLATE.md) — alignment with Terms; Mini Build workflow  
- [ ] [REFUND_POLICY.md](./REFUND_POLICY.md) — tier rules + chargeback contact-first  
- [ ] [INTELLECTUAL_PROPERTY_POLICY.md](./INTELLECTUAL_PROPERTY_POLICY.md) — ownership layer (already aligned; confirm with counsel)  
- [ ] Limitation of liability enforceability (`max(fees, $100)`)  
- [ ] Dispute resolution (litigation vs. mediation vs. arbitration)

### 3. Site integration (Phase 2 — after attorney approval)

Build order (payment flow first):

1. Legal routes: `/terms`, `/privacy`, `/refund` (minimum for checkbox links)  
2. **Payment checkbox gate** on `/pay` — disable Stripe until Terms + Refund accepted  
3. Same gate on homepage Stripe CTAs if applicable  
4. Shared footer legal links  
5. Intake form Privacy Policy consent  
6. Migrate payment follow-up email to killough.works domain

See [COMPLIANCE_CHECKLIST.md](./COMPLIANCE_CHECKLIST.md) for full implementation tracker.

---

## Recommended publication order

1. Terms of Service  
2. Privacy Policy  
3. Refund Policy  
4. AI Disclosure  
5. Intellectual Property Policy  
6. Accessibility Statement  

Keep Service Agreement as an internal template until a client engagement requires it.

---

## Related project files

- Site offers and tiers: `src/data/site.ts`  
- Intake form fields: `src/components/lead-form.tsx`  
- Intake API: `src/app/api/intake/route.ts`  
- Payment hub: `src/app/pay/page.tsx`  
- Launch plan copy: `FREELANCE_LAUNCH_PLAN.md`  

---

## Plan archive

A copy of the planning document is saved at:

`/Users/jonathankillough/Downloads/killough-works-legal-compliance-plan.md`

---

*Package v1.1 — Phase 1.5 hardened: June 2026*