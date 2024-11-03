import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorDisplayProps {
  message?: string
  onRetry?: () => void
}

export function ErrorDisplay({ message = "加载失败", onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4 text-center">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <p className="text-lg font-medium text-gray-900">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          重试
        </Button>
      )}
    </div>
  )
} 