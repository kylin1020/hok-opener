import { Mode } from "./mode"

export type Room = {
  roomId: string
  mode: Mode
  roomNo: number
  createdAt: Date
  status: 'active' | 'ended'
}