# Killough Works Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local-first `/studio` dashboard inside the current Next.js app for ideas, profiles, drafts, follow-ups, calendar planning, and visual pitch gallery management with strict approval-first behavior.

**Architecture:** Keep the public site untouched at `/` and add a fully isolated internal Studio surface under `src/app/studio`. Back Studio with a local SQLite database, repository functions for each domain, and service-layer actions that enforce approval-first workflow, soft archive behavior, and graceful handling of missing linked records.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, `better-sqlite3`, server actions or route handlers for writes, Vitest, Testing Library, Playwright.

---

## Phase Overview

### Phase 1: Foundation

- Add Studio-specific dependencies, test harness, and local database ignore rules
- Create the Studio file/folder skeleton
- Add SQLite bootstrap utilities and first migration

### Phase 2: Data Layer

- Implement schema creation and seed-safe bootstrapping
- Add repositories for profiles, ideas, drafts, calendar, gallery, follow-ups, tags, and dashboard reads
- Add service boundaries for workflow-safe mutations

### Phase 3: Studio Shell

- Add `/studio` layout, navigation, brand styling, and empty-state pages
- Wire each route to domain-aware placeholder data reads

### Phase 4: Profiles And Inbox

- Build profiles view with links, notes, tags, and status
- Build idea inbox with global ideas, link-to-profile, and convert-to-draft flow

### Phase 5: Drafts And Follow-Ups

- Build drafts view with platform filters, approval controls, DM draft generation seam, and clipboard export
- Build follow-ups view with `queued`, `due`, and `done` groupings

### Phase 6: Calendar And Gallery

- Build weekly content board with linked drafts
- Build gallery library and profile-specific gallery selections

### Phase 7: Dashboard And Hardening

- Build the command-center aggregate view
- Finish error handling, archived-record fallbacks, and end-to-end verification

## File And Folder Plan

### Modify Existing

- `.gitignore`
- `package.json`
- `package-lock.json`
- `src/app/globals.css`
- `src/app/layout.tsx`

### Create Root-Level Tooling

- `vitest.config.ts`
- `tests/setup/vitest.ts`
- `tests/e2e/studio-smoke.spec.ts`
- `data/studio/.gitkeep`

### Create Studio Routes

- `src/app/studio/layout.tsx`
- `src/app/studio/page.tsx`
- `src/app/studio/inbox/page.tsx`
- `src/app/studio/profiles/page.tsx`
- `src/app/studio/calendar/page.tsx`
- `src/app/studio/drafts/page.tsx`
- `src/app/studio/gallery/page.tsx`
- `src/app/studio/follow-ups/page.tsx`

### Create Studio Feature UI

- `src/features/studio/layout/studio-shell.tsx`
- `src/features/studio/layout/studio-nav.tsx`
- `src/features/studio/layout/studio-header.tsx`
- `src/features/studio/components/empty-state.tsx`
- `src/features/studio/components/status-badge.tsx`
- `src/features/studio/components/tag-chip.tsx`
- `src/features/studio/dashboard/dashboard-view.tsx`
- `src/features/studio/inbox/inbox-view.tsx`
- `src/features/studio/profiles/profiles-view.tsx`
- `src/features/studio/drafts/drafts-view.tsx`
- `src/features/studio/follow-ups/follow-ups-view.tsx`
- `src/features/studio/calendar/calendar-view.tsx`
- `src/features/studio/gallery/gallery-view.tsx`

### Create Studio Data Layer

- `src/lib/studio/types.ts`
- `src/lib/studio/db/path.ts`
- `src/lib/studio/db/client.ts`
- `src/lib/studio/db/schema.ts`
- `src/lib/studio/db/bootstrap.ts`
- `src/lib/studio/db/test-db.ts`
- `src/lib/studio/repositories/profiles-repository.ts`
- `src/lib/studio/repositories/profile-links-repository.ts`
- `src/lib/studio/repositories/profile-notes-repository.ts`
- `src/lib/studio/repositories/ideas-repository.ts`
- `src/lib/studio/repositories/drafts-repository.ts`
- `src/lib/studio/repositories/calendar-repository.ts`
- `src/lib/studio/repositories/gallery-repository.ts`
- `src/lib/studio/repositories/follow-ups-repository.ts`
- `src/lib/studio/repositories/tags-repository.ts`
- `src/lib/studio/repositories/dashboard-repository.ts`

### Create Studio Services

- `src/lib/studio/services/profiles-service.ts`
- `src/lib/studio/services/ideas-service.ts`
- `src/lib/studio/services/drafts-service.ts`
- `src/lib/studio/services/follow-ups-service.ts`
- `src/lib/studio/services/calendar-service.ts`
- `src/lib/studio/services/gallery-service.ts`
- `src/lib/studio/services/dashboard-service.ts`
- `src/lib/studio/services/clipboard-service.ts`
- `src/lib/studio/services/dm-generator-service.ts`
- `src/lib/studio/services/test-factory.ts`

### Create Studio Actions

