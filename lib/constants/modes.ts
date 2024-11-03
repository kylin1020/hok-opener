export interface GameMode {
  id: number
  title: string
  description?: string
  disabled?: boolean
  usageCount?: number
  isPreset?: boolean
}

export function getModeById(modes: GameMode[], id: number): GameMode | undefined {
  return modes.find(mode => mode.id === id)
}

export function getModeTitle(modes: GameMode[], id: number): string {
  return getModeById(modes, id)?.title || "未知模式"
} 