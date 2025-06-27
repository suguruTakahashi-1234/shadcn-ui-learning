import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { PostForm } from "../../components/PostForm";
import type { components } from "../../generated/api";
import { useCreatePost } from "../../user-posts";

export const Route = createFileRoute("/posts/new")({
  component: PostCreatePage,
});

function PostCreatePage(): React.ReactElement {
  const navigate = useNavigate();
  const createPost = useCreatePost();

  const handleSubmit = async (
    data: components["schemas"]["CreatePost"],
  ): Promise<void> => {
    try {
      await createPost.mutateAsync({ body: data });
      toast.success("投稿を作成しました");
      navigate({ to: "/" });
    } catch (error) {
      console.error("作成エラー:", error);
      toast.error("投稿の作成に失敗しました");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        新規投稿作成
      </h1>
      <PostForm onSubmit={handleSubmit} isSubmitting={createPost.isPending} />
    </div>
  );
}
