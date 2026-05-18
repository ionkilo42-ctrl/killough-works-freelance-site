# Deployment Instructions

## Recommended path

Deploy on Vercel or Netlify. This project is a small Next.js site with one API route for form handling.

## Required environment variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BOOKING_URL`
- `RESEND_API_KEY`
- `INTAKE_TO_EMAIL`
- `INTAKE_FROM_EMAIL`

## Vercel

1. Push the repo to GitHub.
2. Import the repo into Vercel.
3. Add the environment variables.
4. Deploy.
5. Submit the intake form on the live site to verify delivery.

## Netlify

1. Connect the repo to Netlify as a Next.js site.
2. Add the environment variables in site settings.
3. Deploy the app.
4. Submit the intake form and confirm the Resend email arrives.

## Booking flow

Set `NEXT_PUBLIC_BOOKING_URL` to a real Cal.com or Calendly link before launch.
If it is blank, the site safely routes the CTA back to the intake section.

## Domain and inbox

- Point the custom domain after the initial preview deploy looks correct.
- Verify the sender domain in Resend so form submissions come from a branded address.

## Production launch checklist

1. Replace the booking placeholder URL.
2. Set all env vars.
3. Test the intake form on production.
4. Replace placeholder case studies as real work lands.
5. Add analytics only if they help decision-making.
