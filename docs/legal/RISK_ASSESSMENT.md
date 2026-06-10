# Killough Works — Risk Assessment

> **Disclaimer:** Draft prepared for operational use. Not legal advice. Have a licensed New Jersey attorney review before publication.

**Effective date:** [EFFECTIVE DATE]  
**Business:** Jonathan Killough d/b/a Killough Works  
**[UPDATE AFTER LLC FORMATION]:** [LEGAL ENTITY NAME AFTER LLC FORMATION]  
**Location:** South Jersey, New Jersey, United States  
**Contact:** jonathan@killough.works

---

## Executive summary

Killough Works is a solo-operated freelance technology business offering web fixes, AI-assisted development, automation, and digital consulting to local service businesses and creators. The business collects personal information through intake forms, accepts payments via Stripe, and may receive client platform credentials to perform fixes.

This assessment identifies realistic liability exposures ranked by severity, with scenarios where a client could seek damages, chargebacks, or legal action. Highest-priority gaps today: **no published Terms of Service or Privacy Policy**, **no pre-payment contractual acceptance**, **unclear scope boundaries on tiered offers**, and **no documented refund or IP transfer rules**.

---

## Severity scale

| Level | Meaning |
|-------|---------|
| **Critical** | Could produce significant financial loss, business interruption, or reputational damage; address before scaling paid volume |
| **High** | Likely dispute vector in normal operations; needs contract + policy coverage |
| **Medium** | Manageable with good process; becomes serious if ignored repeatedly |
| **Lower** | Worth tracking; escalate if business model changes |

---

## Critical risks

### 1. Scope creep and mismatched expectations on tiered offers

**Exposure:** Clients purchase Friction Check ($35), First Fix ($75), or Mini Build ($150+) but expect outcomes beyond the stated tier — full redesign, unlimited revisions, ongoing support, or production-grade systems matching demo mockups.

**Realistic dispute scenarios:**
- Client pays $75 for First Fix, then claims you agreed to rebuild their entire WordPress site.
- Client pays $150 Mini Build starter payment and refuses additional fees for work beyond confirmed scope.
- Client initiates Stripe chargeback alleging "services not as described" when deliverable was a Loom teardown, not implementation.

**Potential damages sought:** Full refund + cost of hiring another developer + alleged lost leads/revenue.

**Mitigations:** Published Refund Policy; Service Agreement with explicit in/out-of-scope tables; written scope confirmation before Mini Build expansion; delivery documentation (timestamped email, Loom link, git commit).

---

### 2. Site breakage or downtime during fixes

**Exposure:** You modify a client's live website, form, booking flow, or payment path and inadvertently break checkout, contact forms, analytics, or mobile layout.

**Realistic dispute scenarios:**
- Contact form stops delivering leads for 48 hours after your change; client blames you for lost jobs.
- Stripe or booking button removed during CTA rewrite; client claims direct revenue loss.
- Plugin or theme update performed without backup causes white screen.

**Potential damages sought:** Refund of your fee + cost of emergency developer + consequential business damages.

**Mitigations:** Client backup confirmation in writing; staging/test where possible; change log; limitation of liability in Terms and Service Agreement; technology E&O insurance.

**[ATTORNEY REVIEW]:** Enforceability of consequential-damage exclusions for negligent workmanship varies by facts and contract language.

---

### 3. No limitation of liability before payment

**Exposure:** Stripe checkout currently proceeds without click-wrap acceptance of Terms of Service. Clients may later argue they never agreed to liability caps, disclaimers, or dispute process.

**Realistic dispute scenarios:**
- Client follows a Friction Check recommendation, implements it poorly, and sues claiming your advice caused harm.
- Client alleges your audit missed a security issue and seeks damages far exceeding $35 fee.

**Potential damages sought:** Uncapped negligence or misrepresentation claims.

**Mitigations:** Link Terms and Refund Policy at pricing and pay pages; add checkout acknowledgment language; retain payment + terms acceptance records.

---

### 4. Missing privacy disclosures while collecting PII

**Exposure:** The intake form collects name, email, business name, website/social links, service interest, and free-text project details. Production delivery uses Resend; hosting uses Vercel. No Privacy Policy is published.

**Realistic dispute scenarios:**
- Client asks where their data is stored and you have no documented answer.
- Regulatory or platform inquiry (less common for micro-business, but increasing expectation under state privacy laws).

**Potential damages sought:** Regulatory penalties (context-dependent); reputational harm; client refusal to proceed.

**Mitigations:** Publish Privacy Policy; footer links; intake form consent line; subprocessor list; data retention schedule.

---

## High risks

### 5. AI-assisted output errors

**Exposure:** AI tools may assist with copy, code, workflow design, research, or prototyping. Outputs can be inaccurate, non-compliant, insecure, or stylistically wrong.

**Realistic dispute scenarios:**
- Client publishes AI-drafted service copy with factual errors and receives complaints.
- Automation built with AI assistance misfires and messages wrong customers.
- Client claims they were not informed AI was used.

**Mitigations:** AI Disclosure page; human review before delivery; client review obligation before publish/deploy; no-guarantee language in Terms.

---

### 6. Intellectual property ownership disputes

**Exposure:** Unclear ownership of source code, templates, prompts, reusable components, automation flows, and documentation.

