import { NextResponse } from 'next/server'
import { ModeService } from '@/lib/services/mode.service'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const mode = await ModeService.getMode(params.id)
    
    if (!mode) {
      return NextResponse.json(
        { error: "未找到指定模式" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      config: mode.config,
      name: mode.name
    })
    
  } catch (error) {
    console.error('获取模式信息失败:', error)
    return NextResponse.json(
      { error: "获取模式信息失败" },
      { status: 500 }
    )
  }
} 