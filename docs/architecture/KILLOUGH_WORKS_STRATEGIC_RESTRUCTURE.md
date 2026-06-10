# Killough Works — Strategic Restructure Architecture

**Document type:** Repository-level restructuring plan (purpose and IA only)  
**Date:** June 10, 2026  
**Status:** Proposed — not implemented  
**Scope:** Public identity, information architecture, content classification, migration plan  
**Explicitly out of scope:** UI, CSS, layout, typography, colors, spacing, components, animations

---

## 1. Executive summary

Killough Works currently presents **five competing public identities** at once:

| Identity signal | Where it lives today |
|---|---|
| Portfolio | Homepage copy, `studioFaqs`, About section |
| Project studio | Brand tagline, footer, `trustBlurb` |
| Consulting practice | Work Samples, Focus Areas, Field Notes, legacy `faqs`, `/pay` |
| Prototype catalog | `/demos` (9 public interactive demos) |
| Future startup | Implied by “studio” language, absent flagship project |

This document consolidates around **one primary identity**:

> **Killough Works is Jonathan Killough’s professional home — a personal-brand portfolio anchored by Feltabout, open to employment and collaboration, with selective client work available by invitation only.**

Everything public should support a single 60-second evaluation question:

**“Should I interview Jonathan, build with Jonathan, or remember him for later?”**

---

## 2. Primary identity decision

### Recommended frame: **Hybrid — Personal brand + portfolio + project lab**

| Label | Role | Verdict |
|---|---|---|
| **Personal brand** | Primary container | Jonathan Killough is who visitors evaluate; Killough Works is the professional address |
| **Portfolio** | Primary function | Proof of thinking and execution for employers and collaborators |
| **Project lab** | Primary content engine | Feltabout + selected builds demonstrate current work |
| Studio | Supporting metaphor only | Accurate but over-indexes on client intake; demote in copy |
| Consulting practice | Archive / invitation-only | Legacy content layer; not a public storefront |
| Innovation lab | Supporting | Valid for experiments (e.g. Live Bible) but not the umbrella label |
| Open storefront | Rejected | `/pay` remains functional, not merchandised |

### Positioning statement (proposed)

**Killough Works is Jonathan Killough’s professional portfolio and project home. Feltabout is the flagship build. Jonathan is actively seeking employment and open to collaboration. Client work is selective and begins by conversation — not self-service checkout.**

### Site metadata alignment (future content pass)

Current `layout.tsx` description: *“portfolio and project studio — workflows, interfaces, demos, and selective collaboration.”*

Proposed direction: lead with **builder + Feltabout + hiring/collaboration intent**, not studio/client language.

---

## 3. Public route audit

### 3.1 Route inventory

| Route | Purpose today | Classification | Target state |
|---|---|---|---|
| `/` | Homepage: intro, work samples, demos preview, field notes preview, about, focus areas, FAQ, contact form | **Core** (restructure content) | Primary evaluation surface |
| `/demos` | Full catalog of 9 public demos in 8 SMB-oriented categories | **Supporting** → partial **Archive** | Consolidate into `/work` or rename purpose to “Prototypes” |
| `/demos/[slug]` (12 slugs, 9 public + 3 unlisted) | Interactive proof pages per demo | **Supporting** (curated subset **Core**) | Keep routes; reduce promoted set |
| `/field-notes` | 6 workshop notes on intake/offer/lead-flow repairs | **Archive** (reframe or demote) | Merge into `/work#notes` or `/notes` with new framing |
| `/pay` | Friction Check / First Fix / Mini Build Stripe ladder | **Hidden / invitation-only** | No public nav; direct link after scope agreement |
| `/paid` | Post-payment handoff instructions | **Hidden / invitation-only** | Stripe redirect target only |
| `/terms` | Terms of Service (references service tiers) | **Hidden** (compliance) | Footer link only |
| `/privacy` | Privacy Policy | **Hidden** (compliance) | Footer + form consent |
| `/refund` | Refund Policy (Friction Check / First Fix / Mini Build) | **Hidden** (compliance) | Footer link only |
| `/ai-disclosure` | AI use disclosure for client work | **Hidden** (compliance) | Link from service contexts only |
| `/intellectual-property` | IP policy for client engagements | **Hidden** (compliance) | Link from service contexts only |
| `/service-agreement` | Client engagement template | **Hidden** (compliance) | Link from scoped work only |
| `/api/intake` | Lead form backend | **Hidden** (functional) | Not a destination |
| `/api/payment-acceptance` | Payment terms gate API | **Hidden** (functional) | Payment flow only |

