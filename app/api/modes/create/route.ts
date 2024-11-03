import { NextResponse } from "next/server"
import { ModeService } from "@/lib/services/mode.service"
import type { Mode } from "@/types/mode"

export async function POST(request: Request) {
  const mode: Mode = await request.json()
  const id = await ModeService.createMode(mode)
  return NextResponse.json({ code: 0, data: { modeId: id }, message: "success" })
}