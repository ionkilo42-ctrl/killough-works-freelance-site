import {
  CONTENT_STATUSES,
  DRAFT_TYPES,
  FOLLOW_UP_STATUSES,
  OUTREACH_STATUSES,
  PROFILE_STATUSES,
} from "@/lib/studio/types";

const quoted = (values: readonly string[]) =>
  values.map((value) => `'${value}'`).join(", ");

const profileStatusList = quoted(PROFILE_STATUSES);
const contentStatusList = quoted(CONTENT_STATUSES);
const outreachStatusList = quoted(OUTREACH_STATUSES);
const followUpStatusList = quoted(FOLLOW_UP_STATUSES);
const draftTypeList = quoted(DRAFT_TYPES);

export const STUDIO_SCHEMA = `
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (${profileStatusList})),
  source TEXT NOT NULL DEFAULT 'manual',
  primary_note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE IF NOT EXISTS profile_links (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  link_type TEXT NOT NULL,
  label TEXT NOT NULL DEFAULT '',
  value TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE IF NOT EXISTS profile_notes (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'manual',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE IF NOT EXISTS ideas (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (${contentStatusList})),
  source TEXT NOT NULL DEFAULT 'manual',
  platform_hint TEXT,
  profile_id TEXT REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE IF NOT EXISTS drafts (
  id TEXT PRIMARY KEY,
  draft_type TEXT NOT NULL CHECK (draft_type IN (${draftTypeList})),
  platform TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'manual',
  profile_id TEXT REFERENCES profiles(id) ON DELETE SET NULL,
  idea_id TEXT REFERENCES ideas(id) ON DELETE SET NULL,
  approved_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT,
  CHECK (
    (draft_type = 'post' AND status IN (${contentStatusList})) OR
    (draft_type = 'dm' AND status IN (${outreachStatusList}))
  )
);

CREATE TABLE IF NOT EXISTS calendar_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  planned_for TEXT NOT NULL,
  platform TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (${contentStatusList})),
  draft_id TEXT REFERENCES drafts(id) ON DELETE SET NULL,
  profile_id TEXT REFERENCES profiles(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'manual',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE IF NOT EXISTS gallery_assets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  asset_type TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'manual',
  file_path TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE IF NOT EXISTS gallery_selections (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  gallery_asset_id TEXT NOT NULL REFERENCES gallery_assets(id) ON DELETE CASCADE,
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE IF NOT EXISTS follow_ups (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  draft_id TEXT REFERENCES drafts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  due_at TEXT,
  status TEXT NOT NULL CHECK (status IN (${followUpStatusList})),
  source TEXT NOT NULL DEFAULT 'manual',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS profile_tags (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT,
  UNIQUE(profile_id, tag_id)
);

CREATE TABLE IF NOT EXISTS idea_tags (
  id TEXT PRIMARY KEY,
  idea_id TEXT NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT,
  UNIQUE(idea_id, tag_id)
);

CREATE TABLE IF NOT EXISTS draft_tags (
  id TEXT PRIMARY KEY,
  draft_id TEXT NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT,
  UNIQUE(draft_id, tag_id)
);

CREATE TABLE IF NOT EXISTS gallery_asset_tags (
  id TEXT PRIMARY KEY,
  gallery_asset_id TEXT NOT NULL REFERENCES gallery_assets(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT,
  UNIQUE(gallery_asset_id, tag_id)
);

CREATE TABLE IF NOT EXISTS follow_up_tags (
  id TEXT PRIMARY KEY,
  follow_up_id TEXT NOT NULL REFERENCES follow_ups(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT,
  UNIQUE(follow_up_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_profile_links_profile_id
  ON profile_links(profile_id);

CREATE INDEX IF NOT EXISTS idx_profile_notes_profile_id
  ON profile_notes(profile_id);

CREATE INDEX IF NOT EXISTS idx_ideas_profile_id
  ON ideas(profile_id);

CREATE INDEX IF NOT EXISTS idx_drafts_profile_id
  ON drafts(profile_id);

CREATE INDEX IF NOT EXISTS idx_drafts_idea_id
  ON drafts(idea_id);

CREATE INDEX IF NOT EXISTS idx_calendar_items_draft_id
  ON calendar_items(draft_id);

CREATE INDEX IF NOT EXISTS idx_calendar_items_profile_id
  ON calendar_items(profile_id);

CREATE INDEX IF NOT EXISTS idx_gallery_selections_profile_id
  ON gallery_selections(profile_id);

CREATE INDEX IF NOT EXISTS idx_gallery_selections_gallery_asset_id
  ON gallery_selections(gallery_asset_id);

CREATE INDEX IF NOT EXISTS idx_follow_ups_profile_id
  ON follow_ups(profile_id);

CREATE INDEX IF NOT EXISTS idx_follow_ups_draft_id
  ON follow_ups(draft_id);

CREATE INDEX IF NOT EXISTS idx_profile_tags_profile_id
  ON profile_tags(profile_id);

CREATE INDEX IF NOT EXISTS idx_profile_tags_tag_id
  ON profile_tags(tag_id);

CREATE INDEX IF NOT EXISTS idx_idea_tags_idea_id
  ON idea_tags(idea_id);

CREATE INDEX IF NOT EXISTS idx_idea_tags_tag_id
  ON idea_tags(tag_id);

CREATE INDEX IF NOT EXISTS idx_draft_tags_draft_id
  ON draft_tags(draft_id);

CREATE INDEX IF NOT EXISTS idx_draft_tags_tag_id
  ON draft_tags(tag_id);

CREATE INDEX IF NOT EXISTS idx_gallery_asset_tags_gallery_asset_id
  ON gallery_asset_tags(gallery_asset_id);

CREATE INDEX IF NOT EXISTS idx_gallery_asset_tags_tag_id
  ON gallery_asset_tags(tag_id);

CREATE INDEX IF NOT EXISTS idx_follow_up_tags_follow_up_id
  ON follow_up_tags(follow_up_id);

CREATE INDEX IF NOT EXISTS idx_follow_up_tags_tag_id
  ON follow_up_tags(tag_id);
`;
