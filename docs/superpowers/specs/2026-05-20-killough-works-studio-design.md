# Killough Works Studio Design

Date: 2026-05-20
Project: Killough Works local-first content operating system
Status: Drafted for user review

## Goal

Build a local-first internal Studio for Killough Works that manages social content, outreach, visual pitch examples, and leads from one dashboard.

The system should support:

- Idea inbox
- Lead and contact tracking
- Content calendar
- Post drafts for Instagram, X, and LinkedIn
- DM draft generation
- Visual pitch gallery
- Status tracking across content and outreach workflows
- Notes for each creator or business
- Tags such as `restaurant`, `creator`, `church`, `local business`, `AI systems`, `QR offers`, and `automation`
- Clipboard export for post copy
- Local-first storage in a simple database

The system must remain approval-first. It must not auto-post or auto-send in v1.

## Product Boundary

This system will be built inside the current Next.js repository, but treated as its own internal product boundary so it can split into a separate app later if needed.

Public site boundary:

- `/` remains the public Killough Works marketing and intake site

Internal Studio boundary:

- `/studio`
- `/studio/inbox`
- `/studio/profiles`
- `/studio/calendar`
- `/studio/drafts`
- `/studio/gallery`
- `/studio/follow-ups`

The Studio must have its own layout, navigation, UI components, local database access layer, and service layer. Public-site logic and Studio workflow logic should not be mixed together beyond sharing the host Next.js runtime.

## Visual Direction

The Studio should use a Killough Works brand direction that feels:

- Dark
- Sharp
- Blue and white
- Visual strategy studio
- Clean, restrained, operator-built

The interface should feel like a working command center, not a generic SaaS admin template.

## Information Architecture

The Studio home should be a mixed command center, not a narrow CRM-first or content-first surface.

Primary areas:

- Command center dashboard for today’s work, pending approvals, due follow-ups, and active signals
- Global idea inbox for ideas that may or may not belong to a specific target yet
- Shared profiles for creators, businesses, restaurants, churches, and local brands
- Draft workspace for post drafts and DM drafts
- Weekly content calendar for operational planning
- Visual pitch gallery for reusable examples and lead-specific pitch boards
- Follow-up workspace for explicit outreach next actions

Navigation structure:

- `/studio`: mixed command center dashboard
- `/studio/inbox`: global idea capture and triage
- `/studio/profiles`: shared target records with notes, links, tags, and linked work
- `/studio/calendar`: weekly content planning board
- `/studio/drafts`: content drafts and DM drafts
- `/studio/gallery`: shared visual reference library plus lead-specific selections
- `/studio/follow-ups`: outreach next actions and completion tracking

## Domain Modules

Studio logic should be split into portable domain modules:

- `ideas`
- `profiles`
- `content`
- `outreach`
- `gallery`

These modules should be treated as the future portability boundary if the Studio is later moved into a separate repository or product.

## Data Model

Use a local SQLite database as the primary store in v1.

The schema should be explicit and inspectable. Avoid collapsing core records into generic JSON blobs when typed fields are a better fit.

Cross-cutting record conventions:

- Core records should include `created_at` and `updated_at`
- Records that need recoverability should use soft archive or soft delete fields such as `archived_at` or `deleted_at`
- Records that benefit from provenance should include a `source` field
- Default app behavior should exclude archived records from normal list views

### Profiles

`profiles`

Purpose:

- Shared record for a creator, business, restaurant, church, local business, or other target

Suggested fields:

- `id`
- `name`
- `category`
- `status` with values `new`, `active`, `warm`, `waiting`, `closed`
- `source`
- `primary_note`
- `created_at`
- `updated_at`
- `archived_at`

Notes:

- This is the anchor record for relationship-based work
- Content ideas may exist globally before being linked to a profile

### Profile Links

`profile_links`

Purpose:

- Normalize external links and contact methods for a profile

Suggested fields:

- `id`
- `profile_id`
- `link_type` such as `instagram`, `tiktok`, `website`, `youtube`, `email`, `phone`, `linkedin`, `x`
- `label`
- `value`
- `created_at`
- `updated_at`
- `archived_at`

### Profile Notes

`profile_notes`

Purpose:

- Timestamped note history for a profile without overloading the main profile row

Suggested fields:

- `id`
- `profile_id`
- `body`
- `source`
- `created_at`
- `updated_at`
- `archived_at`

### Ideas

`ideas`

Purpose:

- Global idea inbox for content, outreach angles, or campaign concepts that may start unattached and be linked later

