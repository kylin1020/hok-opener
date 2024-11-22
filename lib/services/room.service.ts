import clientPromise from '@/lib/mongodb'
import { Mode } from '@/types/mode'
import { Room } from '@/types/room'
import { ObjectId } from 'mongodb'

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
    
    // 创建roomId
    const roomId = new ObjectId()
    
    try {
      const room = {
        _id: roomId,
        mode,
        createdAt: new Date(),
        status: 'active',
        roomNo,
      }
      
      await collection.insertOne(room)
      return roomId.toString()
    } catch (error) {
      throw error
    }
  }

  static async getRoom(roomId: string): Promise<Room | null> {
    const collection = await this.getCollection()
    const room = await collection.findOne({ _id: new ObjectId(roomId) })
    return room as Room | null
  }
} 