**Non-routes with public impact:**

| Asset / component | Surfaces on | Classification |
|---|---|---|
| `src/data/site.ts` → `pricingTiers`, `processSteps`, `availabilitySlots`, `faqs` | `/pay`, payment components | **Hidden** data — keep, do not promote |
| `src/data/site.ts` → `starterFixes` (8 items) | Homepage work samples | **Archive** majority |
| `src/data/site.ts` → `coreCategories` (6 items) | Homepage focus areas | **Archive** on homepage |
| `src/data/site.ts` → `fieldNotes` (6 items) | `/field-notes`, homepage preview | **Archive** majority |
| `src/data/site.ts` → `studioFaqs` (6 items) | Homepage FAQ | **Archive** — replace with one status line |
| `docs/FREELANCE_POSITIONING.md` | Internal | **Archive** — conflicts with current priorities |
| `FREELANCE_LAUNCH_PLAN.md` | Internal | **Archive** |
| `docs/ops/*` | Internal ops | **Hidden** — not public IA (unchanged) |

---

## 4. Homepage section audit

Current homepage sections (`src/app/page.tsx`) classified:

| Section | ID | Classification | Recommendation |
|---|---|---|---|
| Header nav | — | **Core** | Simplify labels; lead with Work / Contact |
| Status line (“selective collaboration…”) | intro | **Supporting** | Shorten; add employment + collaboration signal |
| H1 + intro copy | intro | **Core** | Rewrite around builder identity + current intent |
| Intro nav (Work Samples / Demos / Conversation) | intro | **Core** | Point to Feltabout + proof, not SMB studies |
| Work Samples (4 of 8 design studies) | `#work-samples` | **Archive** (bulk) | Demote; keep 0–2 curated studies under `/work` |
| Demos preview (3 featured) | `#demos` | **Core** | Keep; reframe as “proof of execution” |
| Field Notes preview (2 of 6) | `#field-notes` | **Archive** | Remove from homepage; optional link to notes archive |
| About Jonathan | `#about-jonathan` | **Core** | Keep; add explicit hiring/collaboration intent |
| Focus Areas (6 SMB pain points) | `#what-i-build` | **Archive** | Remove from homepage; fold capabilities into About |
| FAQ (6 studio questions) | `#faq` | **Archive** | Remove; one honest line in intro replaces defensive FAQ |
| Contact / lead form | `#conversation` | **Core** | Keep; restructure intent paths (hiring / collaborate / other) |
| Booking CTA (env-gated) | — | **Supporting** | Fine for hiring/collaboration if enabled |
| Footer | — | **Core** | Update copy and nav targets |

### What should define the homepage

The homepage should be a **single-scroll professional evaluation page**, not a site map of every content type.

**Required homepage jobs (in order):**

1. **Who** — Jonathan Killough, product-minded builder  
2. **What now** — Seeking employment; open to collaboration  
3. **Flagship** — Feltabout (primary project story)  
4. **Proof** — 3 interactive prototypes that demonstrate execution  
5. **About** — How you work + what roles/partnerships you want  
6. **Contact** — Clear paths by intent  

**Homepage should not be defined by:** work sample volume, demo catalog breadth, field note archive, FAQ about whether you are a storefront, or SMB problem lists.

---

## 5. Feltabout representation

**Current state:** Feltabout does not appear anywhere in the public repository. This is the largest strategic gap.

**Principle:** Feltabout is not “another demo.” It is the **reason Killough Works exists as a public site today.**

### Recommended representation

| Surface | Treatment |
|---|---|
| Homepage | **Dedicated “Flagship project” block above proof demos** — name, one-paragraph thesis, current status (building / beta / exploring), link if live |
| Navigation | **“Feltabout”** as a first-class nav item (anchor `#feltabout` on home, or `/feltabout` when ready) |
| `/work` hub | Featured row at top of project index |
| About | One sentence tying Jonathan’s skills to why Feltabout exists |
| Demos | Do not bury Feltabout inside the SMB demo grid |