Suggested fields:

- `id`
- `title`
- `body`
- `status` with values `idea`, `draft`, `approved`, `posted` when used in content context
- `source`
- `platform_hint`
- `profile_id` nullable
- `created_at`
- `updated_at`
- `archived_at`

Notes:

- Ideas should be allowed to exist without a linked profile
- Ideas should be convertible into drafts

### Drafts

`drafts`

Purpose:

- Store post drafts and DM drafts for Instagram, X, LinkedIn, and outreach use

Suggested fields:

- `id`
- `draft_type` such as `post` or `dm`
- `platform` such as `instagram`, `x`, `linkedin`, `direct`
- `title`
- `body`
- `status`
- `source`
- `profile_id` nullable
- `idea_id` nullable
- `approved_at` nullable
- `created_at`
- `updated_at`
- `archived_at`

Status rules:

- Content workflow: `idea`, `draft`, `approved`, `posted`
- Outreach workflow: `idea`, `draft`, `approved`, `followed_up`

Notes:

- Drafts must remain editable after generation
- Clipboard export should work from drafts without connecting publishing APIs

### Calendar Items

`calendar_items`

Purpose:

- Represent weekly planning items for content scheduling

Suggested fields:

- `id`
- `title`
- `planned_for`
- `platform`
- `status`
- `draft_id` nullable
- `profile_id` nullable
- `source`
- `created_at`
- `updated_at`
- `archived_at`

Notes:

- This is planning metadata only in v1
- Calendar items do not trigger posting

### Gallery Assets

`gallery_assets`

Purpose:

- Shared pitch and reference library for screenshots, mockups, diagrams, and related visual examples

Suggested fields:

- `id`
- `title`
- `description`
- `asset_type` such as `screenshot`, `mockup`, `diagram`, `pitch visual`, `reference`, `generated image`, `case study`, `ui concept`
- `source`
- `file_path` or local asset reference
- `created_at`
- `updated_at`
- `archived_at`

### Gallery Selections

`gallery_selections`

Purpose:

- Attach shared gallery assets to specific profiles to form a lead-specific pitch board

Suggested fields:

- `id`
- `profile_id`
- `gallery_asset_id`
- `note`
- `created_at`
- `updated_at`
- `archived_at`

### Follow Ups

`follow_ups`

Purpose:

- Track explicit outreach next actions and relationship maintenance

Suggested fields:

- `id`
- `profile_id`
- `draft_id` nullable
- `title`
- `body`
- `due_at`
- `status` with values `queued`, `due`, `done`
- `source`
- `created_at`
- `updated_at`
- `archived_at`

### Tags

`tags`

Purpose:

- Reusable classification for profiles, ideas, drafts, gallery assets, and follow-ups

Suggested fields:

- `id`
- `name`
- `created_at`
- `updated_at`

Join tables should be created where needed, such as:

- `profile_tags`
- `idea_tags`
- `draft_tags`
- `gallery_asset_tags`
- `follow_up_tags`

## Workflow States

The system should use a coherent but not over-forced state model.

### Content workflow

- `idea`
- `draft`
- `approved`
- `posted`

### Outreach workflow

- `idea`
- `draft`
- `approved`
- `followed_up`

### Profile lifecycle

- `new`
- `active`
- `warm`
- `waiting`
- `closed`

### Follow-up lifecycle

- `queued`
- `due`
- `done`

These states should be reflected in filters, badges, dashboard summaries, and detail views.

## Approval-First Rules

Approval-first behavior is a central product rule, not just a UI convention.

Required rules:

- Creating a draft never posts or sends anything
- Generating a DM draft never sends anything
- Moving an item to `approved` still does not post or send anything
- Clipboard export only copies text for manual use
- Calendar scheduling only plans work locally
- `posted` and `followed_up` are manual confirmation states set after the real-world action happens
- v1 includes no auto-posting and no auto-sending

## Technical Implementation Shape

Use the current Next.js app as the host runtime, with the Studio isolated in its own internal structure.

Suggested structure:

- `src/app/studio/...` for routes, layouts, and server actions or route handlers related to Studio
- `src/features/studio/...` for Studio UI grouped by domain
- `src/lib/studio/db/...` for SQLite connection, schema bootstrapping, and repositories
- `src/lib/studio/services/...` for workflow logic and cross-entity actions
- `src/lib/studio/types/...` for shared domain types

Suggested layer boundaries:

