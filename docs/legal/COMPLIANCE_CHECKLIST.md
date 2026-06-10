# Killough Works — Website Compliance Checklist

> **Disclaimer:** Draft prepared for operational use. Not legal advice. Have a licensed New Jersey attorney review before publication.

**Effective date:** [EFFECTIVE DATE]  
**Business:** Jonathan Killough d/b/a Killough Works  
**Site:** https://killough.works (or `NEXT_PUBLIC_SITE_URL`)

---

## How to use this checklist

Track each item as **Not started**, **Drafted**, **Hardened**, **Attorney reviewed**, or **Live on site**. Do not treat the site as launch-ready for paid traffic until all **Required** items are **Attorney reviewed** and critical launch blockers are resolved.

**Current phase:** Phase 1.5 complete (document hardening). **Next gate:** NJ attorney review. **Then:** Phase 2 site integration (payment checkbox first).

---

## Phase 1.5 hardening (complete)

| Item | Status | Location |
|------|--------|----------|
| Limited-Scope Engagement ($35 / $75) | Hardened | Terms §6.5; Refund §3–4; Service Agreement §2.4 |
| Backup sole responsibility | Hardened | Terms §8.1; Service Agreement §3 |
| Authorization to modify systems | Hardened | Terms §8.2; Service Agreement §3 |
| Deemed acceptance (7 days) | Hardened | Terms §8.3; Service Agreement §7 |
| Chargeback contact-first | Hardened | Terms §7.5; Refund §6; Service Agreement §4.6 |
| Platform access / credentials | Hardened | Terms §12.1; Service Agreement §3 |
| Liability cap alignment | Hardened | Terms §15; Service Agreement §12 (`max(fees, $100)`) |
| Provider Materials IP clarifier | Hardened | IP Policy §4.1; Service Agreement §9 |

---

## Required pages (before accepting paid traffic)

| Page / document | Why it is needed | Status | File |
|-----------------|------------------|--------|------|
| Terms of Service | Governs site use, service descriptions, liability limits, dispute process, governing law | Hardened — attorney review pending | [TERMS_OF_SERVICE.md](./TERMS_OF_SERVICE.md) |
| Privacy Policy | Required when collecting name, email, business info, and project details via intake form | Drafted | [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) |
| Refund Policy | Reduces chargeback risk; sets expectations for $35 / $75 / $150+ tiers | Hardened — attorney review pending | [REFUND_POLICY.md](./REFUND_POLICY.md) |
| Business / legal notice | Identifies operator, location, contact email | Partial (footer has contact only) | Terms §1 + footer update needed |

---

## Strongly recommended for this business model

| Page / document | Why it is needed | Status | File |
|-----------------|------------------|--------|------|
| AI Disclosure | AI-assisted dev is core to positioning; clients must understand limitations | Drafted | [AI_DISCLOSURE.md](./AI_DISCLOSURE.md) |
| Intellectual Property Policy | Prevents disputes over code, automations, prompts, and deliverables | Drafted | [INTELLECTUAL_PROPERTY_POLICY.md](./INTELLECTUAL_PROPERTY_POLICY.md) |
| Accessibility Statement | Demonstrates good faith; separates your site commitment from client project scope | Drafted | [ACCESSIBILITY_STATEMENT.md](./ACCESSIBILITY_STATEMENT.md) |
| Service Agreement (client contract) | Website Terms alone do not replace project-specific scope and payment terms | Hardened — attorney review pending | [SERVICE_AGREEMENT_TEMPLATE.md](./SERVICE_AGREEMENT_TEMPLATE.md) |
| Risk Assessment (internal) | Operational guide; not public | Drafted | [RISK_ASSESSMENT.md](./RISK_ASSESSMENT.md) |

---

## Commonly overlooked by freelancers

