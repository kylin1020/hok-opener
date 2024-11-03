import { NextResponse } from 'next/server'
import { RoomService } from '@/lib/services/room.service'
import { ModeService } from '@/lib/services/mode.service'
import { Mode } from '@/types/mode'

export async function POST(request: Request) {
  try {
    const body: Mode = await request.json()
    const roomId = await RoomService.createRoom(body)
    if (body.id) {
      await ModeService.increaseUsageCount(body.id)
    }
    return NextResponse.json({
      code: 0,
      data: { roomId },
      message: '创建成功'
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({
      code: 500,
      data: null,
      message: '创建房间失败'
    })
  }
} 