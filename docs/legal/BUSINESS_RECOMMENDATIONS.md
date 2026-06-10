# Business Recommendations — Risk Management & Operations

> **Disclaimer:** Draft prepared for operational use. Not legal advice. Have a licensed New Jersey attorney and qualified insurance broker review before acting.

**Effective date:** [EFFECTIVE DATE]  
**Prepared for:** Jonathan Killough d/b/a Killough Works

---

## Executive summary

Killough Works is well positioned as a focused freelance technology business, but it currently operates with **high legal-operational exposure** typical of solo freelancers: no live policy pages, no pre-payment terms acceptance, tiered offers without signed scope for larger work, mixed personal/business email on payment follow-up, and no LLC or insurance yet.

This document prioritizes practical protections that reduce the risks identified in [RISK_ASSESSMENT.md](./RISK_ASSESSMENT.md).

---

## Priority action list

| Priority | Action | Timeline |
|----------|--------|----------|
| 1 | Attorney review of legal docs in `docs/legal/` | Before publishing live |
| 2 | Publish policies on site + footer links | Launch blocker |
| 3 | Add checkout terms acknowledgment on `/pay` | Launch blocker |
| 4 | Use Service Agreement for First Fix / Mini Build | Before next custom client |
| 5 | Form NJ LLC | Before scaling paid volume |
| 6 | Obtain technology E&O insurance | Before accessing client production systems |
| 7 | Consolidate email to killough.works domain | This week |
| 8 | Client onboarding checklist + folder structure | Immediate |

---

## 1. Entity formation (LLC)

### Recommendation

Form a **New Jersey Limited Liability Company** before significantly scaling paid engagements.

### Why

- Separates personal assets from business liabilities in many scenarios
- Presents a more professional contracting party to clients
- Simplifies banking, Stripe identity, insurance, and tax reporting
- Makes policy updates cleaner than sole proprietorship d/b/a language

### Steps

1. Choose legal name (e.g., Killough Works LLC) and confirm availability  
2. File Certificate of Formation with NJ Division of Revenue  
3. Obtain EIN from IRS  
4. Adopt operating agreement (even as single-member LLC)  
5. Open business bank account  
6. Update Stripe, Resend, domain WHOIS/billing, and all legal docs  
7. Register for NJ tax obligations as applicable  
8. Check local home-occupation / zoning if working from home  

**[ATTORNEY REVIEW]:** Confirm NJ filing, registered agent, and tax registration requirements.

### After formation

Replace `[LEGAL ENTITY NAME AFTER LLC FORMATION]` placeholders in all `docs/legal/` files and republish.

---

## 2. Insurance

### Technology E&O / professional liability (priority)

**Covers:** Negligence claims arising from professional services — bad advice, flawed implementation, missed scope, some IP allegations.

**Why you need it:** You touch client revenue paths (forms, booking, payments, automations).

**Target:** Discuss $1M per occurrence with your broker; adjust based on client size and project value.

### Cyber liability (recommended)

**Covers:** Data incidents, breach response, some regulatory costs.

**Why you need it:** You handle client credentials, customer form data in builds, and business information via intake.

### General liability (optional for remote-only)

Lower priority if you do not visit client premises or host in-person events.

### Workers' compensation

Not applicable as solo operator with no employees.

### How to buy

Contact a broker familiar with **technology freelancers / consultants**. Ask specifically for **E&O with media/web development and consulting** coverage. Request a Certificate of Insurance (COI) template for clients who ask.

---

## 3. Contract practices

### Website layer

- Publish [Terms of Service](./TERMS_OF_SERVICE.md), [Privacy Policy](./PRIVACY_POLICY.md), [Refund Policy](./REFUND_POLICY.md)  
- Link policies in footer on all major pages  
- Add near Stripe CTAs: "By paying, you agree to Terms and Refund Policy."

### Project layer

| Offer | Minimum contract practice |
|-------|---------------------------|
| Friction Check ($35) | Published policies + Stripe acknowledgment + delivery email confirming scope |
| First Fix ($75) | Short written scope email or lightweight Service Agreement |
| Mini Build ($150+) | Full [Service Agreement](./SERVICE_AGREEMENT_TEMPLATE.md) before expanded work |
| Custom / retainer | Signed Agreement + change orders |

### Change orders

Use Appendix A in the Service Agreement for any scope expansion. Never absorb open-ended work silently.

### Out-of-scope template

When declining expanded work, email:

> "That falls outside the [tier] scope we agreed. I can quote it as a change order or separate Mini Build milestone."

This matches your FAQ tone but creates a paper trail.

---

## 4. Record-keeping

### Per-client folder structure

```
clients/
  [YYYY-MM-client-name]/
    intake.json or intake-email.pdf
    stripe-receipt.pdf
    service-agreement-signed.pdf
    scope-and-change-orders/
    deliverables/
    comms-export/
    access-log.txt
    closeout-checklist.md
```

