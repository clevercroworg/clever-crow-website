import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Unit tests (no database, no network). Run with: npm test
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./", import.meta.url)) } },
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
});
