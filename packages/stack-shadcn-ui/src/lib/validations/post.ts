import { z } from "zod";

export const postFormSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください"),
  content: z
    .string()
    .min(1, "本文は必須です")
    .max(5000, "本文は5000文字以内で入力してください"),
  published: z.boolean(),
  userId: z.string().min(1, "ユーザーIDは必須です"),
});

export type PostFormData = z.infer<typeof postFormSchema>;