- `src/app/studio/actions/profiles.ts`
- `src/app/studio/actions/ideas.ts`
- `src/app/studio/actions/drafts.ts`
- `src/app/studio/actions/follow-ups.ts`
- `src/app/studio/actions/calendar.ts`
- `src/app/studio/actions/gallery.ts`

### Create Tests

- `tests/unit/studio/tooling.test.ts`
- `tests/unit/studio/db/bootstrap.test.ts`
- `tests/unit/studio/repositories/profiles-repository.test.ts`
- `tests/unit/studio/repositories/ideas-repository.test.ts`
- `tests/unit/studio/repositories/drafts-repository.test.ts`
- `tests/unit/studio/repositories/calendar-repository.test.ts`
- `tests/unit/studio/repositories/gallery-repository.test.ts`
- `tests/unit/studio/repositories/follow-ups-repository.test.ts`
- `tests/unit/studio/repositories/tags-repository.test.ts`
- `tests/unit/studio/repositories/dashboard-repository.test.ts`
- `tests/unit/studio/services/ideas-service.test.ts`
- `tests/unit/studio/services/profiles-service.test.ts`
- `tests/unit/studio/services/drafts-service.test.ts`
- `tests/unit/studio/services/follow-ups-service.test.ts`
- `tests/unit/studio/services/dashboard-service.test.ts`
- `tests/unit/studio/ui/studio-shell.test.tsx`
- `tests/unit/studio/ui/inbox-view.test.tsx`
- `tests/unit/studio/ui/profiles-view.test.tsx`
- `tests/unit/studio/ui/drafts-view.test.tsx`
- `tests/unit/studio/ui/follow-ups-view.test.tsx`
- `tests/unit/studio/ui/calendar-view.test.tsx`
- `tests/unit/studio/ui/gallery-view.test.tsx`

## Database And Schema Plan

### Database Path

- Primary local database file: `data/studio/killough-works-studio.db`
- Ignore the database file in `.gitignore`
- Keep `data/studio/.gitkeep` committed so the directory exists locally

### Bootstrap Rules

- Bootstrap the database on first `/studio` load if the DB file or tables are missing
- Use a small `bootstrapStudioDb()` function that is idempotent and safe to call from route entry points
- Avoid background migration runners in v1

### Table Plan

Use typed SQLite tables with ISO datetime strings:

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('new', 'active', 'warm', 'waiting', 'closed')),
  source TEXT NOT NULL DEFAULT 'manual',
  primary_note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);
```

```sql
CREATE TABLE IF NOT EXISTS ideas (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('idea', 'draft', 'approved', 'posted')),
  source TEXT NOT NULL DEFAULT 'manual',
  platform_hint TEXT,
  profile_id TEXT REFERENCES profiles(id),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);
```

```sql
CREATE TABLE IF NOT EXISTS drafts (
  id TEXT PRIMARY KEY,
  draft_type TEXT NOT NULL CHECK (draft_type IN ('post', 'dm')),
  platform TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'manual',
  profile_id TEXT REFERENCES profiles(id),
  idea_id TEXT REFERENCES ideas(id),
  approved_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);
```

Also create:

- `profile_links`
- `profile_notes`
- `calendar_items`
- `gallery_assets`
- `gallery_selections`
- `follow_ups`
- `tags`
- join tables: `profile_tags`, `idea_tags`, `draft_tags`, `gallery_asset_tags`, `follow_up_tags`

### Index Plan

Add indexes for high-traffic filters:

- `profiles(status, archived_at)`
- `ideas(status, profile_id, archived_at)`
- `drafts(status, platform, profile_id, archived_at)`
- `calendar_items(planned_for, platform, archived_at)`
- `follow_ups(status, due_at, archived_at)`
- `gallery_assets(asset_type, archived_at)`

## Repository And Service Boundaries

### Repository Layer Responsibilities

Repositories should do exactly three things:

- Execute SQL
- Map rows to typed objects
- Apply consistent archived-record filtering rules

Repositories should not:

- Decide workflow transitions
- Generate draft content
- Aggregate multi-entity dashboard business logic beyond query-oriented list assembly

### Service Layer Responsibilities

Services should handle:

- Approval-first transition rules
- Convert-idea-to-draft logic
- Profile-to-asset linking
- Follow-up creation from drafts or profiles
- Clipboard export shaping
- DM draft generation seam
- Dashboard section aggregation

### Concrete Service Contracts

```ts
export type ConvertIdeaToDraftInput = {
  ideaId: string;
  draftType: "post" | "dm";
  platform: "instagram" | "x" | "linkedin" | "direct";
};

export type ApproveDraftInput = {
  draftId: string;
};