| Item | Why freelancers skip it | Killough Works status |
|------|-------------------------|------------------------|
| Pre-checkout terms acceptance | Assumes payment implies consent | **Not implemented** — add to `/pay` and Stripe path |
| Separate Service Agreement from website ToS | ToS is browse-wrap; projects need SOW | Template drafted; not yet used in workflow |
| Client responsibilities / acceptable use | Who provides lawful content, backups, access | Hardened in ToS §8–8.3 and Service Agreement §3 |
| Subprocessor disclosure | Clients ask where data goes | In Privacy Policy §5 |
| Data retention and deletion procedure | GDPR-style expectations spreading to US SMBs | In Privacy Policy §7 |
| Dispute resolution ladder | Avoids jumping straight to litigation | In ToS §15 |
| Electronic communications consent | Email/SMS project comms | In ToS §16 |
| Portfolio / demo disclaimer | Mockups mistaken for deliverables | **Not on site** — add to `/demos` |
| Deposit vs. milestone payment terms | Critical for Mini Build $150+ | Refund Policy + Service Agreement |
| Stripe redirect disclosure | User leaves site for payment | In Privacy Policy + ToS §7 |
| Cookie notice | Required if analytics added | **Not needed today** — no analytics; statement in Privacy Policy |
| Chargeback cooperation process | Stripe disputes | In Refund Policy §6 |
| Credential handling policy | Security expectation | Business Recommendations + onboarding |
| Insurance documentation | Some clients require COI | Not yet obtained — see Business Recommendations |
| LLC entity on legal pages | Liability separation | Placeholder in all docs — update after formation |

---

## Site implementation checklist (Phase 2)

These items are **not** in the markdown deliverable but required before the site is compliant in practice.

### Footer and navigation

- [ ] Add legal links to homepage footer (`src/app/page.tsx`)
- [ ] Add legal links to pay page (`src/app/pay/page.tsx`)
- [ ] Add legal links to paid confirmation page (`src/app/paid/page.tsx`)
- [ ] Add legal links to demos pages (`src/app/demos/`)
- [ ] Create public routes: `/terms`, `/privacy`, `/refund`, `/ai-disclosure`, `/intellectual-property`, `/accessibility`

### Payment flow

- [ ] Add text near Stripe buttons: "By paying, you agree to the [Terms of Service] and [Refund Policy]."
- [ ] Migrate payment follow-up email from personal Gmail to `hello@killough.works` or `jonathan@killough.works`
- [ ] Configure Stripe payment link descriptions to match published Refund Policy

### Intake form

- [ ] Add consent line: "By submitting, you agree to the [Privacy Policy]."
- [ ] Confirm Resend sender domain is verified for production
- [ ] Document data retention in internal SOP

### Demos and marketing

- [ ] Add banner or note on demo catalog: illustrative mockups, not included in tier pricing unless scoped
- [ ] When adding real case studies, obtain written portfolio permission

### Analytics (if added later)

- [ ] Update Privacy Policy analytics section
- [ ] Add cookie banner / consent mechanism
- [ ] Update this checklist

---

## Launch blockers (current)

| # | Blocker | Severity | Owner action |
|---|---------|----------|--------------|
| 1 | No legal pages linked from site | Critical | Phase 2 site integration |
| 2 | No pre-checkout terms acceptance | Critical | Add pay page copy |
| 3 | No published refund policy at point of sale | Critical | Publish + link at `/pay` |
| 4 | Personal Gmail on paid page for payment follow-up | High | Update `paymentFollowUpContact` in `site.ts` |
| 5 | No attorney review of drafts | High | Engage NJ business attorney |
| 6 | LLC not formed | Medium | Form before scaling volume |

---

## Attorney review checklist

Before publishing any document live, have a licensed New Jersey attorney review:

- [ ] Limitation of liability and damages exclusion enforceability
- [ ] Refund Policy vs. NJ consumer protection expectations for digital services
- [ ] IP assignment language and work-for-hire characterization
- [ ] Arbitration vs. litigation clause (if added)
- [ ] Privacy Policy completeness for current and planned data practices
- [ ] AI disclosure sufficiency for your actual toolchain
- [ ] Service Agreement template as binding contract for your engagements
- [ ] Entity name update after LLC formation

---

## Publication order (recommended)

1. Terms of Service  
2. Privacy Policy  
3. Refund Policy  
4. AI Disclosure  
5. Intellectual Property Policy  
6. Accessibility Statement  
7. Service Agreement Template (client-facing PDF or separate signing flow — not necessarily a public page)

---

## Related documents

- [README](./README.md) — master index
- [Business Recommendations](./BUSINESS_RECOMMENDATIONS.md) — LLC, insurance, operations

---

*Last updated: [EFFECTIVE DATE]*