import { Alert, AlertDescription } from "@/components/shadcn-ui/alert";
import { Button } from "@/components/shadcn-ui/button";

interface LoaderErrorFallbackProps {
  error: Error;
  reset: () => void;
}

/**
 * TanStack Routerのloader関数でエラーが発生した際の表示コンポーネント
 * errorComponentプロパティで使用される
 */
export function LoaderErrorFallback({ error, reset }: LoaderErrorFallbackProps): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert variant="destructive">
        <AlertDescription className="space-y-4">
          <p className="font-semibold">エラーが発生しました</p>
          <p className="text-sm">{error.message}</p>
          <div className="flex gap-2">
            <Button onClick={reset} variant="outline" size="sm">
              再試行
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
            >
              ページを再読み込み
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}