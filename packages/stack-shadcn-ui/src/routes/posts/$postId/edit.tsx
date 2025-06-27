import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loading } from "@/components/common/loading";
import { Alert, AlertDescription } from "@/components/shadcn-ui/alert";
import type { PostFormData } from "@/lib/validations/post";
import { PostForm } from "../../../components/posts/PostForm";
import type { components } from "../../../generated/api";
import { usePost, useUpdatePost } from "../../../hooks/api/posts-api-hooks";

export const Route = createFileRoute("/posts/$postId/edit")({
  component: PostEditPage,
});

function PostEditPage(): React.ReactElement {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = usePost(postId);
  const updatePost = useUpdatePost();

  const handleSubmit = async (formData: PostFormData): Promise<void> => {
    try {
      const updateData: components["schemas"]["UpdatePost"] = {
        title: formData.title,
        content: formData.content,
        published: formData.published,
      };
      await updatePost.mutateAsync({
        params: { path: { id: postId } },
        body: updateData,
      });
      toast.success("投稿を更新しました");
      navigate({ to: "/posts/$postId", params: { postId } });
    } catch (error) {
      console.error("更新エラー:", error);
      toast.error("投稿の更新に失敗しました");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          投稿編集
        </h1>
        <Loading
          size="lg"
          text="投稿を読み込んでいます..."
          className="min-h-[400px]"
        />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Alert variant="destructive">
        <AlertDescription>投稿が見つかりません</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        投稿編集
      </h1>
      <PostForm
        initialData={data.data}
        onSubmit={handleSubmit}
        isSubmitting={updatePost.isPending}
      />
    </div>
  );
}
