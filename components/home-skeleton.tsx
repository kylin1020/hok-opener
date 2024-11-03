import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function HomeSkeleton() {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* 当前模式骨架屏 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
            <div className="flex justify-between items-center mt-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 快速开始骨架屏 */}
      <Card>
        <CardHeader>
          <CardTitle><Skeleton className="h-6 w-24" /></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    </div>
  )
} 