"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Users, Share } from "lucide-react"
import { toast } from "sonner"
import { loadConfigFromLocalStorage, type ConfigDataType } from "@/components/config-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { copyToClipboard } from "@/lib/utils/clipboard"

interface RoomParams {
  params: {
    id: string
  }
}

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
  '5': '100%加成'
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

export default function RoomPage({ params }: RoomParams) {
  const [loading, setLoading] = useState(false)
  const [configData, setConfigData] = useState<ConfigDataType | null>(null)
  const [gameConfigTab, setGameConfigTab] = useState('hero')

  useEffect(() => {
    const config = loadConfigFromLocalStorage()
    if (config) {
      setConfigData(config)
    }
  }, [])

  const joinTeam = async (team: "blue" | "red") => {
    setLoading(true)
    try {
      // TODO: 实现加入队伍的逻辑
      toast.success(`成功加入${team === "blue" ? "蓝队" : "红队"}`)
    } catch (error) {
      toast.error("加入失败，请重试")
    } finally {
      setLoading(false)
    }
  }

  if (!configData) {
    return <div>加载中...</div>
  }

  const getMapModeName = (mapMode: string) => {
    const modeMap: Record<string, string> = {
      '[1,20011,10]': '5v5标准模式',
      '[1,20911,10]': '5v5征召1ban位',
      '[1,20912,10]': '5v5征召2ban位',
      '[1,20111,10]': '5v5征召4ban位'
    }
    return modeMap[mapMode] || '未知模式'
  }

  return (
    <div className="h-[calc(100vh-theme('spacing.16'))] flex flex-col items-center bg-gradient-to-br from-purple-100 via-pink-200 to-red-200 p-4">
      {/* 房间信息卡片 */}
      <Card className="w-full max-w-md mb-6 mt-8 relative">
        {/* 添加分享按钮作为徽标 */}
        <Button 
          variant="ghost"
          size="sm"
          onClick={async () => {
            const shareUrl = `${window.location.origin}/room/${params.id}`;
            const success = await copyToClipboard(shareUrl);
            
            if (success) {
              toast.success("房间链接已复制到剪贴板", {
                description: "可以直接分享给好友了",
                duration: 3000,
              });
            } else {
              toast.error("复制失败，请重试");
            }
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2 h-auto"
        >
          <Share className="h-4 w-4" />
          <span>分享</span>
        </Button>

        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{getMapModeName(configData.mapMode)}</h2>
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
                                {configData.customDefineSettingData.blue.heroes.map((hero, index) => (
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
                                {configData.customDefineSettingData.red.heroes.map((hero, index) => (
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
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[configData.customDefineSettingData.blue.line.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[configData.customDefineSettingData.blue.line.health.value]}</p>
                                  <p className="text-sm text-gray-600">移速: {speedValueMap[configData.customDefineSettingData.blue.line.speed.value]}</p>
                                  <p className="text-sm text-gray-600">刷新速度: {refreshSpeedValueMap[configData.customDefineSettingData.blue.line.refreshSpeed.value]}</p>
                                  <p className="text-sm text-gray-600">出兵类型: {spawnTypeValueMap[configData.customDefineSettingData.blue.line.spawnType.value]}</p>
                                  <h4 className="font-medium mt-4">野怪属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[configData.customDefineSettingData.blue.monster.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[configData.customDefineSettingData.blue.monster.health.value]}</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">红方</h3>
                                <div className="space-y-2">
                                  <h4 className="font-medium">兵线属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[configData.customDefineSettingData.red.line.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[configData.customDefineSettingData.red.line.health.value]}</p>
                                  <p className="text-sm text-gray-600">移速: {speedValueMap[configData.customDefineSettingData.red.line.speed.value]}</p>
                                  <p className="text-sm text-gray-600">刷新速度: {refreshSpeedValueMap[configData.customDefineSettingData.red.line.refreshSpeed.value]}</p>
                                  <p className="text-sm text-gray-600">出兵类型: {spawnTypeValueMap[configData.customDefineSettingData.red.line.spawnType.value]}</p>
                                  <h4 className="font-medium mt-4">野怪属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[configData.customDefineSettingData.red.monster.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[configData.customDefineSettingData.red.monster.health.value]}</p>
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
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[configData.customDefineSettingData.blue.tower.attack.value]}</p>
                                  <p className="text-sm text-gray-600">攻击范围: {speedValueMap[configData.customDefineSettingData.blue.tower.attackRange.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[configData.customDefineSettingData.blue.tower.health.value]}</p>
                                  <h4 className="font-medium mt-4">水晶属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[configData.customDefineSettingData.blue.crystal.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[configData.customDefineSettingData.blue.crystal.health.value]}</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">红方</h3>
                                <div className="space-y-2">
                                  <h4 className="font-medium">防御塔属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[configData.customDefineSettingData.red.tower.attack.value]}</p>
                                  <p className="text-sm text-gray-600">攻击范围: {speedValueMap[configData.customDefineSettingData.red.tower.attackRange.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[configData.customDefineSettingData.red.tower.health.value]}</p>
                                  <h4 className="font-medium mt-4">水晶属性:</h4>
                                  <p className="text-sm text-gray-600">攻击力: {attackValueMap[configData.customDefineSettingData.red.crystal.attack.value]}</p>
                                  <p className="text-sm text-gray-600">血量: {attackValueMap[configData.customDefineSettingData.red.crystal.health.value]}</p>
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
                              {configData.banHeroNames.map((name) => (
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

      {/* 房间ID显示 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          房间ID: {params.id}
        </p>
      </div>
    </div>
  )
} 