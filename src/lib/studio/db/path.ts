import path from "node:path";

export function getStudioDbPath() {
  return path.join(process.cwd(), "data", "studio", "killough-works-studio.db");
}
