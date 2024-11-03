import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type Mode } from "@/types/mode"

interface HotModeListProps {
  modes: Mode[]
  onModeClick: (mode: Mode) => void
  currentMode?: string
}

function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

export function HotModeList({ modes, onModeClick, currentMode }: HotModeListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">热门模式</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {modes.map((mode, index) => (
          <Card 
            key={index}
            className={cn(
              "relative overflow-hidden transition-all",
              "cursor-pointer hover:scale-[1.02] hover:shadow-md",
              currentMode === mode.id ? [
                "border-2 border-purple-500",
                "bg-purple-50/50",
                "shadow-[0_0_15px_rgba(168,85,247,0.15)]",
                "transform scale-[1.02]"
              ] : "border border-gray-200 bg-white"
            )}
            onClick={() => {
              if (onModeClick) {
                onModeClick(mode)
              }
            }}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{mode.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {mode.description}
                  </p>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                    <Badge 
                      variant="secondary" 
                      className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                    >
                      {formatNumber(mode.usageCount || 0)}次
                    </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
} 