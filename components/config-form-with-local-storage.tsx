"use client"

import ConfigFormComponent from "@/components/config-form"
import type { Mode } from "@/types/mode"
import type { Hero } from "@/types/hero"
import { useRouter } from "next/navigation"
import { toast, Toaster } from "sonner"
import { LoadingDialog } from "@/components/loading-dialog"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

function loadModeFromLocalStorage() {
  const mode = localStorage.getItem('currentMode')
  return mode ? JSON.parse(mode) : null
}

function saveModeToLocalStorage(mode: Mode) {
  localStorage.setItem('currentMode', JSON.stringify(mode))
}

export default function ConfigFormWithLocalStorage({heroes}: {heroes: Hero[]}) {
  const router = useRouter()
  const currentMode = loadModeFromLocalStorage()
  const [isCreating, setIsCreating] = useState(false)

  const handleModeChange = async (mode: Mode) => {
    setIsCreating(true)
    try {
      // 调用 API 创建模式
      const response = await fetch('/api/modes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mode),
      })
      
      const result = await response.json()
      
      if (result.code === 0) {
        // API 调用成功，更新 mode 的 id 并保存到 localStorage
        const modeWithId = {
          ...mode,
          id: result.data.modeId
        }
        saveModeToLocalStorage(modeWithId)
        router.push('/')
      } else {
        // API 调用返回错误
        toast.error('保存模式失败：' + (result.message || '未知错误'))
      }
    } catch (error) {
      // API 调用异常
      toast.error('保存模式失败：' + (error instanceof Error ? error.message : '网络错误'))
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="relative w-full">
      <Button 
        variant="ghost"
        size="sm"
        onClick={() => router.push('/')}
        className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>返回</span>
      </Button>
      <ConfigFormComponent
        currentMode={currentMode}
        onModeChange={handleModeChange}
        heroes={heroes} 
      />
      <Toaster richColors />
      <LoadingDialog open={isCreating} />
    </div>
  )
}

