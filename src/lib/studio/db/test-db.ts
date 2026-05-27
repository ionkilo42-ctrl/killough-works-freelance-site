import Database from "better-sqlite3";

export function createTestStudioDb() {
  return new Database(":memory:");
}

export function destroyTestStudioDb(db: Database.Database) {
  db.close();
}
