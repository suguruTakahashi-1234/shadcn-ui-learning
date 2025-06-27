import type { KnipConfig } from "knip";

const config: KnipConfig = {
  // 🔧 === 最小限の設定（ignoreを全て無効化） ===

  // 📦 === pnpm workspaceの各パッケージ設定（必須） ===
  workspaces: {
    // 🚀 サーバーパッケージ
    "packages/server": {
      entry: ["src/index.ts"],
      project: ["src/**/*.ts"],
    },
    // 🌐 Webクライアント
    "packages/web-client": {
      entry: ["src/main.tsx"],
      project: ["src/**/*.{ts,tsx}"],
    },
    // 🗄️ データベースパッケージ
    "packages/database": {
      entry: [],
      project: ["src/**/*.ts"],
    },
    // 🔌 APIクライアント
    "packages/api-client": {
      entry: [],
      project: ["src/**/*.ts"],
    },
    // 🔗 共有パッケージ
    "packages/shared": {
      entry: [],
      project: ["src/**/*.ts"],
    },
  },

  // 🔍 === 厳格な設定 ===
  ignoreExportsUsedInFile: false,
  includeEntryExports: true, // エントリーファイルも含めてすべて検査

  // ⚠️ === すべてのignore設定を無効化 ===
  ignoreDependencies: [], // 依存関係もすべて検査
  ignoreUnresolved: [], // 未解決インポートも検査
  ignoreWorkspaces: [], // すべてのワークスペースを検査
  ignore: [], // すべてのファイルを検査対象に
};

export default config;
