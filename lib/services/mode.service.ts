import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { type Mode } from '@/types/mode'

export class ModeService {
  private static async getCollection() {
    const client = await clientPromise
    const db = client.db("hok-opener")
    return db.collection('modes')
  }

  static async getMode(id: string) {
    const collection = await this.getCollection()
    const modeId = new ObjectId(id)
    const item = await collection.findOne({ _id: modeId })
    if (!item) {
      return undefined
    }
    return {
      id: item._id.toString(),
      name: item.name,
      description: item.description,
      settings: item.settings,
      usageCount: item.usageCount,
      createdAt: item.createdAt
    }
  }

  static async increaseUsageCount(id: string) {
    const collection = await this.getCollection()
    await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { usageCount: 1 } })
  }

  static async createMode(mode: Mode) {
    const collection = await this.getCollection()
    const result = await collection.insertOne(mode)
    return result.insertedId.toString()
  }

  static async getHotModes(limit: number = 4): Promise<Mode[]> {
    if (limit <= 0 || limit > 10) {
      limit = 4
    }

    const collection = await this.getCollection()
    const items = await collection.find({}).sort({ usageCount: -1 }).limit(limit).toArray()
    console.log('Found items:', items.length)
    return items.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      description: item.description,
      settings: item.settings,
      usageCount: item.usageCount,
      createdAt: item.createdAt
    }))
  }
} 