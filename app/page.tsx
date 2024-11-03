"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HotModeList } from "@/components/hot-mode-list"
import { Share } from "lucide-react"
import { toast } from "sonner"
import { copyToClipboard } from "@/lib/utils/clipboard"
import { useRouter } from "next/navigation"
import { ShareModeDialog } from "@/components/share-mode-dialog"
import { getModeTitle, type GameMode } from "@/lib/constants/modes"

async function fetchModes() {
  const response = await fetch('/api/modes')
  if (!response.ok) {
    throw new Error('Failed to fetch modes')
  }
  return response.json()
}

export default function Home() {
  const [currentMode, setCurrentMode] = useState<number>(1)
  const router = useRouter()
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  const { data: modesData, isLoading, error } = useQuery({
    queryKey: ['modes'],
    queryFn: fetchModes
  })

  const allModes = [...(modesData?.presetModes || []), ...(modesData?.hotModes || [])]

  const startGame = (modeId: number) => {
    router.push(`/room/${modeId}`)
  }

  const handleShare = async (customModeName?: string) => {
    const shareUrl = `${window.location.origin}?mode=${currentMode}${customModeName ? `&title=${encodeURIComponent(customModeName)}` : ''}`;
    const success = await copyToClipboard(shareUrl);
    
    if (success) {
      toast.success("分享链接已复制到剪贴板", {
        description: "可以直接分享给好友了",
        duration: 3000,
      });
    } else {
      toast.error("复制失败，请重试");
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      加载中...
    </div>
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">
      加载失败，请刷新重试
    </div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-100 via-pink-200 to-red-200 p-4">
      {/* 标题区域 */}
      <div className="w-full max-w-md text-center mb-6 mt-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          小王开局助手 v1.0
        </h1>
        <p className="text-gray-600 mt-2">
          自定义你的王者荣耀游戏体验
        </p>
      </div>

      {/* 当前模式展示 */}
      {currentMode && (
        <Card className="w-full max-w-md mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">当前选择</p>
                  <p className="text-lg font-semibold">{getModeTitle(allModes, currentMode)}</p>
                </div>
                <Button 
                  onClick={() => startGame(currentMode)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  创建房间
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const isPresetMode = modesData?.presetModes.some(mode => mode.id === currentMode)
                    if (isPresetMode) {
                      handleShare()
                    } else {
                      setShareDialogOpen(true)
                    }
                  }}
                  className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <Share className="h-4 w-4" />
                  <span>分享模式</span>
                </Button>
                <button 
                  onClick={() => {/* TODO: 添加修改参数的逻辑 */}} 
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  修改模式参数 →
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 快捷按钮区域 */}
      <Card className="w-full max-w-md mb-6">
        <CardHeader>
          <CardTitle className="text-lg">快速开始</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {modesData?.presetModes.map(mode => (
            <Button 
              key={mode.id}
              className="w-full h-12 text-lg"
              variant="default"
              onClick={() => setCurrentMode(mode.id)}
            >
              {mode.title}
            </Button>
          ))}
          <Link href="/define" className="w-full">
            <Button 
              className="w-full h-12 text-lg"
              variant="outline"
            >
              自定义房间
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* 热门模式区域 */}
      <HotModeList 
        modes={modesData?.hotModes || []}
        onModeClick={(mode) => {
          setCurrentMode(mode.id)
        }}
      />

      <ShareModeDialog 
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onConfirm={handleShare}
      />
    </div>
  )
}