import { type Mode } from "@/types/mode"

export function getModeById(modes: Mode[], id: string): Mode | undefined {
  return modes.find(mode => mode.id === id)
}

export function getModeTitle(modes: Mode[], id: string): string {
  return getModeById(modes, id)?.name || "未知模式"
} 