**Realistic dispute scenarios:**
- Client refuses final payment but demands all files, credentials, and reusable code.
- Client wants exclusive ownership of generic components you reuse across clients.
- Third-party font, plugin, or stock asset license violations attributed to you.

**Mitigations:** Intellectual Property Policy; Service Agreement assignment clause conditional on full payment; list third-party licenses; retain Provider Materials definition.

---

### 7. Credential and access mishandling

**Exposure:** Clients may share admin passwords, DNS access, or platform invites via email or text.

**Realistic dispute scenarios:**
- Credentials exposed in email thread or support ticket.
- Former client alleges unauthorized access after project end.
- Client account compromised; you are blamed as last person with access.

**Mitigations:** Password manager; never store plaintext passwords in email; access revocation checklist at project close; cyber liability insurance if handling customer data.

---

### 8. Delivery timeline disputes

**Exposure:** Friction Check marketed as delivered within 48 hours; First Fix "usually handled quickly once access is shared." Delays create refund demands and public reviews.

**Realistic dispute scenarios:**
- Client pays on Friday, expects teardown Monday, receives it Wednesday; demands refund for breach.
- Client slow to provide access, then blames you for timeline slip.

**Mitigations:** Define clock start (payment + required materials received); client delay clause; proactive status updates.

---

### 9. Stripe chargebacks on subjective digital deliverables

**Exposure:** Friction Check deliverable is advisory (video + email). Client disputes quality subjectively.

**Realistic dispute scenarios:**
- "Video was useless" chargeback after delivery.
- Client disputes without contacting you first.

**Mitigations:** Delivery proof; clear deliverable definition; Refund Policy; respond promptly to Stripe disputes with documentation.

---

## Medium risks

### 10. Subprocessor and vendor data handling

**Exposure:** Data passes through Resend, Stripe, Vercel, and Google Fonts without client-facing documentation.

**Scenario:** Business client requests vendor list for their own compliance review; you cannot provide it.

**Mitigation:** Privacy Policy subprocessor section.

---

### 11. Accessibility liability on client projects

**Exposure:** Unless explicitly scoped, client may assume you will deliver WCAG-compliant work. ADA-related demand letters to client may flow upstream.

**Scenario:** Client receives accessibility complaint after launch; claims you promised "modern" site implying compliance.

**Mitigation:** Accessibility Statement clarifies Killough Works site commitment vs. client project scope; Service Agreement excludes accessibility unless listed in scope.

---

### 12. Illustrative demo confusion

**Exposure:** Demo catalog shows working mockups labeled illustrative. Prospects may believe they are purchasing a finished product.

**Scenario:** "I paid for the lead dashboard you showed on /demos."

**Mitigation:** Demo disclaimers on catalog pages; Service Agreement references custom build; sales emails restate mockup status.

---

### 13. Consulting and strategy advice reliance

**Exposure:** Recommendations on offers, automation, lead flow, or tech stack may influence client decisions.

**Scenario:** "Your workflow automation lost us customers."

**Mitigation:** No guaranteed outcomes clause; recommendations are educational; client approves implementation.

---

### 14. Mixed business and personal contact channels

**Exposure:** Payment follow-up uses personal Gmail while public contact uses killough.works domain.

**Scenario:** Dispute over which communications are binding; difficulty producing clean records.

**Mitigation:** Consolidate to hello@killough.works or jonathan@killough.works for all client-facing operations.

---

## Lower risks (monitor)

| Risk | Notes |
|------|-------|
| Google Fonts CDN | IP address may be processed by Google; disclose in Privacy Policy |
| Future analytics/cookies | Requires cookie notice and consent mechanism if added |
| Ministry/content tools demo | Religious content accuracy; not professional theological advice |
| Portfolio substantiation | Replace illustrative mockups with permissioned case studies |
| Open-source license contamination | Document OSS in deliverables; pass license obligations to client |
| NJ home-based business zoning | Verify local requirements if operating from home |
| Tax and 1099 classification | Client may misclassify relationship; contracts clarify independent contractor status |

---

## Risk priority matrix

| Priority | Risk | Action |
|----------|------|--------|
| 1 | No Terms / Privacy / Refund pages | Publish policies; add footer links |
| 2 | No pre-payment acceptance | Checkout + pay page acknowledgment |
| 3 | Scope ambiguity | Service Agreement + change orders |
| 4 | AI undisclosed | AI Disclosure + contract clauses |
| 5 | IP ambiguity | IP Policy + assignment on payment |
| 6 | Site breakage | Backups + insurance + liability cap |
| 7 | Credential handling | Secure access SOP |
| 8 | LLC not formed | Form LLC before volume scales |

---

## Document cross-references

- [Compliance Checklist](./COMPLIANCE_CHECKLIST.md)
- [Terms of Service](./TERMS_OF_SERVICE.md)
- [Privacy Policy](./PRIVACY_POLICY.md)
- [Refund Policy](./REFUND_POLICY.md)
- [AI Disclosure](./AI_DISCLOSURE.md)
- [Service Agreement Template](./SERVICE_AGREEMENT_TEMPLATE.md)
- [Intellectual Property Policy](./INTELLECTUAL_PROPERTY_POLICY.md)
- [Business Recommendations](./BUSINESS_RECOMMENDATIONS.md)

---

*Last updated: [EFFECTIVE DATE]*