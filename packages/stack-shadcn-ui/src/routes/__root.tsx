import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Settings } from "lucide-react";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Button } from "@/components/shadcn-ui/button";
import { Toaster } from "@/components/shadcn-ui/sonner";

export const Route = createRootRoute({
  component: (): React.ReactElement => (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
        {/* ヘッダー */}
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="text-xl font-bold text-zinc-900 hover:text-zinc-700 transition-colors dark:text-zinc-50 dark:hover:text-zinc-300"
            >
              ブログ管理システム (shadcn/ui)
            </Link>
            <nav>
              <Button asChild variant="ghost" size="icon">
                <Link to="/settings">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">設定</span>
                </Link>
              </Button>
            </nav>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>

        {/* フッター */}
        <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              © 2024 ブログ管理システム. Built with shadcn/ui
            </p>
          </div>
        </footer>
      </div>
      <Toaster />
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
});
