import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { FileText, Menu, Settings } from "lucide-react";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Button } from "@/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/shadcn-ui/navigation-menu";
import { Toaster } from "@/components/shadcn-ui/sonner";

export const Route = createRootRoute({
  component: (): React.ReactElement => (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
        {/* ヘッダー */}
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-xl font-bold text-zinc-900 hover:text-zinc-700 transition-colors dark:text-zinc-50 dark:hover:text-zinc-300"
              >
                ブログ管理システム
              </Link>

              {/* デスクトップナビゲーション */}
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link
                      to="/"
                      className={navigationMenuTriggerStyle()}
                      activeProps={{
                        className: "bg-accent",
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      投稿一覧
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      to="/settings"
                      className={navigationMenuTriggerStyle()}
                      activeProps={{
                        className: "bg-accent",
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      設定
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* モバイルメニュー */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">メニュー</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/" className="w-full cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    投稿一覧
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="w-full cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    設定
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
