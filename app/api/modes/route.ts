import { NextResponse } from "next/server"
import { type Mode } from "@/types/mode"
import { generateDefaultMode } from "@/lib/mode";

// 模拟数据库中的数据
const PRESET_MODES: Mode[] = [
  {
    ...generateDefaultMode(),
    id: "1",
    name: "无CD模式",
    description: "技能无冷却、无消耗",
  },
  {
    ...generateDefaultMode(),
    id: "2",
    name: "无CD模式(禁无敌)",
    description: "技能无冷却、无消耗，禁用无敌技能",
  }
]

const HOT_MODES: Mode[] = [
  {
    ...generateDefaultMode(),
    id: "3",
    name: "无限火力",
    description: "技能无冷却、无消耗，体验极致快感",
    usageCount: 2341,
  },
  {
    ...generateDefaultMode(),
    id: "4",
    name: "镜像对决",
    description: "双方阵容完全相同，考验真实实力",
    usageCount: 1205,
  },
  {
    ...generateDefaultMode(),
    id: "5",
    name: "无限乱斗",
    description: "随机英雄、无限火力，爽快乱斗",
    usageCount: 986,
  },
  {
    ...generateDefaultMode(),
    id: "6",
    name: "欢乐夺宝",
    description: "收集宝物获得胜利，休闲娱乐",
    usageCount: 756,
  }
]

export async function GET() {
  return NextResponse.json({
    presetModes: PRESET_MODES,
    hotModes: HOT_MODES
  })
} 