### Minimum viable Feltabout content (no UI work required)

Content-only fields to add to `src/data/site.ts` (or new `src/data/projects.ts`):

- `name`: Feltabout  
- `role`: Flagship project  
- `summary`: 1–2 sentences (what it is, who it’s for)  
- `status`: e.g. “In active development”  
- `url`: optional external or `/feltabout` when page exists  
- `proof`: optional link to demo, repo, or screenshot  

### Route decision

| Option | Pros | Cons |
|---|---|---|
| **A. Homepage anchor `#feltabout`** | Fastest; no new route | Limited depth |
| **B. `/feltabout` dedicated page** | Clear flagship home; shareable URL | Requires one new page (content only) |
| **C. `/work/feltabout`** | Fits consolidated work hub | Less prominent |

**Recommendation:** Start with **A** for migration Phase 1; move to **B** when Feltabout has enough material for a standalone page.

---

## 6. Consolidation analysis: Demos, Field Notes, Work Samples, About

### Current problem

Four separate sections imply four separate businesses:

- Work Samples → consulting deliverable previews  
- Demos → productized service catalog  
- Field Notes → agency content marketing  
- About → generic builder bio  

### Recommendation: **Consolidate under one “Work” concept; keep About and Contact separate**

| Current section | Verdict | Target |
|---|---|---|
| **Work Samples** | Do not remain a homepage section | Fold 0–2 items into `/work#studies` as “product thinking exercises” |
| **Demos** | Do not remain a homepage section title | Become `/work#prototypes` — curated proof, not full catalog |
| **Field Notes** | Do not remain a homepage section | Become `/work#notes` or `/notes` — secondary writing, not primary proof |
| **About** | **Remain separate** | Stays on homepage as `#about` — personal evaluation content |

### Proposed content model

```
Work (conceptual parent)
├── Projects     → Feltabout (flagship), Innovation (secondary), Live Bible (experiment)
├── Prototypes   → 3–6 interactive demos (curated)
├── Studies      → 0–2 design exercises (optional breadth)
└── Notes        → field notes archive (optional depth)
```

**About** and **Contact** stay peer-level — they answer *who you are* and *how to reach you*, not *what you’ve built*.

---

## 7. Demo catalog classification

### Public demos (9)

| Demo | Classification | Action |
|---|---|---|
| Live Bible Companion | **Core** | Flagship proof / experiment; feature on homepage |
| Lead Follow-Up Dashboard | **Core** | Homepage proof — operational UI |
| Estimate Approval Flow | **Core** | Homepage proof — multi-step workflow |
| Missed Call Quote Form | **Supporting** | One intake example; do not feature on homepage |
| Service Booking Request Flow | **Supporting** | Catalog depth only |
| Deposit Payment Flow | **Supporting** | Catalog depth only |
| Review Request Flow | **Archive** | Redundant SMB pattern |
| Customer Reactivation Message | **Archive** | Redundant SMB pattern |
| Local Service Landing Page | **Supporting** | One landing-page example |

### Unlisted demos (3) — already correct

| Demo | Classification |
|---|---|
| Pressure Washing Quote Form | **Archive** |
| Junk Removal Pickup Request | **Archive** |
| Landscaping Job Request | **Archive** |

**Rule:** Public catalog may keep **one demo per capability pattern** (intake, booking, payment, landing, dashboard, experiment). Seven intake-adjacent demos communicate “I sell forms to local businesses,” not “I build product systems.”

---

## 8. Work Samples classification (8 items)

| Study | Classification | Action |
|---|---|---|
| Missing quote button | **Archive** | SMB consulting signal |
| Messy intake process | **Archive** | Redundant with demos |
| Scattered Facebook info | **Archive** | SMB vertical specificity |
| No next step after payment | **Supporting** | Could illustrate payment UX thinking |
| Missed review opportunity | **Archive** | SMB marketing |
| Leads lost in Messenger | **Archive** | Redundant with dashboard demo |
| Realtor lead capture | **Archive** | Vertical niche |
| Contractor inspection request | **Archive** | Vertical niche |

