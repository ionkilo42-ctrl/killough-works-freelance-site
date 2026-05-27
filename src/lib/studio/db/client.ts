import { mkdirSync } from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";

import { getStudioDbPath } from "./path";

export function createStudioDb(filePath = getStudioDbPath()) {
  mkdirSync(path.dirname(filePath), { recursive: true });

  return new Database(filePath);
}
