import type { KnipConfig } from "knip";

const config: KnipConfig = {
  // 🔧 === 共通設定 ===
  ignoreExportsUsedInFile: false, // ファイル内で使用されているexportも検出対象

  // 🔌 === Knipプラグイン設定 ===
  vitest: {
    config: ["vitest.config.ts", "packages/*/vitest.config.ts"],
  },
  typescript: {
    config: [
      "tsconfig.base.json",
      "tsconfig.json",
      "packages/*/tsconfig.json",
      "packages/*/tsconfig.build.json",
    ],
  },

  // 🚫 === 無視する依存関係 ===
  // 各パッケージごとの設定は workspaces 内で行う
  ignoreDependencies: [
    // 📘 TypeScript 関連
    "tslib", // tsconfig.base.json の importHelpers で自動的に使用される
  ],

  // 🔍 無視する未解決インポート（Knipのワークスペース相対パス解決の問題回避）
  ignoreUnresolved: [
    "./src/__tests__/setup.ts", // Vitest setup files - 実際には存在するがKnipが相対パスを解決できない
  ],

  // 🚮 除外するファイル・ディレクトリ
  ignore: [
    // 🤖 自動生成
    "packages/**/src/generated/**",
    "docs/api/**",

    // 📦 ビルド成果物
    "**/dist/**",
    "**/build/**",
    "**/*.tsbuildinfo",

    // ⚙️ 設定・環境ファイル
    "knip/**", // Knip関連ファイル（設定、レポート等）
    ".husky/**",

    // 🧪 マニュアルテスト関連
    "**/*.manual.test.ts",
  ],
};

export default config;
