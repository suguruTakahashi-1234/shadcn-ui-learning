import { Link, useNavigate } from "@tanstack/react-router";
import {
  CalendarIcon,
  EditIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import type { components } from "../generated/api";
import { useDeletePost } from "../user-posts";

interface PostCardProps {
  post: components["schemas"]["Post"];
}

export function PostCard({ post }: PostCardProps): React.ReactElement {
  const navigate = useNavigate();
  const deletePost = useDeletePost();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async (): Promise<void> => {
    try {
      await deletePost.mutateAsync({ params: { path: { id: post.id } } });
      toast.success("投稿を削除しました");
    } catch (error) {
      console.error("削除エラー:", error);
      toast.error("削除に失敗しました");
    }
  };

  const handleCardClick = (e: React.MouseEvent): void => {
    // ドロップダウンメニューのクリックを無視
    if ((e.target as HTMLElement).closest('[data-slot="dropdown-menu"]')) {
      e.preventDefault();
      return;
    }
  };

  return (
    <>
      <div className="relative group">
        <Link
          to="/posts/$postId"
          params={{ postId: post.id }}
          onClick={handleCardClick}
        >
          <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="line-clamp-2 pr-8">
                  {post.title}
                </CardTitle>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.preventDefault()}
                    >
                      <Button variant="ghost" size="sm">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          navigate({
                            to: "/posts/$postId/edit",
                            params: { postId: post.id },
                          });
                        }}
                      >
                        <EditIcon className="mr-2 h-4 w-4" />
                        編集
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          setShowDeleteConfirm(true);
                        }}
                        className="text-red-600 focus:text-red-600"
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        削除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardDescription className="flex items-center justify-between">
                <Badge variant={post.published ? "default" : "secondary"}>
                  {post.published ? "公開" : "下書き"}
                </Badge>
                <span className="flex items-center gap-1 text-xs">
                  <CalendarIcon className="h-3 w-3" />
                  {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                {post.content}
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* 削除確認ダイアログ */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>投稿を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              「{post.title}
              」を削除してもよろしいですか？この操作は取り消せません。
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
