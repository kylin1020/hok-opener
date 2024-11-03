import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type GameMode } from "@/lib/constants/modes"

export type HotMode = GameMode

interface HotModeListProps {
  modes: HotMode[]
  onModeClick?: (mode: HotMode) => void
}

function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

export function HotModeList({ modes, onModeClick }: HotModeListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">热门模式</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {modes.map((mode, index) => (
          <Card 
            key={index}
            className={`relative overflow-hidden transition-all hover:shadow-lg ${
              mode.disabled ? 'opacity-50' : 'cursor-pointer hover:scale-[1.02]'
            }`}
            onClick={() => {
              if (!mode.disabled && onModeClick) {
                onModeClick(mode)
              }
            }}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{mode.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {mode.description}
                  </p>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  {mode.disabled ? (
                    <span className="text-xs text-gray-500">
                      即将开放
                    </span>
                  ) : (
                    <Badge 
                      variant="secondary" 
                      className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                    >
                      {formatNumber(mode.usageCount || 0)}次
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
} 