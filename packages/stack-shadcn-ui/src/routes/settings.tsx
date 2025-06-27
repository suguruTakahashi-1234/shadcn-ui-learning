import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Moon, Sun } from "lucide-react";
import { useId } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { Label } from "@/components/shadcn-ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn-ui/radio-group";
import { useTheme } from "@/components/ui/theme-provider";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings(): React.ReactElement {
  const { theme, setTheme } = useTheme();
  const lightId = useId();
  const darkId = useId();
  const systemId = useId();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
        設定
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>外観</CardTitle>
          <CardDescription>
            アプリケーションの外観をカスタマイズします
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base">テーマ</Label>
            <RadioGroup value={theme} onValueChange={setTheme}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id={lightId} />
                <Label
                  htmlFor={lightId}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Sun className="h-4 w-4" />
                  ライト
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id={darkId} />
                <Label
                  htmlFor={darkId}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Moon className="h-4 w-4" />
                  ダーク
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id={systemId} />
                <Label
                  htmlFor={systemId}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Monitor className="h-4 w-4" />
                  システムに従う
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
