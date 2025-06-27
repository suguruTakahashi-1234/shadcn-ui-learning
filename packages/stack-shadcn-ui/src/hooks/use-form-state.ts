import { useCallback, useState } from "react";

interface UseFormStateOptions<T> {
  initialData?: T;
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseFormStateReturn<T> {
  isSubmitting: boolean;
  error: Error | null;
  handleSubmit: (data: T) => Promise<void>;
  resetError: () => void;
}

/**
 * フォームの状態管理を行うカスタムフック
 * 送信中の状態、エラーハンドリング、成功・失敗時のコールバックを管理
 */
export function useFormState<T>({
  onSubmit,
  onSuccess,
  onError,
}: UseFormStateOptions<T>): UseFormStateReturn<T> {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = useCallback(
    async (data: T): Promise<void> => {
      setIsSubmitting(true);
      setError(null);

      try {
        await onSubmit(data);
        onSuccess?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        onError?.(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, onSuccess, onError],
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isSubmitting,
    error,
    handleSubmit,
    resetError,
  };
}
