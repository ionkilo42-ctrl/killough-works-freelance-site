# Killough Works — Final Curation Pass (Implementation Plan)

**Status:** Plan only — not implemented  
**Date:** June 10, 2026  
**Scope:** Curation, proof hierarchy, clarity (no architecture redesign)

---

## Guiding principle

Stable portfolio direction is set. This pass **curates and clarifies** what already exists — it does not add major sections, routes, or storefront mechanics.

**Target feel:** Professional portfolio with active projects.  
**Not:** Agency · Consultancy · SaaS landing page.

---

## Execution order (5 steps)

| Step | Focus | Risk |
|---|---|---|
| **1** | Data + copy constants | Low |
| **2** | Feltabout “Now Building” block | Low — needs copy approval |
| **3** | Work sample previews + prototype affordances | Low — component + CSS |
| **4** | Field notes curation + homepage demotion | Low |
| **5** | Contact intent + GitHub + test updates | Low |

---

## Step 1 — Data layer (`src/data/site.ts`)

### Add `nowBuildingProject` (Feltabout)

```ts
export const nowBuildingProject = {
  name: "Feltabout",
  status: "Work in progress",
  summary: "…", // plain language, 2 sentences max
  githubUrl: "https://github.com/ionkilo42-ctrl/feltabout",
  screenshotSrc?: string, // only if asset added to /public
};
```

**Copy source:** Feltabout `README.md` — lead with reflection/conversation-prep tooling, safety-first pipeline. No launch language.

**Screenshot:** None in `public/` today. Ship text-only unless Jonathan adds e.g. `/public/projects/feltabout.png`.

### Add `profileLinks`

```ts
export const profileLinks = {
  github: "https://github.com/ionkilo42-ctrl/feltabout", // or profile URL if preferred
  githubLabel: "GitHub — active projects and experiments",
};
```

### Add `fieldNoteVisibility` on each note

```ts
tier: "public" | "archived"
```

Or filter via `publicFieldNotes` export — archive tier excluded from `/field-notes` render.

### Tighten `contactDetails` / intro constants

- Employment + collaboration line for homepage status
- De-emphasize “scoped client work” in first screen

---

## Step 2 — Priority 1: “Now Building” (Feltabout)

### Placement

Insert **immediately after `intro`**, before Work Samples — first project visitors encounter.

### Homepage section (no new route)

```tsx
<section className="editorial-block" id="now-building">
  <p className="block-eyebrow">Now Building</p>
  <h2>Feltabout</h2>
  <p className="status-pill">Work in progress</p>
  <p className="block-lede">{summary}</p>
  <p className="block-cta">
    <a href={githubUrl}>View on GitHub →</a>
  </p>
  {screenshot optional}
</section>
```

### Files

| File | Change |
|---|---|
| `src/data/site.ts` | Feltabout constants |
| `src/app/page.tsx` | Section + reorder intro nav link to `#now-building` |
| `src/components/now-building-project.tsx` (new, optional) | Thin presentational component |
| `src/app/globals.css` | Minimal: status pill, optional screenshot max-width |
| `tests/unit/page.test.tsx` | Assert Feltabout + GitHub link present |

### Copy guardrails

- ✅ “Current project and ongoing development effort”
- ✅ Plain description, WIP status, GitHub link
- ❌ Launch CTAs, waitlist, pricing, “coming soon” marketing

### Nav tweak (labels only, same anchors)

Add `Now Building` or `Feltabout` to header nav → `#now-building`.

---

## Step 3 — Priority 2: Work sample previews

### Problem

`variant="editorial"` renders **full-width images** per study (~4× vertical cost).

### Solution

Add `variant="preview"` to `SampleFixGallery` (or default homepage to existing `compact` with tweaks):

| Requirement | Implementation |
|---|---|
| Smaller thumbnails | ~64–72px wide (reuse compact thumb grid) |
| Title + one sentence | `explanation` only — drop redundant label row on homepage |
| Full view on click | Keep existing lightbox |
| Scan all studies quickly | Show **all 4** homepage items in single compact list |

### Files

| File | Change |
|---|---|
| `src/components/sample-fix-gallery.tsx` | `preview` variant: compact row + lightbox |
| `src/app/page.tsx` | `variant="preview"`; optional show all 4 |
| `src/app/globals.css` | `.work-sample-preview-*` spacing if needed |
| `tests/unit/page.test.tsx` | `.work-sample-list` or `.work-sample-preview-list` |

### Copy tweak

Section h2: shorten to **“Design studies”** — keep one-line lede, drop apologetic framing if possible.

---

## Step 4 — Priority 3: Portfolio prototypes (clickable affordance)

### Problem

`DemoCard variant="editorial"` — title link only; reads like documentation.

### Solution

Add `variant="portfolio"` for homepage featured demos:

```tsx
<Link href={`/demos/${slug}`} className="prototype-preview-row">
  <div className="prototype-preview-copy">
    <h3>{title}</h3>
    <p>{cardDescription}</p>
  </div>
  <span className="prototype-preview-action">Open prototype →</span>
</Link>
```

| Requirement | Implementation |
|---|---|
| Entire row clickable | Single `<Link>` wrapper |
| Visual affordance | Border or subtle background on row |
| Hover state | Background shift + arrow emphasis |
| Pointer cursor | `cursor: pointer` on row |
| Arrow / CTA | Trailing “Open prototype →” |

### Files

| File | Change |
|---|---|
| `src/components/demo-card.tsx` | `portfolio` variant |
| `src/app/page.tsx` | Use `portfolio` for featured 3 |
| `src/app/globals.css` | `.prototype-preview-row` hover/focus styles |
| `tests/unit/page.test.tsx` | Link role includes “Open prototype” |

