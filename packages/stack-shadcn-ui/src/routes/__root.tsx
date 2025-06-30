import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { RuntimeErrorBoundary } from "@/components/common/runtime-error-boundary";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/shadcn-ui/sonner";

export const Route = createRootRoute({
  component: (): React.ReactElement => (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
        <Header />

        {/* メインコンテンツ */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RuntimeErrorBoundary>
            <Outlet />
          </RuntimeErrorBoundary>
        </main>

        <Footer />
      </div>
      <Toaster />
      {/* 本番環境では表示しない */}
      {!import.meta.env.PROD && <TanStackRouterDevtools />}
    </ThemeProvider>
  ),
});
