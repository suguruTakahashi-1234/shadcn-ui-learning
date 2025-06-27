import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // ⏱️ 並列実行
    pool: "threads",
    projects: ["packages/*"],
  },
});