- Route layer for rendering pages and handling user interactions
- Repository layer for SQLite CRUD and query operations
- Service layer for approval transitions, conversions, linking, aggregation, and export preparation
- View-model layer for shaping dashboard cards, weekly boards, queues, and grouped display data

## Local-First Behavior

The Studio should be local-first in both storage and workflow.

Required behavior:

- Every write persists locally to SQLite first
- The SQLite database should bootstrap on first Studio load if the file or schema is missing
- The app should remain useful with no external publishing or messaging integrations configured
- Outbound automation is out of scope for v1
- Clipboard export should support manual publishing workflows

## View Mapping

### `/studio`

Purpose:

- Mixed command center dashboard for the current operating picture

Should aggregate:

- Drafts awaiting approval
- Follow-ups due
- Recent ideas
- Active or warm profiles
- Selected gallery assets tied to live work

### `/studio/inbox`

Purpose:

- Global idea capture and triage

Should support:

- Creating raw ideas
- Tagging ideas
- Linking ideas to profiles later
- Converting ideas into drafts

### `/studio/profiles`

Purpose:

- Shared records for creators and businesses

Should support:

- Editing profile metadata and status
- Managing profile links
- Adding notes
- Viewing related drafts, follow-ups, and gallery selections
- Filtering by tags and profile status

### `/studio/calendar`

Purpose:

- Weekly content planning board

Should support:

- Creating planned items
- Linking calendar items to drafts
- Organizing by week and platform
- Reflecting approval status without implying automated scheduling

### `/studio/drafts`

Purpose:

- Main editing surface for content drafts and DM drafts

Should support:

- Filtering by platform
- Filtering by draft type
- Filtering by status
- Linking to ideas and profiles
- Approving drafts
- Copying export-ready text to clipboard

### `/studio/gallery`

Purpose:

- Shared visual pitch library plus profile-specific pitch selections

Should support:

- Managing reusable visual references
- Filtering by asset type
- Linking shared assets to profiles
- Keeping a distinction between the shared library and lead-specific selections

### `/studio/follow-ups`

Purpose:

- Explicit outreach and relationship next-action workspace

Should support:

- Grouping by `queued`, `due`, and `done`
- Linking follow-ups to profiles and optional drafts
- Manual completion after the real-world action happens

## Failure Handling

Failure handling should remain plain, local, and inspectable.

Required behavior:

- If a write fails, show a visible inline error
- Preserve unsaved form state on write failure so the user can retry without re-entering everything
- If the database file or schema is missing, bootstrap SQLite on first Studio load
- If linked records are missing or archived, show a graceful muted fallback state instead of crashing or dropping context invisibly
- Soft archive should remove records from default views while keeping them recoverable in filtered or later recovery views

Hard deletes should be avoided for normal workflow operations in v1.

## Testing Strategy

Testing should align to the real boundaries of the system.

Repository tests:

- CRUD for each core table
- Tag joins
- Profile link handling
- Soft archive behavior
- Missing-link query behavior

Service tests:

- Approval-first state transitions
- Convert idea to draft flows
- Link and unlink profile relationships
- Follow-up creation and completion
- Dashboard aggregation logic

UI tests:

- Empty state rendering
- Populated state rendering
- Archived-linked-record fallback rendering
- Filtered views by status, platform, and tag

End-to-end local flow:

- Create an idea
- Link the idea to a profile
- Convert the idea into a draft
- Approve the draft
- Add it to the calendar
- Mark it posted or followed up manually

## Initial Build Scope

The first implementation pass should produce a usable vertical slice, not just a static shell.

v1 build order:

1. Studio shell and navigation
2. SQLite setup and schema
3. Profiles view with notes, links, tags, and status
4. Idea inbox with convert and link actions
5. Drafts view with platform filtering and clipboard export
6. Follow-ups view
7. Weekly calendar view
8. Gallery library plus profile-linked selections
9. Command-center dashboard aggregation

## Out Of Scope For V1

The following are intentionally excluded from v1:

- Auto-posting to Instagram, X, or LinkedIn
- Auto-sending DMs or outreach messages
- Multi-user collaboration
- External scheduling APIs
- Background automation that changes remote systems
- Heavy CRM complexity beyond the specified local operator workflow

## Success Criteria

The design should be considered successful if v1 delivers:

- One local dashboard for content, outreach, leads, and pitch examples
- Approval-first operation with no accidental sending or posting behavior
- A usable working flow from idea to draft to planned content or follow-up
- Shared profile context across drafts, notes, follow-ups, and gallery selections
- A structure that can split into a separate Studio app later without rewriting the core domain model
