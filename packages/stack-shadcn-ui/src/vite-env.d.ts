/// <reference types="vite/client" />

/**
 * Vite環境変数の型定義ファイル
 *
 * ## 環境変数ファイルの読み込み順序
 * 1. .env                # 常に読み込まれる
 * 2. .env.local          # 常に読み込まれる（gitignore推奨）
 * 3. .env.[mode]         # 特定のモードで読み込まれる
 * 4. .env.[mode].local   # 特定のモードで読み込まれる（gitignore推奨）
 *
 * 優先順位: 後に読み込まれたファイルが前のファイルを上書き
 *
 * ## Viteが提供する組み込み環境変数
 *
 * ### import.meta.env.MODE
 * - 現在のアプリケーションモード
 * - デフォルト: "development" (dev) | "production" (build)
 * - カスタム: --mode オプションで変更可能
 *
 * ### import.meta.env.BASE_URL
 * - アプリのベースURL
 * - vite.config.ts の base 設定から取得
 *
 * ### import.meta.env.PROD
 * - 本番環境なら true
 *
 * ### import.meta.env.DEV
 * - 開発環境なら true
 *
 * ### import.meta.env.SSR
 * - サーバーサイドレンダリング中なら true
 *
 * ## カスタム環境変数のルール
 * - VITE_ プレフィックスが必須（クライアントに公開される）
 * - すべて文字列に変換される
 * - 機密情報は VITE_ プレフィックスを使わないこと！
 */
