import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  CalendarIcon,
  EditIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useDeletePost, usePost } from "../../../user-posts";

export const Route = createFileRoute("/posts/$postId/")({
  component: PostDetailPage,
});

function PostDetailPage(): React.ReactElement {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = usePost(postId);
  const deletePost = useDeletePost();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async (): Promise<void> => {
    try {
      await deletePost.mutateAsync({ params: { path: { id: postId } } });
      toast.success("投稿を削除しました");
      navigate({ to: "/" });
    } catch (error) {
      console.error("削除エラー:", error);
      toast.error("削除に失敗しました");
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-9 w-96" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Alert variant="destructive">
        <AlertDescription>投稿が見つかりません</AlertDescription>
      </Alert>
    );
  }

  const post = data.data;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                一覧に戻る
              </Link>
              <h1 className="text-3xl font-bold tracking-tight">
                {post.title}
              </h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/posts/$postId/edit" params={{ postId }}>
                    <EditIcon className="mr-2 h-4 w-4" />
                    編集
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-red-600 focus:text-red-600"
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  削除
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Badge variant={post.published ? "default" : "secondary"}>
              {post.published ? "公開" : "下書き"}
            </Badge>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              作成日: {new Date(post.createdAt).toLocaleDateString("ja-JP")}
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              更新日: {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">
                タグ
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((postTag) => (
                  <Badge key={postTag.tagId} variant="secondary">
                    {postTag.tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 削除確認ダイアログ */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangleIcon className="h-5 w-5 text-red-600" />
              投稿を削除しますか？
            </AlertDialogTitle>
            <AlertDialogDescription>
              この投稿を削除してもよろしいですか？この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePost.isPending}>
              キャンセル
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deletePost.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletePost.isPending ? (
                <>
                  <Spinner className="mr-2" size="sm" />
                  削除中...
                </>
              ) : (
                "削除"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