### What to retain

| Record | Retention |
|--------|-----------|
| Signed agreements | 7+ years |
| Invoices and Stripe receipts | 7 years |
| Delivery proof (email, Loom, git) | 7 years |
| Intake inquiries not converted | 24 months |
| Credentials | Only in password manager; never plaintext email |

### Delivery proof habits

- Send delivery email with bullet summary of what was done  
- Link to Loom/video or PR/deployment where applicable  
- State review window and acceptance terms  
- Archive a copy in the client folder same day  

---

## 5. Client onboarding procedures

### Pre-flight checklist (send after payment)

1. Confirm purchased tier and one-sentence scope  
2. Request target URL, screenshots, or assets  
3. Confirm backup for live changes  
4. Confirm access method (preferred: platform invite, not password email)  
5. Share [AI Disclosure](./AI_DISCLOSURE.md) link  
6. Confirm single decision-maker and expected response time  
7. Confirm third-party accounts remain in client name  

### Platform access letter (optional one-pager)

Client acknowledges Killough Works may modify specified pages/systems for the scoped fix, that client maintains backups, and that out-of-scope work requires a change order.

### Credential policy

- Use a password manager (1Password, Bitwarden, etc.)  
- Revoke access at project close  
- Document access granted/revoked dates  

---

## 6. Payment and finance hygiene

1. Move payment follow-up off `ionkilo42@gmail.com` to `hello@killough.works` or `jonathan@killough.works`  
2. Run all client revenue through business bank account  
3. Keep Stripe descriptor recognizable (KILLOUGH WORKS)  
4. Match Stripe product descriptions to published offer language  
5. Set aside estimated taxes quarterly  
6. Track income by offer tier for pricing decisions  

---

## 7. Privacy and data operations

1. Publish [Privacy Policy](./PRIVACY_POLICY.md)  
2. Add intake form consent line  
3. Verify Resend domain for production sending  
4. Document subprocessors: Stripe, Resend, Vercel, Google Fonts  
5. Define deletion process when clients request removal  
6. If adding analytics later, update Privacy Policy and add cookie notice  

---

## 8. AI governance (lightweight)

1. Publish [AI Disclosure](./AI_DISCLOSURE.md)  
2. Mention AI in onboarding email for transparency  
3. Keep a private list of tools used (ChatGPT, Claude, Copilot, etc.)  
4. Avoid pasting client secrets into AI tools  
5. Human-review all client-facing output before delivery  

---

## 9. Marketing and portfolio discipline

1. Label demos as illustrative on `/demos`  
2. Do not imply mockups are included in $35/$75 tiers  
3. Obtain written portfolio permission before publishing real client work  
4. Keep before/after claims factual and supportable  
5. Replace illustrative gallery entries with permissioned case studies over time  

---

## 10. Accessibility and quality

1. Publish [Accessibility Statement](./ACCESSIBILITY_STATEMENT.md)  
2. Only promise WCAG compliance when scoped and priced  
3. Run basic keyboard/contrast checks on client deliverables when feasible  
4. Document known limitations in delivery email  

---

## 11. When to escalate to counsel

Engage a New Jersey attorney when:

- A client threatens litigation or sends a demand letter  
- A chargeback exceeds $500 or involves allegations of site breakage  
- You begin handling regulated data (health, financial, children)  
- You hire subcontractors or employees  
- You enter a partnership or revenue-share deal  
- You expand into EU/UK clients with formal GDPR expectations  

---

## 12. Suggested 30-day rollout

### Week 1
- Attorney consult with printed `docs/legal/` packet  
- Consolidate business email  
- Create `clients/` folder template  

### Week 2
- Publish policies on site (Phase 2 integration)  
- Add pay page terms acknowledgment  
- Update Stripe descriptions  

### Week 3
- Form LLC (if counsel agrees)  
- Open business bank account  
- Quote E&O insurance  

### Week 4
- Use Service Agreement on next Mini Build  
- Add demo disclaimer banner  
- Complete first client closeout using checklist  

---

## Document index

- [Risk Assessment](./RISK_ASSESSMENT.md)  
- [Compliance Checklist](./COMPLIANCE_CHECKLIST.md)  
- [Terms of Service](./TERMS_OF_SERVICE.md)  
- [Privacy Policy](./PRIVACY_POLICY.md)  
- [Refund Policy](./REFUND_POLICY.md)  
- [AI Disclosure](./AI_DISCLOSURE.md)  
- [Service Agreement Template](./SERVICE_AGREEMENT_TEMPLATE.md)  
- [Intellectual Property Policy](./INTELLECTUAL_PROPERTY_POLICY.md)  
- [Accessibility Statement](./ACCESSIBILITY_STATEMENT.md)  

---

*Last updated: [EFFECTIVE DATE]*