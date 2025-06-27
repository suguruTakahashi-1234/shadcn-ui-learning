import type { KnipConfig } from "knip";

const config: KnipConfig = {
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