**Recommendation:** Remove work samples from homepage. If any remain public, keep **at most 1–2** reframed as “design thinking exercises,” not client vertical previews.

---

## 9. Field Notes classification (6 items)

| Note | Classification | Action |
|---|---|---|
| All 6 notes | **Archive** as primary proof | SMB repair patterns — agency blog tone |

**Recommendation:** Demote entire section from homepage. If retained, reframe section title from “workshop notes from real build problems” to **“Build notes”** or **“How I think about product problems”** and reduce to notes that generalize beyond local service businesses.

---

## 10. Content that actively harms positioning

These items tell the wrong story to recruiters and collaborators **regardless of layout**:

| Content | Harm | Action |
|---|---|---|
| Homepage Focus Areas (`coreCategories`) | Positions you as SMB fix-it consultant | Archive from public homepage |
| 8 SMB work samples | Vertical freelance signal | Archive bulk; curate 0–2 max |
| 9-demo SMB catalog as primary nav destination | Service showroom | Demote `/demos` as primary; consolidate to `/work` |
| Field Notes framing + volume | Agency content marketing | Remove homepage preview; archive or reframe |
| `studioFaqs` “not a public service menu” | Defensive — proves confusion exists | Remove; replace with direct intent statement |
| Lead form: required **Business name** | Client intake assumption | Change to optional or intent-branching (content/field pass) |
| Lead form prompt: “What feels broken…” | Client support tone | Rewrite for hiring/collaboration/general |
| `/pay` page copy: “Current offer ladder” | Storefront | Keep route; no public links |
| Legal descriptions referencing Friction Check tiers | Commerce-first business | Keep legally; no promotion |
| `docs/FREELANCE_POSITIONING.md` | “AI-powered systems builder for local businesses” | Archive internally |
| `FREELANCE_LAUNCH_PLAN.md` | Outbound SMB acquisition playbook | Archive internally |
| Footer: “Portfolio & project studio” without Feltabout or hiring signal | Vague umbrella | Rewrite footer copy |
| Absence of Feltabout | Site has no flagship — only capabilities | **Critical gap — add immediately (content)** |

---

## 11. Content that strengthens credibility (keep)

| Content | Audience served |
|---|---|
| Live Bible Companion | Employers, collaborators — API integration, domain product |
| Lead Follow-Up Dashboard | Employers — operational UI, state, hierarchy |
| Estimate Approval Flow | Employers — workflow logic, multi-step UX |
| About: “How I work” | All — workflow-first builder signal |
| About: “Who this is for” (if rewritten with hiring first) | Recruiters, collaborators |
| Interactive demo depth pages | Employers — click-through proof |
| Conversation-first contact (no homepage checkout) | All — honest selective engagement |
| Selective collaboration language (short, not defensive) | Future clients |

---

## 12. Proposed information architecture

### 12.1 Sitemap (target)

```
killough.works
│
├── /                              HOME — primary evaluation (Core)
│   ├── #feltabout                 Flagship project
│   ├── #work                      Curated proof (3 prototypes)
│   ├── #about                     Builder + intent
│   └── #contact                   Hiring / collaborate / general
│
├── /work                          WORK HUB — full index (Supporting)
│   ├── #projects                  Feltabout, Innovation, Live Bible
│   ├── #prototypes                Curated demos (3–6)
│   ├── #studies                   Optional design exercises (0–2)
│   └── #notes                     Field notes archive (optional)
│
├── /feltabout                     FLAGSHIP PAGE (Supporting → Core when ready)
│
├── /demos/[slug]                  PROTOTYPE DETAIL — keep all routes (Supporting)
│
├── /notes                         OPTIONAL alias for field notes archive (Archive)
│
├── [hidden — no primary nav]
│   ├── /pay
│   ├── /paid
│   ├── /terms, /privacy, /refund
│   ├── /ai-disclosure, /intellectual-property, /service-agreement
│   └── /api/*
│
└── [internal — not public IA]
    └── docs/ops/*
```

### 12.2 Navigation (target)

**Primary nav (public):**

```
Feltabout · Work · About · Contact
```

**Secondary / footer:**

