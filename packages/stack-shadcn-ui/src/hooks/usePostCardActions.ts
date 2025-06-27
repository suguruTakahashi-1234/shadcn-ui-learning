import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import type { components } from "../generated/api";
import { useDeletePost } from "./api/post-hooks";

/**
 * PostCardコンポーネント専用のアクションフック
 * 削除・編集などのビジネスロジックを集約
 */
export function usePostCardActions(post: components["schemas"]["Post"]) {
  const navigate = useNavigate();
  const deletePost = useDeletePost();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
    showDeleteConfirm,
    setShowDeleteConfirm,
  };
}