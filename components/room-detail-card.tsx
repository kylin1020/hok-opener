"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Share } from "lucide-react"
import { toast, Toaster } from "sonner"
import { Room } from "@/types/room"
import { Mode } from "@/types/mode"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { copyToClipboard } from "@/lib/utils/clipboard"
import { LoadingDialog } from "@/components/loading-dialog"
import Image from "next/image"
import { Hero } from "@/types/hero"
import { useRouter } from "next/navigation"
import { generateGameConfigFromMode } from '@/lib/mode'
import QRCode from 'react-qr-code';

const levelValueMap: Record<string, string> = {
  '1': '1级',
  '2': '4级', 
  '3': '5级',
  '4': '8级',
  '5': '10级',
  '6': '12级',
  '7': '15级'
}

const attackValueMap: Record<string, string> = {
  '1': '无加成',
  '2': '10%加成',
  '3': '25%加成', 
  '4': '50%加成',
  '5': '75%加成',
  '6': '100%加成'
}

const coolDownValueMap: Record<string, string> = {
  '1': '无加成',
  '2': '25%加成',
  '3': '50%加成',
  '4': '80%加成', 
  '5': '99%加成'
}

const speedValueMap: Record<string, string> = {
  '1': '无加成',
  '2': '10%加成',
  '3': '20%加成',
  '4': '30%加成'
}

const refreshSpeedValueMap: Record<string, string> = {
  '1': '无加成',
  '2': '5%加成',
  '3': '10%加成',
  '4': '15%加成'
}

const spawnTypeValueMap: Record<string, string> = {
  '1': '普通兵线',
  '2': '超级兵',
  '3': '主宰先锋'
}

const GameConfigTabs = [
  {
    name: '英雄',
    value: 'hero'
  },
  {
    name: '兵线/野怪',
    value: 'line'
  },
  {
    name: '防御塔/水晶',
    value: 'tower'
  },
  {
    name: '禁用英雄',
    value: 'ban'
  }
];

const fetchRoom = async (id: string): Promise<Room> => {
  const response = await fetch(`/api/rooms/${id}`)
  if (!response.ok) {
    throw new Error('获取房间信息失败')
  }
  const data = await response.json()
  if (data.code !== 0) {
    throw new Error(data.message)
  }
  return data.data
}

interface RoomDetailCardProps {
    roomId: string
    heroes: Hero[]
}

