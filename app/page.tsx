"use client"

import { useState, useEffect } from "react"
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
import { getModeTitle } from "@/lib/constants/modes"
import { HomeSkeleton } from "@/components/home-skeleton"
import { ErrorDisplay } from "@/components/error-display"
import Joyride, { Step } from 'react-joyride'
import { type ConfigType } from '@/components/config-form';
import Image from "next/image"
import { LoadingDialog } from "@/components/loading-dialog"

interface Mode {
  id: number
  title: string
  // ... 其他属性
}

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
  const [runTour, setRunTour] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore')
    if (hasVisited) {
      setRunTour(false)
    }
  }, [])

  const steps: Step[] = [
    {
      target: '.title-area',
      content: '欢迎使用小王开局助手! 这是一个帮助你快速创建王者荣耀自定义房间的工具',
      placement: 'bottom',
    },
    {
      target: '.quick-start-area', 
      content: '你可以在这里快速选择预设的游戏模式',
      placement: 'bottom',
    },
    {
      target: '.custom-room-btn',
      content: '或者点击这里创建完全自定义的房间',
      placement: 'bottom',
    },
    {
      target: '.current-mode-area',
      content: '选择模式后,在这里可以看到当前选择的模式并开始游戏',
      placement: 'bottom',
    },
    {
      target: '.hot-modes-area',
      content: '这里展示了最近热门的游戏模式',
      placement: 'bottom',
    }
  ]

  const handleJoyrideCallback = (data: any) => {
    const { status } = data
    if (status === 'finished') {
      localStorage.setItem('hasVisitedBefore', 'true')
    }
  }

  const { data: modesData, isLoading, error } = useQuery({
    queryKey: ['modes'],
    queryFn: fetchModes
  })

  const allModes = [...(modesData?.presetModes || []), ...(modesData?.hotModes || [])]

  const startGame = async (modeId: number) => {
    setIsCreating(true)
    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modeId,
        })
      })
      
      if (!response.ok) {
        throw new Error('创建房间失败')
      }
      
      const { roomId } = await response.json()
      router.push(`/id/${roomId}`)
    } catch (error) {
      console.error(error)
      toast.error("创建房间失败，请重试")
    } finally {
      setIsCreating(false)
    }
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-200 to-red-200 p-4">
        <HomeSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-200 to-red-200 p-4">
        <ErrorDisplay 
          message="加载失败，请稍后重试" 
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-100 via-pink-200 to-red-200 p-4">
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#9333ea',
            textColor: '#4b5563',
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          buttonNext: {
            backgroundColor: '#9333ea',
          },
          buttonBack: {
            color: '#9333ea',
          },
        }}
        locale={{
          back: '上一步',
          close: '关闭',
          last: '完成',
          next: '下一步',
          skip: '跳过',
        }}
      />

      <div className="w-full max-w-md text-center mb-6 mt-8 title-area">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 flex items-center gap-2">
            小王
            <Image 
              src="/imgs/image.png"
              alt="小王开局助手图标"
              width={36}
              height={36}
              className="rounded-full"
            />
            开局助手 v1.0
          </h1>
        </div>
        <p className="text-gray-600 mt-2">
          自定义你的王者荣耀游戏体验
        </p>
      </div>

      {currentMode && (
        <Card className="w-full mb-6 current-mode-area">
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
                  disabled={isCreating}
                >
                  创建房间
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (typeof currentMode === 'undefined') {
                      setShareDialogOpen(true)
                    } else {
                      const isPresetMode = currentMode !== 1;
                      if (isPresetMode) {
                        handleShare()
                      } else {
                        setShareDialogOpen(true)
                      }
                    }
                  }}
                  className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <Share className="h-4 w-4" />
                  <span>分享模式</span>
                </Button>
                <button 
                  onClick={() => {/* TODO: 添加修改参数逻辑 */}} 
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  修改模式参数 →
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="w-full mb-6 quick-start-area">
        <CardHeader>
          <CardTitle className="text-lg">快速开始</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {modesData?.presetModes.map((mode: Mode) => (
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
              className="w-full h-12 text-lg custom-room-btn"
              variant="outline"
            >
              自定义房间
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="hot-modes-area w-full">
        <HotModeList 
          modes={modesData?.hotModes || []}
          onModeClick={(mode) => {
            setCurrentMode(mode.id)
          }}
        />
      </div>

      <LoadingDialog open={isCreating} />

      <ShareModeDialog 
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onConfirm={handleShare}
      />
    </div>
  )
}