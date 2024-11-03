import clientPromise from '@/lib/mongodb'
import { Room } from '@/lib/types'

export class RoomService {
  private static async getCollection() {
    const client = await clientPromise
    const db = client.db("hok-opener")
    return db.collection('rooms')
  }

  static async createRoom(config: any): Promise<string> {
    const collection = await this.getCollection()
    
    const roomId = Math.random().toString(36).substring(2, 15)
    const room = {
      roomId,
      config,
      createdAt: new Date(),
      status: 'active'
    }
    
    await collection.insertOne(room)
    return roomId
  }

  static async getRoom(roomId: string): Promise<Room | null> {
    const collection = await this.getCollection()
    const room = await collection.findOne({ roomId })
    return room as Room | null
  }
} 