import type Database from "better-sqlite3";

import { STUDIO_SCHEMA } from "./schema";

export function bootstrapStudioDb(db: Database.Database) {
  db.exec(STUDIO_SCHEMA);
}
