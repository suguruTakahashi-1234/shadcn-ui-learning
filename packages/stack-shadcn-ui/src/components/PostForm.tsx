import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { components } from "../generated/api";

interface PostFormProps {
  initialData?: components["schemas"]["Post"];
  onSubmit: (data: components["schemas"]["CreatePost"]) => Promise<void>;
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
  const [formData, setFormData] = useState<components["schemas"]["CreatePost"]>(
    {
      title: "",
      content: "",
      userId: "clh1234567890abcdef", // 仮のユーザーID
      published: false,
    },
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        userId: initialData.userId,
        published: initialData.published,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "記事を編集" : "新規記事作成"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor={titleId}>タイトル</Label>
            <Input
              type="text"
              id={titleId}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              placeholder="記事のタイトルを入力"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={contentId}>本文</Label>
            <Textarea
              id={contentId}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              rows={10}
              placeholder="記事の内容を入力"
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor={publishedId} className="text-sm font-medium">
              投稿ステータス
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id={publishedId}
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, published: checked })
                }
              />
              <Label
                htmlFor={publishedId}
                className="text-sm font-normal cursor-pointer"
              >
                {formData.published ? "公開" : "下書き"}
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