**Scope:** Homepage featured demos only. `/demos` page can stay editorial for now.

---

## Step 5 — Priority 4: Field notes audit

### Classification

| Note | Builder | Product | Workflow | Decision |
|---|---|---|---|---|
| Quote request cleanup | ◐ | ✓ | ✓ | **Keep** — archive page only |
| Offer page cleanup | ✓ | ✓ | ◐ | **Keep** |
| Lead flow repair | ◐ | ✓ | ✓ | **Archive** — redundant with form friction audit |
| Form friction audit | ✓ | ✓ | ✓ | **Keep** — strongest note |
| Small page/tool | ✓ | ✓ | ✓ | **Keep** |
| Payment/contact path cleanup | ✓ | ✓ | ✓ | **Keep** |

**Result:** 5 public notes, 1 archived (`lead-flow-repair`).

### Homepage

- **Remove** `#field-notes` preview section entirely
- Replace with single footer-style link: “Build notes →” to `/field-notes` (optional)

### `/field-notes` page

- Reframe heading/lede: **“How I think about product problems”** (not “workshop repairs”)
- Filter render to `publicFieldNotes` only

### Files

| File | Change |
|---|---|
| `src/data/site.ts` | `tier` on notes + `publicFieldNotes` export |
| `src/app/page.tsx` | Remove field notes section |
| `src/app/field-notes/page.tsx` | Filter + reframe copy |
| `tests/unit/field-notes-page.test.tsx` | Expect 5 notes; updated heading copy |

---

## Step 6 — Priority 5: GitHub presence

### Placement (pick one — recommend A)

| Option | Location |
|---|---|
| **A** | Inside Feltabout “Now Building” block (primary) |
| **B** | One line in About prose |
| **C** | Intro nav link |

**Recommendation:** **A + B** — GitHub on Feltabout; About mentions “code and experiments on GitHub.”

No dedicated developer page. No repo grid.

---

## Step 7 — Priority 6: Contact intent

### Section copy

| Current | Target |
|---|---|
| Eyebrow: “Collaboration” | **“Contact”** |
| Status line leads with client phase | Lead with **seeking roles + open to collaboration** |
| Steps imply client scoping | Step 1: “Say if you’re hiring, collaborating, or exploring a project.” |

### Form (`lead-form.tsx`) — copy + field order only

| Change | Detail |
|---|---|
| Select option order | 1. Portfolio / hiring review · 2. Collaboration or prototype · 3. Scoped client project · 4. Others |
| Business name | **Optional** (not `required`) — label: “Company or project (optional)” |
| Textarea label | “What should I know?” — not “What feels broken…” |
| Intro note | “Hiring managers and collaborators: a short note is enough.” |

**No API/schema change required** — `business` can be empty string.

### Files

| File | Change |
|---|---|
| `src/components/lead-form.tsx` | Labels, order, optional business |
| `src/app/page.tsx` | Contact section copy |
| `tests/unit/lead-form.test.tsx` | Option order, optional business |

---

## Step 8 — Storefront residue removal (curation, not new sections)

These sections **remain in data** but leave the homepage:

| Section | Action |
|---|---|
| Focus Areas (`#what-i-build`) | **Remove from homepage** |
| FAQ (`#faq`) | **Remove from homepage** |
| Field notes preview | **Remove** (Step 5) |
| Status line client emphasis | **Rewrite** in intro |

**Keeps section count flat** — removes consulting signals without adding routes.

---

## Target homepage order (after pass)

```
1. Header nav
2. Intro (who + intent: hiring, collaboration)
3. Now Building — Feltabout          ← NEW
4. Work Samples (preview variant)      ← COMPRESSED
5. Portfolio Prototypes (3 featured)   ← CLICKABLE ROWS
6. About Jonathan
7. Contact (hiring-first form)
8. Footer
```

**Removed from homepage:** Field notes preview, Focus Areas, FAQ.

---

## Files touched (summary)

| File | Steps |
|---|---|
| `src/data/site.ts` | 1, 4, 6 |
| `src/app/page.tsx` | 2, 3, 4, 6, 8 |
| `src/components/sample-fix-gallery.tsx` | 3 |
| `src/components/demo-card.tsx` | 4 |
| `src/components/lead-form.tsx` | 6 |
| `src/components/now-building-project.tsx` | 2 (optional) |
| `src/app/field-notes/page.tsx` | 4 |
| `src/app/globals.css` | 2, 3, 4 (affordance-only) |
| `tests/unit/page.test.tsx` | 2–4, 6 |
| `tests/unit/field-notes-page.test.tsx` | 4 |
| `tests/unit/lead-form.test.tsx` | 6 |

**Explicitly untouched:** `/pay`, `/paid`, legal routes, intake API, `docs/ops/*`, pricing data.

---

## Inputs required from Jonathan (before implementation)

| # | Input | Default if unanswered |
|---|---|---|
| 1 | Feltabout 2-sentence homepage summary | Derive from README |
| 2 | GitHub link: repo vs profile | `github.com/ionkilo42-ctrl/feltabout` |
| 3 | Feltabout screenshot for `/public`? | Text-only |
| 4 | Explicit “seeking roles” line (titles/stack) | Generic “product and engineering roles” |
| 5 | Confirm archive `lead-flow-repair` | Yes per audit |

---

## Success checks (manual, post-implementation)

1. **10 sec:** Who is Jonathan? What is he building now?
2. **30 sec:** Can visitor scan all work studies without scrolling a screen per item?
3. **30 sec:** Do prototypes obviously look clickable?
4. **60 sec:** Would a recruiter see Feltabout + GitHub + 3 demos + hiring contact?
5. **No** homepage path to pricing, packages, or checkout.

---

*Ready to implement on approval.*