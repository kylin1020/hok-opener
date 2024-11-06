import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { type Mode } from '@/types/mode'

// 添加 MongoDB 文档接口
interface ModeDocument {
  _id: ObjectId
  name: string
  description: string
  settings: any // 根据实际 settings 类型调整
  usageCount: number
  createdAt: Date
}

export class ModeService {
  private static collection: any = null

  private static async getCollection() {
    // 添加集合缓存，避免重复连接
    if (this.collection) {
      return this.collection
    }
    const client = await clientPromise
    const db = client.db("hok-opener")
    this.collection = db.collection('modes')
    return this.collection
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
    console.log('Fetching hot modes with limit:', limit)
    const items = await collection.find({}).sort({ usageCount: -1 }).limit(limit).toArray()
    console.log('Found items:', items.length)
    return items.map((item: ModeDocument) => ({
      id: item._id.toString(),
      name: item.name,
      description: item.description,
      settings: item.settings,
      usageCount: item.usageCount,
      createdAt: item.createdAt
    }))
  }

  static async testConnection() {
    try {
      const collection = await this.getCollection()
      const count = await collection.countDocuments()
      console.log('Database connection successful. Document count:', count)
      return true
    } catch (error) {
      console.error('Database connection error:', error)
      return false
    }
  }
} 