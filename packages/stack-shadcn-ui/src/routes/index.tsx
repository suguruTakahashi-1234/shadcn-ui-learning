import { createFileRoute, Link } from "@tanstack/react-router";
import { FileTextIcon, PlusIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PostCard } from "../components/PostCard";
import { PostCardSkeleton } from "../components/PostCardSkeleton";
import { usePosts } from "../user-posts";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage(): React.ReactElement {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            投稿一覧
          </h1>
          <Button asChild variant="outline">
            <Link to="/posts/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              新規投稿
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: スケルトンは静的要素のため問題なし
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          エラーが発生しました: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <FileTextIcon className="h-16 w-16 text-zinc-400 mb-4" />
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          投稿がありません
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          最初の記事を作成してみましょう
        </p>
        <Button asChild>
          <Link to="/posts/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            最初の投稿を作成
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          投稿一覧
        </h1>
        <Button asChild variant="outline">
          <Link to="/posts/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            新規投稿
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
