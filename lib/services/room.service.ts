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
    
    const room = {
      mode,
      createdAt: new Date(),
      status: 'active',
      roomNo: Math.round(Math.random() * 1000000000000000000)
    }
    
    const result = await collection.insertOne(room)
    const roomId = result.insertedId.toString()
    return roomId
  }

  static async getRoom(roomId: string): Promise<Room | null> {
    const collection = await this.getCollection()
    const room = await collection.findOne({ _id: new ObjectId(roomId) })
    return room as Room | null
  }
} 