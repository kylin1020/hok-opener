import { NextResponse } from 'next/server'
import { ModeService } from '@/lib/services/mode.service'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const mode = await ModeService.getMode(params.id)
    if (!mode) {
      return NextResponse.json({ code: 404, message: '模式不存在' }, { status: 404 })
    }
    return NextResponse.json({ code: 0, data: mode, message: 'success' })
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: '获取模式失败' },
      { status: 500 }
    )
  }
} 