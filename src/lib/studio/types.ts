export const PROFILE_STATUSES = [
  "new",
  "active",
  "warm",
  "waiting",
  "closed",
] as const;

export const CONTENT_STATUSES = [
  "idea",
  "draft",
  "approved",
  "posted",
] as const;

export const OUTREACH_STATUSES = [
  "idea",
  "draft",
  "approved",
  "followed_up",
] as const;

export const FOLLOW_UP_STATUSES = ["queued", "due", "done"] as const;

export const DRAFT_TYPES = ["post", "dm"] as const;

export type ProfileStatus = (typeof PROFILE_STATUSES)[number];
export type ContentStatus = (typeof CONTENT_STATUSES)[number];
export type OutreachStatus = (typeof OUTREACH_STATUSES)[number];
export type FollowUpStatus = (typeof FOLLOW_UP_STATUSES)[number];
export type DraftType = (typeof DRAFT_TYPES)[number];
