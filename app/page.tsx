"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HotModeList, type HotMode } from "@/components/hot-mode-list"

const HotModes: HotMode[] = [
  {
    title: "无限火力",
    description: "技能无冷却、无消耗，体验极致快感",
    disabled: false,
    usageCount: 2341
  },
  {
    title: "镜像对决",
    description: "双方阵容完全相同，考验真实实力",
    disabled: false,
    usageCount: 1205
  },
  {
    title: "无限乱斗",
    description: "随机英雄、无限火力，爽快乱斗",
    disabled: true,
    usageCount: 986
  },
  {
    title: "欢乐夺宝",
    description: "收集宝物获得胜利，休闲娱乐",
    disabled: true,
    usageCount: 756
  }
]

export default function Home() {
  const [currentMode, setCurrentMode] = useState<string | null>("无CD模式")

  const startGame = (modeName: string) => {
    // 这里添加启动游戏的逻辑
    console.log(`启动游戏模式: ${modeName}`)
    // TODO: 调用启动游戏的 API 或执行相关操作
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-100 via-pink-200 to-red-200 p-4">
      {/* 标题区域 */}
      <div className="w-full max-w-md text-center mb-6 mt-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          小王开局 v1.0
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
                  <p className="text-lg font-semibold">{currentMode}</p>
                </div>
                <Button 
                  onClick={() => startGame(currentMode)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  开始游戏
                </Button>
              </div>
              <button 
                onClick={() => {/* TODO: 添加修改参数的逻辑 */}} 
                className="text-sm text-gray-500 hover:text-gray-700 mt-2 self-end"
              >
                修改模式参数 →
              </button>
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
          <Button 
            className="w-full h-12 text-lg"
            variant="default"
            onClick={() => setCurrentMode("无CD模式")}
          >
            无CD模式
          </Button>
          <Button 
            className="w-full h-12 text-lg"
            variant="default"
            onClick={() => setCurrentMode("无CD模式(禁无敌)")}
          >
            无CD模式(禁无敌)
          </Button>
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
        modes={HotModes}
        onModeClick={(mode) => {
          setCurrentMode(mode.title)
        }}
      />

      {/* GitHub 链接 */}
      <div className="mt-8 mb-4 text-center">
        <a 
          href="https://github.com/kylin1020/hok-opener.git"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>kylin1020</span>
        </a>
      </div>
    </div>
  )
}