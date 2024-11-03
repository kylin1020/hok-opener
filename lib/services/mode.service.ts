import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export class ModeService {
  private static async getCollection() {
    const client = await clientPromise
    const db = client.db("hok-opener")
    return db.collection('modes')
  }

  static async getMode(id: string) {
    const collection = await this.getCollection()
    const modeId = new ObjectId(id)
    return await collection.findOne({ _id: modeId })
  }
} 