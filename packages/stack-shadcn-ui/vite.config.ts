import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tanstackRouter({
      generatedRouteTree: "./src/generated/routeTree.gen.ts",
    }),
    // ビルド時のみvisualizerを有効化
    process.env.ANALYZE === "true" &&
      visualizer({
        filename: "dist/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        // 推奨: 機能ベースの分割
        manualChunks: (id) => {
          // 1. 必須の基盤（すぐに必要）
          if (id.includes("react") || id.includes("react-dom")) {
            return "react-core";
          }

          // 2. ルーティング（初期表示に必要）
          if (id.includes("@tanstack/react-router")) {
            return "router";
          }

          // 3. 大きなライブラリを個別に
          if (id.includes("react-hook-form") || id.includes("@hookform")) {
            return "forms";
          }
          if (id.includes("@tanstack/react-query")) {
            return "data-fetching";
          }
          if (id.includes("zod")) {
            return "validation";
          }

          // 4. UIコンポーネント（遅延可能）
          if (id.includes("@radix-ui") || id.includes("lucide-react")) {
            return "ui-components";
          }

          // 5. その他のvendor
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
