import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { bootstrapStudioDb } from "@/lib/studio/db/bootstrap";
import {
  createTestStudioDb,
  destroyTestStudioDb,
} from "@/lib/studio/db/test-db";

describe("bootstrapStudioDb", () => {
  let db: ReturnType<typeof createTestStudioDb>;

  beforeEach(() => {
    db = createTestStudioDb();
  });

  afterEach(() => {
    destroyTestStudioDb(db);
  });

  it("creates the full task 2 studio schema", () => {
    bootstrapStudioDb(db);

    const rows = db
      .prepare<[], { name: string }>(
        "SELECT name FROM sqlite_master WHERE type = 'table'",
      )
      .all();
    const tableNames = rows.map((row) => row.name).sort();

    expect(tableNames).toEqual([
      "calendar_items",
      "draft_tags",
      "drafts",
      "follow_up_tags",
      "follow_ups",
      "gallery_asset_tags",
      "gallery_assets",
      "gallery_selections",
      "idea_tags",
      "ideas",
      "profile_links",
      "profile_notes",
      "profile_tags",
      "profiles",
      "tags",
    ]);
  });

  it("creates the task 2 relation indexes", () => {
    bootstrapStudioDb(db);

    const rows = db
      .prepare<[], { name: string }>(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND name NOT LIKE 'sqlite_%'",
      )
      .all();
    const indexNames = rows.map((row) => row.name).sort();

    expect(indexNames).toEqual([
      "idx_calendar_items_draft_id",
      "idx_calendar_items_profile_id",
      "idx_draft_tags_draft_id",
      "idx_draft_tags_tag_id",
      "idx_drafts_idea_id",
      "idx_drafts_profile_id",
      "idx_follow_up_tags_follow_up_id",
      "idx_follow_up_tags_tag_id",
      "idx_follow_ups_draft_id",
      "idx_follow_ups_profile_id",
      "idx_gallery_asset_tags_gallery_asset_id",
      "idx_gallery_asset_tags_tag_id",
      "idx_gallery_selections_gallery_asset_id",
      "idx_gallery_selections_profile_id",
      "idx_idea_tags_idea_id",
      "idx_idea_tags_tag_id",
      "idx_ideas_profile_id",
      "idx_profile_links_profile_id",
      "idx_profile_notes_profile_id",
      "idx_profile_tags_profile_id",
      "idx_profile_tags_tag_id",
    ]);
  });

  it("enforces draft status validity by draft type", () => {
    bootstrapStudioDb(db);

    const insertDraft = db.prepare<
      [string, string, string, string, string, string, string, string],
      unknown
    >(
      `INSERT INTO drafts (
        id,
        draft_type,
        platform,
        title,
        body,
        status,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    );

    expect(() =>
      insertDraft.run(
        "draft-post-ok",
        "post",
        "x",
        "Post title",
        "Post body",
        "posted",
        "2026-05-20T00:00:00.000Z",
        "2026-05-20T00:00:00.000Z",
      ),
    ).not.toThrow();

    expect(() =>
      insertDraft.run(
        "draft-dm-ok",
        "dm",
        "direct",
        "DM title",
        "DM body",
        "followed_up",
        "2026-05-20T00:00:00.000Z",
        "2026-05-20T00:00:00.000Z",
      ),
    ).not.toThrow();

    expect(() =>
      insertDraft.run(
        "draft-post-bad",
        "post",
        "x",
        "Bad post",
        "Bad body",
        "followed_up",
        "2026-05-20T00:00:00.000Z",
        "2026-05-20T00:00:00.000Z",
      ),
    ).toThrow(/CHECK constraint failed/i);

    expect(() =>
      insertDraft.run(
        "draft-dm-bad",
        "dm",
        "direct",
        "Bad dm",
        "Bad body",
        "posted",
        "2026-05-20T00:00:00.000Z",
        "2026-05-20T00:00:00.000Z",
      ),
    ).toThrow(/CHECK constraint failed/i);
  });
});
