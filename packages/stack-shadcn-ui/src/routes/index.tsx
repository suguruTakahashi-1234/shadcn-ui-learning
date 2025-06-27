import { createFileRoute, Link } from "@tanstack/react-router";
import { FileTextIcon, PlusIcon } from "lucide-react";
import { LoaderErrorFallback } from "@/components/common/loader-error-fallback";
import { Loading } from "@/components/common/loading";
import { Alert, AlertDescription } from "@/components/shadcn-ui/alert";
import { Button } from "@/components/shadcn-ui/button";
import { fetchClient } from "@/lib/api/clients";
import { PostCard } from "../components/posts/PostCard";
import { usePosts } from "../hooks/api/posts-api-hooks";

export const Route = createFileRoute("/")({
  loader: async () => {
    const { data, error } = await fetchClient.GET("/api/posts");

    if (error) {
      console.error("投稿の取得に失敗しました:", error);
      throw new Error(`投稿の取得に失敗しました: ${JSON.stringify(error)}`);
    }

    console.log("SSRでの投稿データ:", data);

    return {
      posts: data?.data || [],
    };
  },
  errorComponent: LoaderErrorFallback,
  component: HomePage,
});

function HomePage(): React.ReactElement {
  const { posts: initialData } = Route.useLoaderData();

  // initialDataを使ってusePostsを呼び出す
  const {
    data: posts = initialData,
    error,
    isLoading,
  } = usePosts({ initialData });

  // SSR時はプリフェッチされているのでisLoadingはfalse
  // クライアントサイドでの再フェッチ時のみtrueになる
  if (isLoading && !posts) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading size="lg" text="投稿を読み込んでいます..." />
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

  if (posts.length === 0) {
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
