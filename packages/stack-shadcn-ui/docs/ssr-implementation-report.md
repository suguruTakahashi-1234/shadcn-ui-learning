# SSR実装レポート

## 概要

このドキュメントは、TanStack RouterとViteを使用したSSR（サーバーサイドレンダリング）実装の試行錯誤をまとめたものです。

## 実装の経緯

### 初期の要件
- `/routes/index.tsx`のloaderがサーバー側で実行されることを確認
- TanStack RouterのSSR機能を使用してデータのプリフェッチを実現
- 初回ロード時のパフォーマンス向上

### 実装アプローチ

1. **公式ドキュメントに基づいた実装**
   - @tanstack/react-router-serverパッケージを使用
   - createRequestHandler, defaultRenderToStringを使用した実装を試行

2. **シンプルな実装への切り替え**
   - 公式のSSR APIが複雑で型エラーが多発したため、基本的なSSR実装に変更
   - renderToStringを直接使用するアプローチに変更

## 試した内容と結果

### 1. パッケージのインストール
```bash
bun add @tanstack/react-router-server express sirv compression
```
✅ 成功：必要なパッケージはインストール完了

### 2. ファイル構成の変更

#### 作成したファイル：
- `src/router.tsx` - ルーター作成の共通化
- `src/entry-server.tsx` - サーバー側エントリーポイント
- `src/entry-client.tsx` - クライアント側エントリーポイント
- `server.js` - Expressサーバー

#### 修正したファイル：
- `vite.config.ts` - SSRビルド設定の追加
- `package.json` - SSRスクリプトの追加
- `index.html` - エントリーポイントの変更

### 3. 遭遇した問題と対処

#### 問題1: TanStack Router SSR APIの型エラー
```typescript
// 期待されたインポート（ドキュメント通り）
import { createRequestHandler, defaultRenderToString } from "@tanstack/react-router/ssr/server";
import { RouterClient } from "@tanstack/react-router/ssr/client";

// 実際のパッケージ構成
import { createRequestHandler } from "@tanstack/react-router-server/server";
import { StartClient } from "@tanstack/react-router-server/client";
```
- **原因**: ドキュメントとパッケージのAPIが異なる
- **対処**: インポートパスを修正したが、型定義が一致しない

#### 問題2: ルーターコンテキストの型エラー
```typescript
// エラー: Property 'context' does not exist on type 'RouterCore<...>'
router.context.queryClient
```
- **原因**: createRouterの返り値の型がcontextプロパティを持たない
- **対処**: QueryClientを別途管理するように変更

#### 問題3: router.loadのパラメータエラー
```typescript
// エラー: Object literal may only specify known properties, and 'href' does not exist
await router.load({ href: url });
```
- **原因**: loadメソッドがURLパラメータを受け付けない
- **対処**: router.history.push(url)を使用してURLを設定

### 4. 最終的な実装状態

#### entry-server.tsx
```typescript
export async function render({ url }: { url: string }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: Number.POSITIVE_INFINITY,
      },
    },
  });

  const router = createRouter(queryClient);
  router.history.push(url);
  await router.load();

  const app = (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

  const html = renderToString(app);
  return { html };
}
```

#### server.js
- Viteの開発サーバーと統合
- SSRハンドラーでentry-server.tsxのrender関数を呼び出し
- HTMLテンプレートにレンダリング結果を埋め込み

## 現在の問題点

### 1. SSRが動作していない
- **症状**: 
  - サーバーは起動する（ポート5173でリッスン）
  - HTMLは返されるが、`<div id="root"></div>`が空のまま
  - SSR関連のログが一切出力されない

- **確認結果**:
  ```html
  <!-- 期待される結果 -->
  <div id="root"><div class="min-h-screen...">...</div></div>
  
  <!-- 実際の結果 -->
  <div id="root"></div>
  ```

### 2. ログが出力されない
- server.jsの`console.log("[Server] SSR処理開始")`が出力されない
- entry-server.tsxの`console.log("[SSR] リクエスト処理開始")`が出力されない
- SSRハンドラーが実行されていない可能性

### 3. 考えられる原因
1. **Viteミドルウェアの問題**
   - ViteがすべてのリクエストをハンドリングしてSSRハンドラーに到達していない
   
2. **モジュール解決の問題**
   - `vite.ssrLoadModule("/src/entry-server.tsx")`が正しく動作していない
   
