import type * as React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const sizeVariants = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function Spinner({
  size = "md",
  className,
  ...props
}: SpinnerProps): React.ReactElement {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent text-zinc-700 dark:text-zinc-200",
        sizeVariants[size],
        className,
      )}
      {...props}
    >
      <span className="sr-only">読み込み中...</span>
    </div>
  );
}
