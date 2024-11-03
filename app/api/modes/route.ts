import { NextResponse } from "next/server"
import { GameMode } from "@/lib/constants/modes"

// 模拟数据库中的数据
const PRESET_MODES: GameMode[] = [
  {
    id: 1,
    title: "无CD模式",
    description: "技能无冷却、无消耗",
    isPreset: true
  },
  {
    id: 2,
    title: "无CD模式(禁无敌)",
    description: "技能无冷却、无消耗，禁用无敌技能",
    isPreset: true
  }
]

const HOT_MODES: GameMode[] = [
  {
    id: 3,
    title: "无限火力",
    description: "技能无冷却、无消耗，体验极致快感",
    disabled: false,
    usageCount: 2341
  },
  {
    id: 4,
    title: "镜像对决",
    description: "双方阵容完全相同，考验真实实力",
    disabled: false,
    usageCount: 1205
  },
  {
    id: 5,
    title: "无限乱斗",
    description: "随机英雄、无限火力，爽快乱斗",
    disabled: true,
    usageCount: 986
  },
  {
    id: 6,
    title: "欢乐夺宝",
    description: "收集宝物获得胜利，休闲娱乐",
    disabled: true,
    usageCount: 756
  }
]

export async function GET() {
  return NextResponse.json({
    presetModes: PRESET_MODES,
    hotModes: HOT_MODES
  })
} 