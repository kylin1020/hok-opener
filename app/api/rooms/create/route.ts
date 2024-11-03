import { NextResponse } from 'next/server'
import { RoomService } from '@/lib/services/room.service'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const roomId = await RoomService.createRoom(body)
    
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