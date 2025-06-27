import { Link } from "@tanstack/react-router";
import { FileText, Menu, Settings } from "lucide-react";
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

export function Header(): React.ReactElement {
  return (
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
  );
}
