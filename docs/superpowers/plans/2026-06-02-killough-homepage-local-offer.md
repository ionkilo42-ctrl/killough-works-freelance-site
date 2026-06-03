# Killough Homepage Local Offer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the homepage around a clear local-business website handyman offer without rebuilding the overall blueprint shell.

**Architecture:** Keep the existing Next.js homepage structure, replace abstract/productized copy with local-business offer copy, expand homepage section data for pricing/examples/FAQ/platform trust, and tighten visual emphasis with small CSS additions rather than a layout rewrite.

**Tech Stack:** Next.js App Router, React, TypeScript, Testing Library, Vitest, CSS

---

### Task 1: Lock the new messaging in tests

**Files:**
- Modify: `tests/unit/page.test.tsx`
- Modify: `tests/unit/lead-form.test.tsx`

- [ ] **Step 1: Write failing homepage assertions**

```tsx
expect(
  screen.getByText("Small, fast web fixes for local businesses tired of losing leads."),
).toBeInTheDocument();
expect(screen.getByText("Based in South Jersey. Fixing websites nationwide.")).toBeInTheDocument();
expect(screen.getByRole("link", { name: "Get a $35 Friction Check" })).toHaveAttribute(
  "href",
  "https://buy.stripe.com/7sY7sLba91fgaTwb0I1ZS02",
);
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- --run tests/unit/page.test.tsx tests/unit/lead-form.test.tsx`
Expected: FAIL because the homepage and form still render the older copy.

- [ ] **Step 3: Expand tests for section order and sample-fix content**

```tsx
const pricingHeading = screen.getByRole("heading", {
  level: 2,
  name: "No giant agency proposal. Pick the size of fix you need.",
});
const faqHeading = screen.getByRole("heading", {
  level: 2,
  name: "Simple answers before you start",
});
expect(whatIFixHeading.compareDocumentPosition(pricingHeading)).toBe(
  Node.DOCUMENT_POSITION_FOLLOWING,
);
expect(pricingHeading.compareDocumentPosition(faqHeading)).toBe(
  Node.DOCUMENT_POSITION_FOLLOWING,
);
```

- [ ] **Step 4: Add failing form assertions for lower-pressure intake copy**

```tsx
expect(screen.getByLabelText("Business name")).toBeInTheDocument();
expect(screen.getByLabelText("Website or social link")).toBeInTheDocument();
expect(screen.getByRole("option", { name: "Not sure yet" })).toBeInTheDocument();
```

- [ ] **Step 5: Re-run the same tests and confirm they still fail for the right reasons**

Run: `npm test -- --run tests/unit/page.test.tsx tests/unit/lead-form.test.tsx`
Expected: FAIL with missing text/label assertions matching the new positioning.

### Task 2: Rewrite homepage data and render the new sections

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace the homepage data model with local-business offer content**

```ts
export const coreCategories = [
  {
    title: "Broken contact forms",
    summary: "Customers try to reach you, but the form is confusing, broken, or too long.",
  },
];
```

- [ ] **Step 2: Rebuild homepage copy using the existing shell**

```tsx
<h1>Small, fast web fixes for local businesses tired of losing leads.</h1>
<p className="lede">
  I fix the annoying website problems big agencies overcharge for: broken contact forms,
  confusing booking pages, weak calls-to-action, messy mobile layouts, missing payment
  links, and quote requests stuck in DMs.
</p>
```

- [ ] **Step 3: Add visible pricing, availability, sample-fix, platform, FAQ, and footer sections**

```tsx
<section className="section section-tray" id="pricing">
  <div className="payment-grid">
    {pricingTiers.map((tier) => (
      <article className={`pricing-card payment-card${tier.featured ? " payment-card-featured" : ""}`}>
```

- [ ] **Step 4: Update metadata to match the new public positioning**

```ts
title: "Killough Works | Website Handyman for Local Businesses",
description:
  "Small, fast web fixes for local businesses tired of losing leads.",
```

- [ ] **Step 5: Run targeted tests**

Run: `npm test -- --run tests/unit/page.test.tsx`
Expected: PASS

### Task 3: Reword the intake experience and add light emphasis styling

**Files:**
- Modify: `src/components/lead-form.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/lib/intake.ts`

- [ ] **Step 1: Reword the intake form labels and helper copy**

```tsx
<label>
  Business name
  <input required placeholder="Your business name" />
</label>
```

- [ ] **Step 2: Update direct email copy to the public contact address**

```ts
"Thanks. Your project details are in, but email delivery is not configured yet. Please email jonathan@killough.works directly so nothing gets missed."
```

- [ ] **Step 3: Add small CSS support for featured pricing, availability cards, FAQ cards, and footer**

```css
.payment-card-featured {
  border-color: rgba(201, 169, 106, 0.42);
  transform: translateY(-4px);
}
```

- [ ] **Step 4: Run focused tests for the form and homepage**

Run: `npm test -- --run tests/unit/lead-form.test.tsx tests/unit/page.test.tsx`
Expected: PASS

### Task 4: Verify the full affected test slice

**Files:**
- Test: `tests/unit/page.test.tsx`
- Test: `tests/unit/lead-form.test.tsx`

- [ ] **Step 1: Run the final verification command**

Run: `npm test -- --run tests/unit/page.test.tsx tests/unit/lead-form.test.tsx`
Expected: PASS

- [ ] **Step 2: Review for leftover banned positioning language**

Run: `rg -n "small coded tools|messy business moments|lightweight website cleanup|intake friction|digital systems|AI-powered helper|mini-agency" src/app/page.tsx src/data/site.ts src/components/lead-form.tsx src/app/layout.tsx`
Expected: no matches
