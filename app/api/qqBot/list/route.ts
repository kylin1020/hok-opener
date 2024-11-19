import { NextRequest, NextResponse } from 'next/server'
import { QQBot } from '@/lib/services/qq.bot'

export async function GET(request: NextRequest) {
    // const { data } = await QQBot.meApi.meGuilds()
    const { data } = await QQBot.channelApi.channels("1684859478821778229")
    return NextResponse.json({ data })
}