```
Work · Notes · Email · Legal (Terms · Privacy · Refund)
```

**Remove from primary nav:**

- Work Samples (as label)
- Demos (as label — absorbed into Work)
- Field Notes (as label — absorbed into Work or Notes)
- Talk (replace with Contact)

### 12.3 Redirect strategy (migration)

| Current | Target | Method |
|---|---|---|
| `/demos` | `/work#prototypes` | Redirect or content merge |
| `/field-notes` | `/work#notes` or `/notes` | Redirect |
| `/#work-samples` | `/work#studies` or remove | Update internal links |
| `/#conversation` | `/#contact` | Anchor rename |

---

## 13. Minimum viable public surface (60-second comprehension)

A recruiter, collaborator, or hiring manager should need **only these**:

### Pages (minimum)

| # | Page | Job |
|---|---|---|
| 1 | `/` | Identity + intent + Feltabout + 3 proof links + contact |
| 2 | `/demos/live-bible-companion` (or `/feltabout`) | Depth on flagship / best proof |
| 3 | `/demos/lead-follow-up-dashboard` | Second proof dimension |
| 4 | `/demos/estimate-approval-flow` | Third proof dimension |

**Optional fifth:** `/work` — full index for curious evaluators  
**Not required for 60-second comprehension:** `/field-notes`, `/demos` catalog, work samples, FAQ, focus areas, `/pay`

### Projects (minimum)

| # | Project | Role |
|---|---|---|
| 1 | **Feltabout** | Flagship — why you build |
| 2 | **Live Bible Companion** | Technical + product proof |
| 3 | **Lead Follow-Up Dashboard** | Operational UI proof |
| 4 | **Estimate Approval Flow** | Workflow proof |

Innovation should appear as **Supporting** on `/work#projects` when content exists; it is not required for the 60-second minimum if Feltabout is strong.

### 60-second homepage storyboard (content only)

```
1. Jonathan Killough — product-minded builder
2. Seeking employment · open to collaboration
3. Feltabout — [one sentence on what it is + status]
4. Proof — Live Bible · Dashboard · Estimate Flow (links)
5. Contact — hiring · collaborate · email
```

---

## 14. Migration plan

### Phase 0 — Decision lock (no code)

- [ ] Approve primary identity statement (Section 2)
- [ ] Approve Feltabout as homepage flagship
- [ ] Approve minimum proof set (3 demos)
- [ ] Approve `/work` consolidation model
- [ ] Write Feltabout summary copy (3–5 sentences)

### Phase 1 — Homepage purpose realignment (content/data only)

**Files likely touched:** `src/data/site.ts`, `src/app/page.tsx`, `src/app/layout.tsx` metadata, `src/components/site-footer.tsx`, `src/components/lead-form.tsx` (field labels/copy only)

- [ ] Add `projects` data model with Feltabout as `flagship: true`
- [ ] Rewrite homepage intro: hiring + collaboration intent first
- [ ] Add Feltabout section to homepage
- [ ] Replace work samples / field notes / FAQ / focus areas homepage sections with curated proof block
- [ ] Feature exactly 3 demos on homepage
- [ ] Rewrite contact section intents (hiring / collaborate / general)
- [ ] Update footer copy and nav labels
- [ ] Update site metadata description

**No CSS/component layout changes required** — section order and copy swaps only.

### Phase 2 — Work hub consolidation (routing + content)

**Files likely touched:** new `src/app/work/page.tsx`, `src/app/demos/page.tsx`, `src/app/field-notes/page.tsx`, `next.config` redirects

- [ ] Create `/work` as unified index (projects, prototypes, studies, notes)
- [ ] Redirect `/demos` → `/work#prototypes`
- [ ] Redirect `/field-notes` → `/work#notes`
- [ ] Reclassify demos in data: `tier: "core" | "supporting" | "archive"`
- [ ] Hide archive-tier demos from public index (routes may remain live)

### Phase 3 — Feltabout depth (optional new route)

- [ ] Add `/feltabout` when flagship has enough material
- [ ] Link from homepage nav and `/work#projects`

### Phase 4 — Archive layer cleanup (data hygiene)

**Files likely touched:** `src/data/site.ts`, `docs/FREELANCE_POSITIONING.md`, internal docs

