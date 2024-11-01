"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { BanHeroListForm } from "@/components/ban-hero-list-form"

export function ConfigFormComponent() {
  const [mapMode, setMapMode] = useState('2ban')
  const [disabledHeroes, setDisabledHeroes] = useState<string[]>([])
  const [customConfig, setCustomConfig] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const config = {
      mapMode,
      disabledHeroes,
      customConfig
    }
    const configString = JSON.stringify(config)
    navigator.clipboard.writeText(configString).then(() => {
      toast({
        title: "配置已复制",
        description: "配置链接已成功复制到剪贴板。",
      })
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-200 to-red-200 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">王者荣耀快捷开局</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mapMode">地图模式</Label>
              <Select onValueChange={setMapMode} value={mapMode}>
                <SelectTrigger id="mapMode">
                  <SelectValue placeholder="选择地图模式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5v5">5v5王者峡谷</SelectItem>
                  <SelectItem value="1ban">征召1ban位</SelectItem>
                  <SelectItem value="2ban">征召2ban位</SelectItem>
                  <SelectItem value="4ban">征召4ban位</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>禁用英雄列表</Label>
              <BanHeroListForm />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customConfig">自定义配置</Label>
              <Textarea
                id="customConfig"
                placeholder="输入自定义配置..."
                value={customConfig}
                onChange={(e) => setCustomConfig(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              复制配置链接
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}