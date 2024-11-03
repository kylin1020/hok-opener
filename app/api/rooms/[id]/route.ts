import { NextResponse } from 'next/server'
import { RoomService } from '@/lib/services/room.service'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const roomId = params.id
    
    if (!roomId) {
      return NextResponse.json({
        code: 400,
        data: null,
        message: '房间ID不能为空'
      })
    }
    
    const room = await RoomService.getRoom(roomId)
    
    if (!room) {
      return NextResponse.json({
        code: 404,
        data: null,
        message: '房间不存在'
      })
    }
    
    return NextResponse.json({
      code: 0,
      data: room,
      message: '获取成功'
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({
      code: 500,
      data: null,
      message: '获取房间信息失败'
    })
  }
}
