interface RoomConfig {
  modeId: number
  modeName: string
  settings: {
    [key: string]: any  // 或者定义具体的设置项
  }
}

export interface Room {
  roomId: string
  config: RoomConfig
  createdAt: Date
  status: 'active' | 'inactive'
} 