/**
 * Posts関連のReact Query Hooks
 *
 * openapi-react-queryの$apiを利用したシンプルな実装
 * 標準的なReact Queryの使い方に従う
 */
import { useQueryClient } from "@tanstack/react-query";
import type { components } from "@/generated/api";
import { $api } from "@/lib/api/clients";

/**
 * 投稿一覧を取得するフック
 */
export const usePosts = (options?: {
  initialData?: components["schemas"]["Post"][];
}) => {
  if (options?.initialData) {
    console.log("SSR によって初期データが提供されました:", options.initialData);
  } else {
    console.log("SSR による初期データは提供されていません");
  }

  return $api.useQuery(
    "get",
    "/api/posts",
    {},
    {
      select: (data) => data.data, // レスポンスの階層を簡略化
      // initialDataは、selectが適用された後の型に合わせる
      ...(options?.initialData && {
        initialData: {
          data: options.initialData,
          status: "success" as const,
        },
      }),
    },
  );
};

/**
 * 投稿を個別に取得するフック
 */
export const usePost = (id: string) => {
  return $api.useQuery("get", "/api/posts/{id}", {
    params: { path: { id } },
  });
};

/**
 * 投稿を作成するフック
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return $api.useMutation("post", "/api/posts", {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get", "/api/posts"],
      });
    },
  });
};

/**
 * 投稿を更新するフック
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return $api.useMutation("put", "/api/posts/{id}", {
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["get", "/api/posts"],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "get",
          "/api/posts/{id}",
          { params: { path: { id: variables.params.path.id } } },
        ],
      });
    },
  });
};

/**
 * 投稿を削除するフック
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return $api.useMutation("delete", "/api/posts/{id}", {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get", "/api/posts"],
      });
    },
  });
};
