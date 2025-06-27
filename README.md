
## 🧪 このリポジトリについて


### リポジトリの構成

TODO

各パッケージは同一のブログアプリケーションUIを実装しており、以下の機能を持っています：
- 📝 投稿一覧の表示
- 📖 投稿詳細の閲覧
- ✏️ 投稿の編集
- ➕ 新規投稿の作成

### 動作確認方法

```bash
# 依存関係のインストール
pnpm install

# コード生成（型定義など）
pnpm run generate

# モックAPIサーバーの起動
pnpm run mock

# 開発サーバーの起動（全パッケージ同時）
pnpm run dev
```

起動後、以下のURLで各実装にアクセスできます：
TODO

### 技術スタック

- **フレームワーク**: React 19
- **ビルドツール**: Vite
- **言語**: TypeScript（厳格な型チェック設定）
- **スタイリング**: Tailwind CSS v4
- **データフェッチ**: TanStack Query + openapi-typescript
- **モックサーバー**: Prism
