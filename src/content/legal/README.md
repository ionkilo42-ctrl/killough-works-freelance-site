# Legal content snapshots

Published legal pages are loaded from immutable version folders under this directory.

## Current package

- Active version: `v1.1` (see `LEGAL_PACKAGE_VERSION` in `src/data/legal.ts`)
- Routes: `/terms`, `/privacy`, `/refund`

## Updating policies

1. Edit the working drafts in `docs/legal/`.
2. Copy the updated markdown into a **new** folder, e.g. `src/content/legal/v1.2/`.
3. Add or update `manifest.json` in that folder.
4. Bump `LEGAL_PACKAGE_VERSION` in `src/data/legal.ts` to `1.2`.
5. Deploy. Do **not** overwrite `v1.1/` — acceptance records point at the version accepted at checkout.

Acceptance logs store the terms, refund, and privacy versions plus absolute URLs from the active package at the time of payment.