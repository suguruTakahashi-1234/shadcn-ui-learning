import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { Switch } from "@/components/shadcn-ui/switch";
import { Textarea } from "@/components/shadcn-ui/textarea";
import { type PostFormData, postFormSchema } from "@/lib/validations/post";
import type { components } from "../../generated/api";

interface PostFormProps {
  initialData?: components["schemas"]["Post"];
  onSubmit: (data: PostFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function PostForm({
  initialData,
  onSubmit,
  isSubmitting,
}: PostFormProps): React.ReactElement {
  const titleId = useId();
  const contentId = useId();
  const publishedId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      userId: "clh1234567890abcdef", // 仮のユーザーID
      published: false,
    },
  });

  const publishedValue = watch("published");

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("content", initialData.content);
      setValue("userId", initialData.userId);
      setValue("published", initialData.published);
    }
  }, [initialData, setValue]);

  const onFormSubmit: SubmitHandler<PostFormData> = async (data) => {
    await onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "記事を編集" : "新規記事作成"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor={titleId}>タイトル</Label>
            <Input
              type="text"
              id={titleId}
              {...register("title")}
              placeholder="記事のタイトルを入力"
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={contentId}>本文</Label>
            <Textarea
              id={contentId}
              {...register("content")}
              rows={10}
              placeholder="記事の内容を入力"
              aria-invalid={!!errors.content}
            />
            {errors.content && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor={publishedId} className="text-sm font-medium">
              投稿ステータス
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id={publishedId}
                checked={publishedValue}
                onCheckedChange={(checked) => setValue("published", checked)}
              />
              <Label
                htmlFor={publishedId}
                className="text-sm font-normal cursor-pointer"
              >
                {publishedValue ? "公開" : "下書き"}
              </Label>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "保存中..." : initialData ? "更新" : "作成"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
