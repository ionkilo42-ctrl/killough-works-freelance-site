# Killough Works Freelance Launch Site

Launch-focused freelance site for positioning Killough Works as an AI-powered systems builder for creators, local businesses, and modern service brands.

## What is in this repo

- Conversion-first homepage with services, pricing guidance, trust copy, and CTAs
- Shared Stripe offer ladder config for Friction Check, First Fix, and Mini Build
- Contact / intake flow backed by `POST /api/intake`
- Local fallback lead storage in `data/intake-submissions.json`
- Production-ready email delivery path via Resend
- Launch docs for positioning, outreach, and deployment

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4 via global CSS styling
- Resend for form delivery in production

## Local development

1. Install dependencies:

```bash
npm install
```

2. Copy env vars:

```bash
cp .env.example .env.local
```

3. Start the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`

## Lead intake behavior

- In local development, if `RESEND_API_KEY` and `INTAKE_TO_EMAIL` are not set, submissions are saved to `data/intake-submissions.json`.
- In production, if Resend is still unset, the API returns a safe warning message and logs the submission metadata instead of trying to write to the deployment filesystem.
- In production, set the Resend vars so submissions are emailed to the inbox you want to monitor.

## Key files

- `src/app/page.tsx`: homepage and all primary launch sections
- `src/app/pay/page.tsx`: current offer ladder and payment hub
- `src/app/paid/page.tsx`: post-payment handoff page
- `src/components/lead-form.tsx`: client-side intake form
- `src/data/site.ts`: shared offer ladder, Stripe links, contact details, and branding references
- `src/app/api/intake/route.ts`: intake endpoint
- `src/lib/intake.ts`: validation and submission handling
- `FREELANCE_LAUNCH_PLAN.md`: positioning, channels, pricing, acquisition plan
- `docs/FREELANCE_POSITIONING.md`: tighter positioning system and copy references
- `docs/DEPLOYMENT.md`: launch and deployment instructions
- `docs/STRIPE_SETUP.md`: manual Stripe dashboard cleanup, branding, and payment-link checklist

## Suggested production setup

- `NEXT_PUBLIC_BOOKING_URL`: live discovery call booking link. If blank, the call CTA falls back to the intake section.
- `NEXT_PUBLIC_SITE_URL`: live domain
- `NEXT_PUBLIC_STRIPE_FRICTION_CHECK_URL`: `https://buy.stripe.com/28E4gz2DDf66bXA0m41ZS04`
- `NEXT_PUBLIC_STRIPE_FIRST_FIX_URL`: `https://buy.stripe.com/5kQbJ11zzaPQ9Ps7Ow1ZS05`
- `NEXT_PUBLIC_STRIPE_MINI_BUILD_URL`: `https://buy.stripe.com/aFa4gz6TTaPQ4v81q81ZS03`
- `RESEND_API_KEY`: Resend API key
- `INTAKE_TO_EMAIL`: destination inbox
- `INTAKE_FROM_EMAIL`: verified sender

## Stripe product images

- `public/images/offers/friction-check.png`
- `public/images/offers/first-fix.png`
- `public/images/offers/mini-build.png`

These match the current offer ladder and should be the images used in Stripe product settings and payment links.

## Verification

```bash
npm run lint
npm run build
```

## Deployment note

- Production booking CTA should resolve from `NEXT_PUBLIC_BOOKING_URL`.
- Deployment identity note: production-trigger commits should use the linked team email.