export default function RoomDetailCard({ roomId, heroes }: RoomDetailCardProps) {
  const [loading, setLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [gameConfigTab, setGameConfigTab] = useState('hero')
  const router = useRouter()

  const { data: roomData , isLoading, error } = useQuery({
    queryKey: ['room', roomId],
    queryFn: () => fetchRoom(roomId)
  })

  const generateGameURI = (team: "blue" | "red" | undefined, forceH5: boolean = false) => {
    if (!roomData?.mode) {
      toast.error("房间模式不存在")
      return ""
    }

    const gameConfig = generateGameConfigFromMode(roomData.mode, heroes, roomData.roomNo, false, team)
    let prefix;
    if (forceH5) {
      prefix = "https://h5.nes.smoba.qq.com/pvpesport.web.user/#/launch-game-mp-qq"
    } else {
      prefix = navigator.userAgent.includes("QQ/") ? "https://h5.nes.smoba.qq.com/pvpesport.web.user/#/launch-game-mp-qq" : "tencentmsdk1104466820://"
    }
    const gameURI = `${prefix}?gamedata=SmobaLaunch_${btoa(JSON.stringify(gameConfig))}`
    return gameURI
  }

  const joinTeam = async (team: "blue" | "red") => {
    if (!roomData?.mode) {
      toast.error("房间模式不存在")
      return
    }

    setLoading(true)
    try {
      toast.success(`成功加入${team === "blue" ? "蓝队" : "红队"}, 等待跳转至游戏...`)
      const gameURI = generateGameURI(team)
      if (window.top) {
        window.top.location.href = gameURI
      } else {
        window.location.href = gameURI
      }
    } catch (error) {
      toast.error("加入失败，请重试:" + error) 
    } finally {
      setLoading(false)
    }
  }

  const startGame = async (mode: Mode) => {
    setIsCreating(true)
    try {
      const response = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mode)
      })
      
      if (!response.ok) {
        throw new Error('创建房间失败')
      }
      
      const { data, code, message } = await response.json()
      if (code !== 0) {
        toast.error(message)
      } else {
        router.push(`/room/${data.roomId}`)
      }
    } catch (error) {
      console.error(error)
      toast.error("创建房间失败，请重试")
    } finally {
      setIsCreating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-theme('spacing.16'))] flex flex-col items-center bg-gradient-to-br from-purple-100 via-pink-200 to-red-200 p-4">
        {/* 房间信息卡片骨架屏 */}
        <div className="w-full max-w-md mb-6 mt-8 relative">
          <div className="bg-white rounded-lg p-6 shadow-md animate-pulse">
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* 加入队伍按钮骨架屏 */}
        <div className="w-full max-w-md grid grid-cols-2 gap-4">
          <div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* 加载提示文字 */}
        <div className="mt-8 text-gray-500 text-center">
          <p>正在加载房间信息...</p>
          <p className="text-sm mt-1">请稍候</p>
        </div>
      </div>
    )
  }

  if (error || !roomData) {
    return (
      <div className="h-[calc(100vh-theme('spacing.16'))] flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-200 to-red-200 p-4">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-6xl mb-4">
            <span className="material-symbols-outlined">error</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">获取房间信息失败</h2>
          <p className="text-gray-600">
            无法加载房间 {roomId} 的信息
          </p>
          <div className="mt-6">
            <Button
              onClick={() => window.location.reload()}
              className="mr-4"
            >
              重试
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              返回首页
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleCopyRoomLink = async () => {
    const shareUrl = `${window.location.origin}/room/${roomId}`;
    // const shareUrl = generateGameURI(undefined, true)
    const success = await copyToClipboard(`[王者荣耀-小王助手] ${roomData.mode.name}\n\n${shareUrl}`);
    
    if (success) {
      toast.success("房间链接已复制到剪贴板", {
        description: "可以直接分享给好友了",
        duration: 3000,
      });
    } else {
      toast.error("复制失败，请重试");
    }
  }

  return (
    <div className="h-[calc(100vh-theme('spacing.16'))] flex flex-col items-center bg-gradient-to-br from-purple-100 via-pink-200 to-red-200 p-4">
      <Toaster richColors />
      
      {/* 添加标题区域 */}
      <div className="w-full max-w-md text-center mb-6 mt-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            <Image 
              src="/imgs/image.png"
              alt="小王开局助手图标"
              width={30}
              height={30}
              className="inline-block mr-2 rounded-full"
            />
            {
              roomData.mode ? `游戏房间 (${roomData.mode.name})` : '游戏房间'
            }
          </span>
        </h1>
        {/* 房间ID显示 */}
        <p className="text-sm text-gray-500 mt-2">
          房间ID: {roomId}
        </p>
      </div>

      {/* 现有的房间信息卡片 */}
      <Card className="w-full max-w-md mb-6 relative">
        <Button 
          variant="ghost"
          size="sm"
          onClick={handleCopyRoomLink}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2 h-auto"
        >
          <Share className="h-4 w-4" />
          <span>分享</span>
        </Button>

        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{roomData?.mode.name}</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <button 
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center mt-1"
                    >
                      查看模式详情
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>模式详情</DialogTitle>
                    </DialogHeader>
                    <Tabs value={gameConfigTab} onValueChange={setGameConfigTab}>
                      <TabsList>
                        {GameConfigTabs.map((tab) => (
                          <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <TabsContent value="hero">
                        <Card>
                          <CardHeader>
                            <CardTitle>英雄属性</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2">蓝方英雄</h3>
                                {roomData.mode.settings.customDefineSettingData.blue.heroes.map((hero, index) => (
                                  <div key={index} className="space-y-1">
                                    <p>英雄 {index + 1}:</p>
                                    <p className="text-sm text-gray-600">等级: {levelValueMap[hero.level.value]}</p>
                                    <p className="text-sm text-gray-600">法术攻击: {attackValueMap[hero.magicAttack.value]}</p>
                                    <p className="text-sm text-gray-600">物理攻击: {attackValueMap[hero.physicalAttack.value]}</p>
                                    <p className="text-sm text-gray-600">冷却缩减: {coolDownValueMap[hero.coolDown.value]}</p>
                                    <p className="text-sm text-gray-600">移速: {speedValueMap[hero.speed.value]}</p>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">红方英雄</h3>
                                {roomData.mode.settings.customDefineSettingData.red.heroes.map((hero, index) => (
                                  <div key={index} className="space-y-1">
                                    <p>英雄 {index + 1}:</p>
                                    <p className="text-sm text-gray-600">等级: {levelValueMap[hero.level.value]}</p>
                                    <p className="text-sm text-gray-600">法术攻击: {attackValueMap[hero.magicAttack.value]}</p>
                                    <p className="text-sm text-gray-600">物理攻击: {attackValueMap[hero.physicalAttack.value]}</p>
                                    <p className="text-sm text-gray-600">冷却缩减: {coolDownValueMap[hero.coolDown.value]}</p>
                                    <p className="text-sm text-gray-600">移速: {speedValueMap[hero.speed.value]}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="line">
                        <Card>
                          <CardHeader>
                            <CardTitle>兵线与野怪属性</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2">蓝方</h3>
                                <div className="space-y-2">
                                  <h4 className="font-medium">兵线属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[roomData.mode.settings.customDefineSettingData.blue.line.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[roomData.mode.settings.customDefineSettingData.blue.line.health.value]}</p>
                                  <p className="text-sm text-gray-600">移速: {speedValueMap[roomData.mode.settings.customDefineSettingData.blue.line.speed.value]}</p>
                                  <p className="text-sm text-gray-600">刷新速度: {refreshSpeedValueMap[roomData.mode.settings.customDefineSettingData.blue.line.refreshSpeed.value]}</p>
                                  <p className="text-sm text-gray-600">出兵类型: {spawnTypeValueMap[roomData.mode.settings.customDefineSettingData.blue.line.spawnType.value]}</p>
                                  <h4 className="font-medium mt-4">野怪属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[roomData.mode.settings.customDefineSettingData.blue.monster.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[roomData.mode.settings.customDefineSettingData.blue.monster.health.value]}</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">红方</h3>
                                <div className="space-y-2">
                                  <h4 className="font-medium">兵线属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[roomData.mode.settings.customDefineSettingData.red.line.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[roomData.mode.settings.customDefineSettingData.red.line.health.value]}</p>
                                  <p className="text-sm text-gray-600">移速: {speedValueMap[roomData.mode.settings.customDefineSettingData.red.line.speed.value]}</p>
                                  <p className="text-sm text-gray-600">刷新速度: {refreshSpeedValueMap[roomData.mode.settings.customDefineSettingData.red.line.refreshSpeed.value]}</p>
                                  <p className="text-sm text-gray-600">出兵类型: {spawnTypeValueMap[roomData.mode.settings.customDefineSettingData.red.line.spawnType.value]}</p>
                                  <h4 className="font-medium mt-4">野怪属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[roomData.mode.settings.customDefineSettingData.red.monster.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[roomData.mode.settings.customDefineSettingData.red.monster.health.value]}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="tower">
                        <Card>
                          <CardHeader>
                            <CardTitle>防御塔与水晶属性</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2">蓝方</h3>
                                <div className="space-y-2">
                                  <h4 className="font-medium">防御塔属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[roomData.mode.settings.customDefineSettingData.blue.tower.attack.value]}</p>
                                  <p className="text-sm text-gray-600">攻击范围: {speedValueMap[roomData.mode.settings.customDefineSettingData.blue.tower.attackRange.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[roomData.mode.settings.customDefineSettingData.blue.tower.health.value]}</p>
                                  <h4 className="font-medium mt-4">水晶属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[roomData.mode.settings.customDefineSettingData.blue.crystal.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[roomData.mode.settings.customDefineSettingData.blue.crystal.health.value]}</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">红方</h3>
                                <div className="space-y-2">
                                  <h4 className="font-medium">防御塔属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[roomData.mode.settings.customDefineSettingData.red.tower.attack.value]}</p>
                                  <p className="text-sm text-gray-600">攻击范围: {speedValueMap[roomData.mode.settings.customDefineSettingData.red.tower.attackRange.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[roomData.mode.settings.customDefineSettingData.red.tower.health.value]}</p>
                                  <h4 className="font-medium mt-4">水晶属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[roomData.mode.settings.customDefineSettingData.red.crystal.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[roomData.mode.settings.customDefineSettingData.red.crystal.health.value]}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="ban">
                        <Card>
                          <CardHeader>
                            <CardTitle>禁用英雄列表</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {roomData.mode.settings.banHeroNames.map((name) => (
                                <span key={name} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm">
                                  {name}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="p-4 border-2 rounded-xl shadow-md max-w-xs" style={{ borderImage: 'linear-gradient(to right, #6a11cb, #2575fc) 1' }}>
                <QRCode value={`${window.location.origin}/room/${roomId}`} size={80} />
              </div>
            </div>  
          </div>
        </CardContent>
      </Card>

      {/* 加入队伍按钮 */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4">
        <Button
          disabled={loading}
          onClick={() => joinTeam("blue")}
          className="h-12 text-lg bg-blue-600 hover:bg-blue-700"
        >
          加入蓝方
        </Button>
        <Button
          disabled={loading}
          onClick={() => joinTeam("red")}
          className="h-12 text-lg bg-red-600 hover:bg-red-700"
        >
          加入红方
        </Button>
      </div>

      {/* 提示文字和按钮组 */}
      <div className="mt-8 text-center space-y-4">
        <div className="text-gray-500">
          <p>游戏已开?</p>
          <p className="text-sm mt-1">试试返回首页或新建房间</p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button
            variant="secondary"
            onClick={() => router.push('/')}
            className="bg-white/80 hover:bg-white/90 text-gray-700 border border-gray-200 shadow-sm"
          >
            返回首页
          </Button>
          <Button
            onClick={() => startGame(roomData.mode)}
            disabled={isCreating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-sm"
          >
            新建房间
          </Button>
        </div>
      </div>

      {/* 添加 LoadingDialog */}
      <LoadingDialog open={loading || isCreating} />
    </div>
  )
} 