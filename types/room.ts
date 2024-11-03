import { Mode } from "./mode"

export type Room = {
  roomId: string
  mode: Mode
  createdAt: Date
  status: 'active' | 'ended'
}