import clientPromise from '@/lib/mongodb'
import { Mode } from '@/types/mode'
import { Room } from '@/types/room'
import { ObjectId } from 'mongodb'
import { generateQRCodeImage } from '@/lib/utils/qrcode'
import path from 'path'
import fs from 'fs'

export class RoomService {
  private static async getCollection() {
    const client = await clientPromise
    const db = client.db("hok-opener")
    return db.collection('rooms')
  }

  static async createRoom(mode: Mode): Promise<string> {
    const collection = await this.getCollection()
    
    // 生成房间号
    const roomNo = Math.round(Math.random() * 1000000000000000)
    
    // 先创建一个临时的 roomId，用于生成 QR 码
    const tempRoomId = new ObjectId()
    
    try {
      // 先生成 QR 码
      const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000'}/room/${tempRoomId.toString()}`
      const qrCodeUrl = await generateQRCodeImage(shareUrl, tempRoomId.toString())
      
      // 确保 QR 码生成成功后，再创建房间记录
      const room = {
        _id: tempRoomId, // 使用预先生成的 ID
        mode,
        createdAt: new Date(),
        status: 'active',
        roomNo,
        qrCodeUrl
      }
      
      await collection.insertOne(room)
      return tempRoomId.toString()
    } catch (error) {
      // 如果出现错误，清理已生成的 QR 码文件
      try {
        // 通过 qrCodeUrl 找到文件路径
        const qrFilePath = path.join(process.cwd(), 'public', 'qr', 
          new Date().getFullYear().toString(),
          String(new Date().getMonth() + 1).padStart(2, '0'),
          String(new Date().getDate()).padStart(2, '0'),
          `${tempRoomId.toString()}.png`
        )
        if (fs.existsSync(qrFilePath)) {
          fs.unlinkSync(qrFilePath)
        }
      } catch (cleanupError) {
        console.error('Failed to cleanup QR code file:', cleanupError)
      }
      throw error
    }
  }

  static async getRoom(roomId: string): Promise<Room | null> {
    const collection = await this.getCollection()
    const room = await collection.findOne({ _id: new ObjectId(roomId) })
    return room as Room | null
  }
} 