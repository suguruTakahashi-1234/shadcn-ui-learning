import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import type { components } from "../generated/api";
import { useDeletePost } from "./api/posts-api-hooks";

/**
 * PostCardコンポーネント専用のビジネスロジックフック
 * API通信、ナビゲーション、エラーハンドリングを担当
 */
export function usePostCardActions(post: components["schemas"]["Post"]) {
  const navigate = useNavigate();
  const deletePost = useDeletePost();

  const handleEdit = (): void => {
    navigate({
      to: "/posts/$postId/edit",
      params: { postId: post.id },
    });
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await deletePost.mutateAsync({ params: { path: { id: post.id } } });
      toast.success("投稿を削除しました");
    } catch (error) {
      console.error("削除エラー:", error);
      toast.error("削除に失敗しました");
    }
  };

  return {
    handleEdit,
    handleDelete,
    isDeleting: deletePost.isPending,
  };
}