export type CreateFollowUpInput = {
  profileId: string;
  draftId?: string;
  title: string;
  body: string;
  dueAt: string;
};
```

```ts
export function convertIdeaToDraft(input: ConvertIdeaToDraftInput): StudioDraft;
export function approveDraft(input: ApproveDraftInput): StudioDraft;
export function markDraftPosted(draftId: string): StudioDraft;
export function markDraftFollowedUp(draftId: string): StudioDraft;
export function createFollowUp(input: CreateFollowUpInput): StudioFollowUp;
export function markFollowUpDone(followUpId: string): StudioFollowUp;
```

## Task Plan

### Task 1: Add Studio Tooling And Ignore Rules

**Files:**
- Modify: `.gitignore`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `tests/setup/vitest.ts`
- Create: `data/studio/.gitkeep`

- [ ] **Step 1: Write the failing tooling check**

Create `tests/unit/studio/tooling.test.ts`:

```ts
import { describe, expect, it } from "vitest";

describe("studio tooling", () => {
  it("loads the vitest environment", () => {
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify the repo has no unit test harness yet**

Run: `npx vitest run tests/unit/studio/tooling.test.ts`
Expected: FAIL with a missing Vitest config or missing dependency error.

- [ ] **Step 3: Add minimal test and DB tooling**

Update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test:unit": "vitest run",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "better-sqlite3": "^11.8.1",
    "next": "^16.2.6",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "resend": "^4.5.1"
  },
  "devDependencies": {
    "@playwright/test": "^1.55.0",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/better-sqlite3": "^7.6.13",
    "jsdom": "^26.1.0",
    "vitest": "^3.2.4"
  }
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup/vitest.ts"],
    include: ["tests/unit/**/*.test.ts", "tests/unit/**/*.test.tsx"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Create `tests/setup/vitest.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Append to `.gitignore`:

```gitignore
data/studio/*.db
data/studio/*.sqlite
playwright-report
test-results
```

- [ ] **Step 4: Run unit tooling test**

Run: `npm run test:unit -- tests/unit/studio/tooling.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .gitignore package.json package-lock.json vitest.config.ts tests/setup/vitest.ts tests/unit/studio/tooling.test.ts data/studio/.gitkeep
git commit -m "chore: add studio test and local db tooling"
```

### Task 2: Create SQLite Bootstrap And Schema

**Files:**
- Create: `src/lib/studio/types.ts`
- Create: `src/lib/studio/db/path.ts`
- Create: `src/lib/studio/db/client.ts`
- Create: `src/lib/studio/db/schema.ts`
- Create: `src/lib/studio/db/bootstrap.ts`
- Create: `src/lib/studio/db/test-db.ts`
- Test: `tests/unit/studio/db/bootstrap.test.ts`

- [ ] **Step 1: Write the failing bootstrap test**

```ts
import { afterEach, describe, expect, it } from "vitest";
import { createTestStudioDb, destroyTestStudioDb } from "@/lib/studio/db/test-db";
import { bootstrapStudioDb } from "@/lib/studio/db/bootstrap";

describe("bootstrapStudioDb", () => {
  afterEach(() => destroyTestStudioDb());

  it("creates the core studio tables when missing", () => {
    const db = createTestStudioDb();

    bootstrapStudioDb(db);

    const tableNames = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table'")
      .all()
      .map((row) => (row as { name: string }).name);

    expect(tableNames).toEqual(
      expect.arrayContaining(["profiles", "ideas", "drafts", "calendar_items", "follow_ups"])
    );
  });
});
```

- [ ] **Step 2: Run the bootstrap test to verify it fails**

Run: `npm run test:unit -- tests/unit/studio/db/bootstrap.test.ts`
Expected: FAIL with module-not-found errors for Studio DB utilities.

- [ ] **Step 3: Add minimal schema and bootstrap code**

Create `src/lib/studio/db/path.ts`:

```ts
import path from "node:path";

export function getStudioDbPath() {
  return path.join(process.cwd(), "data", "studio", "killough-works-studio.db");
}
```

Create `src/lib/studio/db/client.ts`:

```ts
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { getStudioDbPath } from "@/lib/studio/db/path";

export function createStudioDb(filePath = getStudioDbPath()) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  return new Database(filePath);
}
```

Create `src/lib/studio/db/schema.ts` with exported SQL strings for all tables.

Create `src/lib/studio/db/bootstrap.ts`:

```ts
import type Database from "better-sqlite3";
import { STUDIO_SCHEMA } from "@/lib/studio/db/schema";

export function bootstrapStudioDb(db: Database.Database) {
  db.exec(STUDIO_SCHEMA);
}
```

Create `src/lib/studio/db/test-db.ts`:

```ts
import Database from "better-sqlite3";

let db: Database.Database | null = null;

export function createTestStudioDb() {
  db = new Database(":memory:");
  return db;
}

export function destroyTestStudioDb() {
  db?.close();
  db = null;
}
```

- [ ] **Step 4: Run bootstrap test to verify it passes**

Run: `npm run test:unit -- tests/unit/studio/db/bootstrap.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/studio/types.ts src/lib/studio/db/path.ts src/lib/studio/db/client.ts src/lib/studio/db/schema.ts src/lib/studio/db/bootstrap.ts src/lib/studio/db/test-db.ts tests/unit/studio/db/bootstrap.test.ts
git commit -m "feat: add studio sqlite bootstrap"
```

### Task 3: Implement Core Repositories

**Files:**
- Create: `src/lib/studio/repositories/*.ts`
- Test: `tests/unit/studio/repositories/*.test.ts`

- [ ] **Step 1: Write repository tests for soft archive and default filtering**

Example `tests/unit/studio/repositories/profiles-repository.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { createTestStudioDb } from "@/lib/studio/db/test-db";
import { bootstrapStudioDb } from "@/lib/studio/db/bootstrap";
import { createProfilesRepository } from "@/lib/studio/repositories/profiles-repository";

it("excludes archived profiles from the default list", () => {
  const db = createTestStudioDb();
  bootstrapStudioDb(db);
  const repository = createProfilesRepository(db);

  const active = repository.create({
    name: "Active Profile",
    category: "creator",
    status: "new",
    source: "manual",
    primaryNote: "",
  });

  const archived = repository.create({
    name: "Archived Profile",
    category: "creator",
    status: "closed",
    source: "manual",
    primaryNote: "",
  });

  repository.archive(archived.id);

  expect(repository.list()).toEqual([expect.objectContaining({ id: active.id })]);
});
```

- [ ] **Step 2: Run repository tests to verify they fail**

Run: `npm run test:unit -- tests/unit/studio/repositories`
Expected: FAIL because repository modules do not exist yet.

- [ ] **Step 3: Implement repositories with narrow responsibilities**

Repository pattern:

```ts
export function createProfilesRepository(db: Database.Database) {
  return {
    create(input: CreateProfileInput) {
      // insert with id + timestamps
    },
    list() {
      return db
        .prepare("SELECT * FROM profiles WHERE archived_at IS NULL ORDER BY updated_at DESC")
        .all();
    },
    archive(id: string) {
      db.prepare("UPDATE profiles SET archived_at = ?, updated_at = ? WHERE id = ?").run(
        new Date().toISOString(),
        new Date().toISOString(),
        id
      );
    },
  };
}
```

Repeat the same pattern for ideas, drafts, calendar items, gallery assets, follow-ups, and tags.

- [ ] **Step 4: Run repository tests**

Run: `npm run test:unit -- tests/unit/studio/repositories`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/studio/repositories tests/unit/studio/repositories
git commit -m "feat: add studio repositories"
```

### Task 4: Implement Services And Approval-First Rules

**Files:**
- Create: `src/lib/studio/services/*.ts`
- Test: `tests/unit/studio/services/*.test.ts`

- [ ] **Step 1: Write failing service tests**

Example `tests/unit/studio/services/drafts-service.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { createStudioServicesForTest } from "@/lib/studio/services/test-factory";

it("marks a draft approved without posting it", () => {
  const services = createStudioServicesForTest();
  const draft = services.drafts.create({
    draftType: "post",
    platform: "linkedin",
    title: "Test Draft",
    body: "Draft body",
    status: "draft",
    source: "manual",
  });

  const approved = services.drafts.approveDraft({ draftId: draft.id });

  expect(approved.status).toBe("approved");
  expect(approved.approvedAt).toBeTruthy();
});
```

- [ ] **Step 2: Run service tests to verify they fail**

Run: `npm run test:unit -- tests/unit/studio/services`
Expected: FAIL because service modules and test factory do not exist yet.

- [ ] **Step 3: Implement services**

Service rules:

```ts
export function createDraftsService(deps: DraftsServiceDeps) {
  return {
    approveDraft({ draftId }: ApproveDraftInput) {
      return deps.draftsRepository.updateStatus({
        id: draftId,
        status: "approved",
        approvedAt: new Date().toISOString(),
      });
    },
    markPosted(draftId: string) {
      return deps.draftsRepository.updateStatus({
        id: draftId,
        status: "posted",
      });
    },
  };
}
```

Create `src/lib/studio/services/dm-generator-service.ts` as a seam:

```ts
export function generateDmDraftSuggestion(input: {
  profileName: string;
  category: string;
  offerAngle?: string;
  notes?: string[];
}) {
  return {
    title: `DM for ${input.profileName}`,
    body: `Hey ${input.profileName}, I noticed...`,
    source: "generated-template",
  };
}
```

This keeps v1 deterministic and local-first. If AI generation is desired later, replace the internals without changing the caller surface.

- [ ] **Step 4: Run service tests**

Run: `npm run test:unit -- tests/unit/studio/services`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/studio/services tests/unit/studio/services
git commit -m "feat: add studio services and workflow rules"
```

### Task 5: Build Studio Shell And Route Scaffolding

**Files:**
- Create: `src/app/studio/layout.tsx`
- Create: `src/app/studio/page.tsx`
- Create: `src/app/studio/inbox/page.tsx`
- Create: `src/app/studio/profiles/page.tsx`
- Create: `src/app/studio/calendar/page.tsx`
- Create: `src/app/studio/drafts/page.tsx`
- Create: `src/app/studio/gallery/page.tsx`
- Create: `src/app/studio/follow-ups/page.tsx`
- Create: `src/features/studio/layout/studio-shell.tsx`
- Create: `src/features/studio/layout/studio-nav.tsx`
- Create: `src/features/studio/layout/studio-header.tsx`
- Create: `src/features/studio/components/empty-state.tsx`
- Create: `src/features/studio/components/status-badge.tsx`
- Create: `src/features/studio/components/tag-chip.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/unit/studio/ui/studio-shell.test.tsx`

- [ ] **Step 1: Write failing shell render test**

```tsx
import { render, screen } from "@testing-library/react";
import { StudioShell } from "@/features/studio/layout/studio-shell";

it("renders all studio navigation routes", () => {
  render(<StudioShell title="Studio">{<div>content</div>}</StudioShell>);

  expect(screen.getByRole("link", { name: /command center/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /inbox/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /profiles/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /follow-ups/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run shell test to verify it fails**

Run: `npm run test:unit -- tests/unit/studio/ui/studio-shell.test.tsx`
Expected: FAIL with missing module errors.

- [ ] **Step 3: Implement shell and routes**

Navigation model:

```ts
const studioNavItems = [
  { href: "/studio", label: "Command Center" },
  { href: "/studio/inbox", label: "Inbox" },
  { href: "/studio/profiles", label: "Profiles" },
  { href: "/studio/calendar", label: "Calendar" },
  { href: "/studio/drafts", label: "Drafts" },
  { href: "/studio/gallery", label: "Gallery" },
  { href: "/studio/follow-ups", label: "Follow-Ups" },
];
```

Route pages should call `bootstrapStudioDb()` before data reads.

- [ ] **Step 4: Run shell test and lint**

Run: `npm run test:unit -- tests/unit/studio/ui/studio-shell.test.tsx`
Expected: PASS

Run: `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/studio src/features/studio src/app/globals.css tests/unit/studio/ui/studio-shell.test.tsx
git commit -m "feat: add studio shell and route scaffolding"
```

### Task 6: Build Profiles View

**Files:**
- Create: `src/features/studio/profiles/profiles-view.tsx`
- Create: `src/app/studio/actions/profiles.ts`
- Test: `tests/unit/studio/ui/profiles-view.test.tsx`
- Test: `tests/unit/studio/services/profiles-service.test.ts`

- [ ] **Step 1: Write failing profiles view test**

```tsx
import { render, screen } from "@testing-library/react";
import { ProfilesView } from "@/features/studio/profiles/profiles-view";

it("renders links, notes, tags, and status for a profile", () => {
  render(
    <ProfilesView
      profiles={[
        {
          id: "p1",
          name: "Bluebird Cafe",
          category: "restaurant",
          status: "warm",
          source: "manual",
          primaryNote: "Interested in QR promo",
          links: [{ id: "l1", linkType: "instagram", label: "IG", value: "@bluebird" }],
          notes: [{ id: "n1", body: "Asked for summer offer ideas" }],
          tags: [{ id: "t1", name: "QR offers" }],
        },
      ]}
    />
  );

  expect(screen.getByText("Bluebird Cafe")).toBeInTheDocument();
  expect(screen.getByText("Interested in QR promo")).toBeInTheDocument();
  expect(screen.getByText("QR offers")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the profiles tests to verify failure**

Run: `npm run test:unit -- tests/unit/studio/ui/profiles-view.test.tsx tests/unit/studio/services/profiles-service.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement the profiles page**

Requirements:

- List profiles by `updated_at DESC`
- Show status, category, source, tags
- Show profile links in a compact section
- Show recent note history
- Support soft archive actions instead of delete

Action surface:

```ts
export async function createProfileAction(formData: FormData) {}
export async function archiveProfileAction(profileId: string) {}
export async function addProfileLinkAction(formData: FormData) {}
export async function addProfileNoteAction(formData: FormData) {}
```

- [ ] **Step 4: Run profiles tests**

Run: `npm run test:unit -- tests/unit/studio/ui/profiles-view.test.tsx tests/unit/studio/services/profiles-service.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/studio/profiles src/app/studio/actions/profiles.ts tests/unit/studio/ui/profiles-view.test.tsx tests/unit/studio/services/profiles-service.test.ts
git commit -m "feat: add studio profiles workspace"
```

### Task 7: Build Inbox View And Idea Conversion

**Files:**
- Create: `src/features/studio/inbox/inbox-view.tsx`
- Create: `src/app/studio/actions/ideas.ts`
- Test: `tests/unit/studio/ui/inbox-view.test.tsx`
- Test: `tests/unit/studio/services/ideas-service.test.ts`

- [ ] **Step 1: Write failing idea conversion test**

```ts
import { describe, expect, it } from "vitest";
import { createStudioServicesForTest } from "@/lib/studio/services/test-factory";

it("converts an idea into a draft and preserves the profile link", () => {
  const services = createStudioServicesForTest();
  const profile = services.profiles.create({
    name: "Grace Church",
    category: "church",
    status: "active",
    source: "manual",
    primaryNote: "",
  });

  const idea = services.ideas.create({
    title: "Volunteer spotlight",
    body: "Short social series idea",
    status: "idea",
    source: "manual",
    platformHint: "instagram",
    profileId: profile.id,
  });

  const draft = services.ideas.convertIdeaToDraft({
    ideaId: idea.id,
    draftType: "post",
    platform: "instagram",
  });

  expect(draft.ideaId).toBe(idea.id);
  expect(draft.profileId).toBe(profile.id);
});
```

- [ ] **Step 2: Run inbox tests to verify failure**

Run: `npm run test:unit -- tests/unit/studio/ui/inbox-view.test.tsx tests/unit/studio/services/ideas-service.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement inbox page**

Requirements:

- Create idea records with tags and optional profile link
- Filter by status and tag
- Support “convert to post draft” and “convert to DM draft”
- Show source and platform hint

- [ ] **Step 4: Run inbox tests**

Run: `npm run test:unit -- tests/unit/studio/ui/inbox-view.test.tsx tests/unit/studio/services/ideas-service.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/studio/inbox src/app/studio/actions/ideas.ts tests/unit/studio/ui/inbox-view.test.tsx tests/unit/studio/services/ideas-service.test.ts
git commit -m "feat: add studio idea inbox"
```

### Task 8: Build Drafts View, Clipboard Export, And DM Draft Generation Seam

**Files:**
- Create: `src/features/studio/drafts/drafts-view.tsx`
- Create: `src/app/studio/actions/drafts.ts`
- Create: `src/lib/studio/services/clipboard-service.ts`
- Create: `src/lib/studio/services/dm-generator-service.ts`
- Test: `tests/unit/studio/ui/drafts-view.test.tsx`
- Test: `tests/unit/studio/services/drafts-service.test.ts`

- [ ] **Step 1: Write failing draft approval and export tests**

```ts
it("exports plain text copy without mutating posted status", () => {
  const services = createStudioServicesForTest();
  const draft = services.drafts.create({
    draftType: "post",
    platform: "x",
    title: "Thread starter",
    body: "Useful operator note",
    status: "draft",
    source: "manual",
  });

  const exported = services.clipboard.prepareDraftExport(draft.id);

  expect(exported.text).toContain("Useful operator note");
  expect(services.drafts.getById(draft.id)?.status).toBe("draft");
});
```

- [ ] **Step 2: Run draft tests to verify failure**

Run: `npm run test:unit -- tests/unit/studio/ui/drafts-view.test.tsx tests/unit/studio/services/drafts-service.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement drafts page**

Requirements:

- Filter by `platform`, `draft_type`, and `status`
- Allow approval without posting
- Allow manual mark-as-posted or mark-as-followed-up transitions
- Surface generated-template DM suggestions as editable drafts
- Export plain text to clipboard on the client

Client-side clipboard helper:

```ts
await navigator.clipboard.writeText(exportText);
```

Failure handling:

- If server write fails, keep local form state untouched
- Show inline error inside the draft form or modal

- [ ] **Step 4: Run draft tests**

Run: `npm run test:unit -- tests/unit/studio/ui/drafts-view.test.tsx tests/unit/studio/services/drafts-service.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/studio/drafts src/app/studio/actions/drafts.ts src/lib/studio/services/clipboard-service.ts src/lib/studio/services/dm-generator-service.ts tests/unit/studio/ui/drafts-view.test.tsx tests/unit/studio/services/drafts-service.test.ts
git commit -m "feat: add studio drafts workflow"
```

### Task 9: Build Follow-Ups View

**Files:**
- Create: `src/features/studio/follow-ups/follow-ups-view.tsx`
- Create: `src/app/studio/actions/follow-ups.ts`
- Test: `tests/unit/studio/ui/follow-ups-view.test.tsx`
- Test: `tests/unit/studio/services/follow-ups-service.test.ts`

- [ ] **Step 1: Write failing follow-up grouping test**

```tsx
it("groups follow-ups by queued, due, and done", () => {
  render(
    <FollowUpsView
      groups={{
        queued: [{ id: "f1", title: "Prep LinkedIn DM" }],
        due: [{ id: "f2", title: "Send QR offer follow-up" }],
        done: [{ id: "f3", title: "Marked complete" }],
      }}
    />
  );

  expect(screen.getByText("Prep LinkedIn DM")).toBeInTheDocument();
  expect(screen.getByText("Send QR offer follow-up")).toBeInTheDocument();
  expect(screen.getByText("Marked complete")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run follow-up tests to verify failure**

Run: `npm run test:unit -- tests/unit/studio/ui/follow-ups-view.test.tsx tests/unit/studio/services/follow-ups-service.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement follow-ups page**

Requirements:

- Group by `queued`, `due`, and `done`
- Show linked profile and optional linked draft context
- Allow manual completion only
- Respect archived linked records with muted fallback text

- [ ] **Step 4: Run follow-up tests**

Run: `npm run test:unit -- tests/unit/studio/ui/follow-ups-view.test.tsx tests/unit/studio/services/follow-ups-service.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/studio/follow-ups src/app/studio/actions/follow-ups.ts tests/unit/studio/ui/follow-ups-view.test.tsx tests/unit/studio/services/follow-ups-service.test.ts
git commit -m "feat: add studio follow ups"
```

### Task 10: Build Weekly Calendar View

**Files:**
- Create: `src/features/studio/calendar/calendar-view.tsx`
- Create: `src/app/studio/actions/calendar.ts`
- Test: `tests/unit/studio/ui/calendar-view.test.tsx`
- Test: `tests/unit/studio/repositories/calendar-repository.test.ts`

- [ ] **Step 1: Write failing weekly-board test**

```tsx
it("renders planned items by weekday and platform", () => {
  render(
    <CalendarView
      days={[
        { label: "Mon", items: [{ id: "c1", title: "LinkedIn systems post", platform: "linkedin" }] },
      ]}
    />
  );

  expect(screen.getByText("Mon")).toBeInTheDocument();
  expect(screen.getByText("LinkedIn systems post")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run calendar tests to verify failure**

Run: `npm run test:unit -- tests/unit/studio/ui/calendar-view.test.tsx tests/unit/studio/repositories/calendar-repository.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement calendar page**

Requirements:

- Group by week and weekday
- Link planned items to drafts when present
- Show approval status without triggering automation
- Allow manual mark-posted after the real-world action

- [ ] **Step 4: Run calendar tests**

Run: `npm run test:unit -- tests/unit/studio/ui/calendar-view.test.tsx tests/unit/studio/repositories/calendar-repository.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/studio/calendar src/app/studio/actions/calendar.ts tests/unit/studio/ui/calendar-view.test.tsx tests/unit/studio/repositories/calendar-repository.test.ts
git commit -m "feat: add studio calendar board"
```

### Task 11: Build Gallery View

**Files:**
- Create: `src/features/studio/gallery/gallery-view.tsx`
- Create: `src/app/studio/actions/gallery.ts`
- Test: `tests/unit/studio/ui/gallery-view.test.tsx`
- Test: `tests/unit/studio/repositories/gallery-repository.test.ts`

- [ ] **Step 1: Write failing gallery view test**

```tsx
it("renders both reusable assets and profile selections", () => {
  render(
    <GalleryView
      assets={[{ id: "a1", title: "Restaurant funnel concept", assetType: "mockup" }]}
      selections={[{ id: "s1", profileName: "Bluebird Cafe", assetTitle: "Restaurant funnel concept" }]}
    />
  );

  expect(screen.getByText("Restaurant funnel concept")).toBeInTheDocument();
  expect(screen.getByText("Bluebird Cafe")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run gallery tests to verify failure**

Run: `npm run test:unit -- tests/unit/studio/ui/gallery-view.test.tsx tests/unit/studio/repositories/gallery-repository.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement gallery page**

Requirements:

- Filter reusable assets by `asset_type`
- Store local file path or reference string
- Show shared library and profile-linked selections separately
- Support soft archive instead of delete

- [ ] **Step 4: Run gallery tests**

Run: `npm run test:unit -- tests/unit/studio/ui/gallery-view.test.tsx tests/unit/studio/repositories/gallery-repository.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/studio/gallery src/app/studio/actions/gallery.ts tests/unit/studio/ui/gallery-view.test.tsx tests/unit/studio/repositories/gallery-repository.test.ts
git commit -m "feat: add studio gallery"
```

### Task 12: Build Command Center Dashboard

**Files:**
- Create: `src/features/studio/dashboard/dashboard-view.tsx`
- Test: `tests/unit/studio/repositories/dashboard-repository.test.ts`
- Test: `tests/unit/studio/services/dashboard-service.test.ts`

- [ ] **Step 1: Write failing dashboard aggregation test**

```ts
it("collects approval queue, due follow-ups, recent ideas, and active profiles", () => {
  const services = createStudioServicesForTest();
  const dashboard = services.dashboard.getDashboard();

  expect(dashboard).toHaveProperty("approvalQueue");
  expect(dashboard).toHaveProperty("dueFollowUps");
  expect(dashboard).toHaveProperty("recentIdeas");
  expect(dashboard).toHaveProperty("activeProfiles");
});
```

- [ ] **Step 2: Run dashboard tests to verify failure**

Run: `npm run test:unit -- tests/unit/studio/repositories/dashboard-repository.test.ts tests/unit/studio/services/dashboard-service.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement dashboard queries and view**

Dashboard should show:

- Drafts awaiting approval
- Follow-ups due
- Recent ideas
- Active or warm profiles
- Recent gallery selections tied to active work

The dashboard should remain read-heavy and aggregate from existing repositories instead of adding duplicate storage.

- [ ] **Step 4: Run dashboard tests**

Run: `npm run test:unit -- tests/unit/studio/repositories/dashboard-repository.test.ts tests/unit/studio/services/dashboard-service.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/studio/dashboard tests/unit/studio/repositories/dashboard-repository.test.ts tests/unit/studio/services/dashboard-service.test.ts
git commit -m "feat: add studio dashboard"
```

### Task 13: Add Failure-State UX And E2E Verification

**Files:**
- Modify: `src/features/studio/*/*.tsx`
- Modify: `src/app/studio/actions/*.ts`
- Create: `tests/e2e/studio-smoke.spec.ts`

- [ ] **Step 1: Write failing e2e smoke flow**

```ts
import { test, expect } from "@playwright/test";

test("idea to draft to calendar flow stays manual", async ({ page }) => {
  await page.goto("/studio");
  await expect(page.getByText("Command Center")).toBeVisible();
  await page.goto("/studio/inbox");
  await expect(page.getByText(/idea inbox/i)).toBeVisible();
});
```

- [ ] **Step 2: Run e2e test to verify failure**

Run: `npm run test:e2e -- tests/e2e/studio-smoke.spec.ts`
Expected: FAIL because Studio routes and app runtime are not prepared for Playwright yet.

- [ ] **Step 3: Harden error handling and archived fallbacks**

Checklist:

- Preserve unsaved form state on server-write failure
- Show inline error text near the form or control that failed
- Render muted fallback copy for archived or missing linked records
- Keep archive actions soft-delete only
- Confirm no action auto-posts or auto-sends

- [ ] **Step 4: Run all verification**

Run: `npm run lint`
Expected: PASS

Run: `npm run test:unit`
Expected: PASS

Run: `npm run build`
Expected: PASS

Run: `npm run test:e2e -- tests/e2e/studio-smoke.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/studio src/app/studio/actions tests/e2e/studio-smoke.spec.ts
git commit -m "test: verify studio local workflow"
```

## Testing Plan By Phase

### Phase 1

- Verify Vitest starts and resolves `@/`
- Verify `.gitignore` excludes local DB artifacts

### Phase 2

- Unit-test idempotent DB bootstrap
- Unit-test repository default filtering and archive behavior

### Phase 3

- UI-test Studio shell navigation and layout rendering
- Run `npm run lint`

### Phase 4

- UI-test profiles and inbox views
- Service-test convert-idea-to-draft behavior and profile linkage retention

### Phase 5

- Service-test approval transitions
- Service-test clipboard export without status mutation
- UI-test drafts and follow-ups view grouping

### Phase 6

- Repository-test weekly calendar queries and gallery filtering
- UI-test calendar and gallery views

### Phase 7

- Service-test dashboard aggregation
- Playwright smoke flow for idea -> draft -> calendar -> manual status confirmation path
- Full `lint`, `test:unit`, `build`, and `test:e2e`

## Risks And Open Decisions

### 1. SQLite Driver Choice

Current recommendation: `better-sqlite3`.

Reason:

- Simple local-first sync API
- Good fit for server-only route handlers and server actions

Risk:

- Native dependency build friction on some machines or CI environments

Fallback:

- Swap to `sqlite` plus `sqlite3` or `@libsql/client` only if native install friction blocks the repo

### 2. DM Draft Generator Scope

Current recommendation:

- Ship a deterministic template-based generator in v1 through `dm-generator-service.ts`

Reason:

- Keeps the feature local-first and avoids adding AI config complexity before the core operating system exists

Open decision:

- If AI-assisted generation is required in v1, define the provider, secret handling, and failure UX before implementation starts

### 3. Studio Route Exposure

Current recommendation:

- Build `/studio` without auth in v1, but keep route-local architecture ready for later auth

Risk:

- If this app is deployed publicly before auth is added, `/studio` would be exposed

Mitigation:

- Before any public deploy that includes Studio, add a route gate or environment-based disable flag

### 4. Gallery Asset Storage

Current recommendation:

- Store asset metadata and local file reference strings in v1

Open decision:

- Whether file uploads are in scope now or whether v1 should use manually entered paths and references only

### 5. Command Center Density

Current recommendation:

- Keep the dashboard aggregate read-focused and let detail routes carry the heavier interaction load

Risk:

- Overstuffing the dashboard would make the first page heavy and brittle

Mitigation:

- Use the dashboard for summaries and quick links, not full editing workflows

## Spec Coverage Check

The plan covers:

- Local-first SQLite storage
- `/studio` plus all approved child routes
- Shared profiles plus global ideas
- Approval-first drafts and follow-ups
- Calendar planning with no auto-posting
- Gallery library plus profile-linked selections
- Soft archive behavior
- Missing-link graceful fallbacks
- Preserved form state on write failure
- A command-center aggregate dashboard

## Placeholder Scan

This plan intentionally avoids:

- placeholder markers or deferred-spec gaps
- Generic “add validation” instructions without file targets
- Unnamed test commands
- Implicit database location decisions

## Type Consistency Check

The plan uses these stable status names throughout:

- Profiles: `new`, `active`, `warm`, `waiting`, `closed`
- Content: `idea`, `draft`, `approved`, `posted`
- Outreach drafts: `idea`, `draft`, `approved`, `followed_up`
- Follow-ups: `queued`, `due`, `done`

The plan also keeps these stable type names:

- `profile_links`
- `profile_notes`
- `gallery_assets`
- `gallery_selections`
- `follow_ups`