3. **ルーティングの問題**
   - Express の`app.use("*", ...)`が適切に動作していない

## 残されている課題

### 1. 開発環境でのSSR動作確認
- Viteの開発サーバーでSSRを正しく動作させる
- ログ出力を有効にして問題を特定する

### 2. 本番ビルドでのテスト
```bash
bun run build
bun run preview
```
- 本番ビルドではSSRが動作する可能性がある
- 開発環境と本番環境の動作の違いを確認

### 3. loaderのサーバー側実行確認
- `/routes/index.tsx`のloaderがサーバー側で実行されているか確認
- fetchClient.GET("/api/posts")がサーバー側で呼ばれているか確認

### 4. ハイドレーションの動作確認
- クライアント側でSSRされたHTMLを正しくハイドレートできているか
- initialDataが正しく渡されているか

## 次のステップ

### 1. デバッグの強化
- server.jsの各ステップでより詳細なログを追加
- エラーハンドリングを改善してスタックトレースを表示

### 2. シンプルな動作確認
- 最小限のSSRサンプルを作成して動作を確認
- TanStack Routerを使わない単純なReact SSRから始める

### 3. 代替アプローチの検討
- Vite SSRプラグインの使用
- Next.jsやRemixなどのフレームワークへの移行
- TanStack Startの採用（TanStack公式のフルスタックフレームワーク）

### 4. 公式サンプルの参照
- TanStack RouterのGitHubリポジトリでSSRサンプルを確認
- 動作するサンプルとの差分を分析

## 追加の検証内容（2回目の試行）

### 前提条件の確認

#### モックサーバーの必要性
- **問題**: APIリクエストが失敗するとSSRも動作しない
- **対処**: `bun run mock`でPrismモックサーバーを起動
- **結果**: ✅ モックサーバーは正常に起動（http://localhost:4010）

```bash
[2:00:41] › [CLI] ▶  start     Prism is listening on http://0.0.0.0:4010
```

### サーバー起動の問題

#### 1. ビルドコマンドのタイムアウト
```bash
# 以下のコマンドがすべてタイムアウト
bun run build  # 2分以上経過してもビルドが完了しない
bun run build:client  # 同様にタイムアウト
```
- **問題認識**: ビルドが2分以上かかるのは異常
- **原因**: 検証方法自体が間違っている可能性

#### 2. SSRサーバー起動時の問題
```bash
node server.js
# 出力:
# 🚀 サーバー起動処理開始
# 📝 開発環境モードで起動中...
# 📦 Viteサーバーを作成中...
# (ここで停止)
```

- **問題**: ViteサーバーのcreateServerで処理が停止
- **該当コード**:
```javascript
vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
});
```

#### 3. デバッグで判明した事実
- サーバーファイル（server.js）は正しい場所に存在
- プロセスは起動するが、Viteの初期化で停止
- HTTPリクエストに応答しない（curlがタイムアウト）

### 根本的な問題の分析

#### 1. ViteのmiddlewareModeの問題
- `middlewareMode: true`を使用したViteサーバーの作成が完了しない
- 通常の開発サーバー（`bun run dev`）も起動に問題がある可能性

#### 2. 検証アプローチの問題
- ビルドやサーバー起動のタイムアウトは通常ありえない
- より基本的な部分から検証する必要がある

#### 3. 依存関係の問題の可能性
- Viteのバージョン（v7.0.0）と他のパッケージの互換性
- ESモジュールの解決に関する問題

## 結論（更新版）

現時点での状況：
1. SSRの設定ファイルは作成済み
2. モックサーバーは正常に動作
3. **Viteサーバーの初期化で処理が停止する問題が発生**
4. 根本的な環境設定やパッケージの互換性の問題の可能性

### 推奨される次のステップ

1. **基本的な動作確認**
   - 通常の`bun run dev`が正常に動作するか確認
   - package.jsonのスクリプトが正しいか確認

2. **Viteの設定見直し**
   - middlewareModeを使わない別のアプローチを検討
   - Viteのバージョンを確認し、必要に応じてダウングレード

3. **より単純なSSR実装から始める**
   - Viteを使わない純粋なExpressサーバーでのSSR
   - 段階的にViteの機能を追加

4. **環境のクリーンアップ**
   - node_modulesの再インストール
   - キャッシュのクリア（.tanstack, dist等）