- [ ] Mark `coreCategories`, bulk `starterFixes`, bulk `fieldNotes`, `studioFaqs`, legacy `faqs` as archived in data or move to `src/data/archive/`
- [ ] Add `ARCHIVE.md` explaining deprecated public content
- [ ] Confirm `/pay`, `/paid`, legal, API routes unchanged and unlinked from primary nav

### Phase 5 — Verification (non-UI)

- [ ] Update unit tests for new copy, routes, nav labels, section IDs
- [ ] Recruiter walkthrough: 60-second comprehension check
- [ ] Collaborator walkthrough: Feltabout + proof + contact clarity
- [ ] Confirm no primary nav path leads to `/pay` or offer ladder copy

---

## 15. What not to do in this restructure

- Do not redesign UI, CSS, or components
- Do not remove `/pay`, Stripe links, intake API, or legal pages
- Do not delete demo routes — demote, don’t destroy proof
- Do not add fake case studies or inflate project status
- Do not reopen public self-service purchasing
- Do not touch `docs/ops/*` client operations docs

---

## 16. Open decisions (require Jonathan’s input before Phase 1)

| # | Question | Default recommendation |
|---|---|---|
| 1 | Does Feltabout have a live URL, repo, or screenshot for v1? | Homepage text-only is acceptable for Phase 1 |
| 2 | How should Innovation appear relative to Feltabout? | Secondary project on `/work#projects` |
| 3 | Should `/demos` redirect to `/work` or remain as alias? | Redirect after `/work` exists |
| 4 | Keep any work samples public? | Max 2, reframed as studies |
| 5 | Keep field notes public at all? | Yes, but demoted to `/notes` archive tier |
| 6 | What roles are you actively seeking? | Add explicit line to homepage intro (content) |
| 7 | Is booking link (`NEXT_PUBLIC_BOOKING_URL`) for hiring calls or client calls? | Reframe copy based on answer |

---

## 17. Success criteria

The restructure succeeds when:

1. A visitor can state **who Jonathan is**, **what Feltabout is**, and **what Jonathan wants (jobs/collaboration)** within 60 seconds of landing on `/`.
2. No public nav path implies **self-service hiring of Jonathan as an SMB consultant**.
3. `/pay` and legal/commerce systems remain functional but **invisible to primary journeys**.
4. The repository has **one source of truth** for public project tiers: Core / Supporting / Archive / Hidden.
5. Future visual work inherits a **stable purpose**, not a moving identity target.

---

## Appendix A — Current vs. target homepage map

| Current section | Target |
|---|---|
| Status line (client phase) | Short intent line (employment + collaboration) |
| H1 + studio summary | H1 + builder identity |
| — | **Feltabout (new)** |
| Work Samples (4) | Removed → 0–2 on `/work#studies` |
| Demos preview (3) | **Proof** (3 curated — same demos, new framing) |
| Field Notes preview (2) | Removed |
| About | **About** (add hiring/collaboration) |
| Focus Areas | Removed |
| FAQ | Removed |
| Contact form | **Contact** (intent-based copy) |

---

## Appendix B — File impact forecast (implementation reference)

| File | Phase | Change type |
|---|---|---|
| `src/data/site.ts` | 1, 4 | Add projects; archive flags; rewrite copy constants |
| `src/data/projects.ts` (new) | 1 | Feltabout, Innovation, project tiers |
| `src/data/demos.ts` | 2 | Add `tier` metadata per demo |
| `src/app/page.tsx` | 1 | Section reorder + copy (no UI refactor) |
| `src/app/work/page.tsx` (new) | 2 | Consolidated work hub |
| `src/app/demos/page.tsx` | 2 | Redirect or thin alias |
| `src/app/field-notes/page.tsx` | 2 | Redirect or thin alias |
| `src/app/layout.tsx` | 1 | Metadata only |
| `src/components/site-footer.tsx` | 1 | Nav labels + copy |
| `src/components/lead-form.tsx` | 1 | Field copy/labels only |
| `tests/unit/*.test.tsx` | 1–2 | Assertions for new copy/routes |
| `docs/FREELANCE_POSITIONING.md` | 4 | Mark archived |

---

*End of document.*