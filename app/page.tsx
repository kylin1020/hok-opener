"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const HotModes = [
  {
    title: "无限火力",
    description: "技能无冷却、无消耗，体验极致快感",
    disabled: false
  },
  {
    title: "镜像对决",
    description: "双方阵容完全相同，考验真实实力",
    disabled: true
  },
  {
    title: "无限乱斗",
    description: "随机英雄、无限火力，爽快乱斗",
    disabled: true
  },
  {
    title: "欢乐夺宝",
    description: "收集宝物获得胜利，休闲娱乐",
    disabled: true
  }
]

export default function Home() {
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

      {/* 快捷按钮区域 */}
      <Card className="w-full max-w-md mb-6">
        <CardHeader>
          <CardTitle className="text-lg">快速开始</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button 
            className="w-full h-12 text-lg"
            variant="default"
          >
            无CD模式
          </Button>
          <Button 
            className="w-full h-12 text-lg"
            variant="default"
          >
            无CD模式(禁无敌)
          </Button>
          <Link href="/custom" className="w-full">
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">热门模式</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {HotModes.map((mode, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                mode.disabled ? 'opacity-50' : 'cursor-pointer hover:scale-[1.02]'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{mode.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {mode.description}
                    </p>
                  </div>
                  {mode.disabled && (
                    <span className="text-xs text-gray-500 absolute top-2 right-2">
                      即将开放
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}