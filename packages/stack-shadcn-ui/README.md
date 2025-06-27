# Stack shadcn/ui

TanStack Router + shadcn/ui を使用したスタック実装。

## 使用技術

- React 19
- TanStack Router (File-based routing)
- TanStack Query
- shadcn/ui コンポーネント
- Tailwind CSS v4
- TypeScript

## セットアップ

```bash
pnpm install
pnpm run generate  # API型定義を生成
pnpm run dev       # 開発サーバー起動
```

## shadcn/ui について

このプロジェクトでは shadcn/ui のコンポーネントをソースコードとして含んでいます。
必要に応じて `src/components/ui/` 内のコンポーネントを直接編集できます。

新しいコンポーネントが必要な場合：
```bash
npx shadcn@latest add dialog
```

## ポート

- 開発サーバー: http://localhost:5160