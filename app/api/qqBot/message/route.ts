import { NextRequest, NextResponse } from 'next/server'
import { QQBot } from '@/lib/services/qq.bot'

export async function POST(request: NextRequest) {
    const { channelId } = await request.json()
    try {
        await sendCustomMessage(channelId)
        return NextResponse.json({
            code: 0,
            message: 'success',
            data: null
        })
    } catch (error: any) {
        return NextResponse.json({ code: 301, message: error.message, data: null })
    }
}

async function sendCustomMessage(channelID: string) {
  let { data } = await QQBot.messageApi.postMessage(channelID, {
    ark: {
      template_id: '24',
      kv: [
        {
          key: '#DESC#',
          value: '描述描述描放假大方了大家反垄断撒娇两款发动机临时卡封疆大吏撒酒疯；里导数据阿弗莱克的撒娇；廊坊述',
          obj: []
        },
        {
          key: '#PROMPT#',
          value: '通知信息xxxxx',
          obj: []
        },
        {
          key: '#TITLE#',
          value: '标题fjd;lsajfldjsalkfjdkw封疆大吏撒娇锋利的撒娇；付了定金撒标题标题标题标题fjkdlajfldjal;fd放大了发动机上来空',
          obj: []
        },
        {
          key: '#METADESC#',
          value: 'Meta描述描述描述风好大换热器继往开来积分考虑到；安静了；了；防静电；来撒会今日而我却哦iopqwfjldsa',
          obj: []
        },
        {
          key: '#IMG#',
          value: '',
          obj: []
        },
        {
          key: '#LINK#',
          value: '',
          obj: []
        },
        {
          key: '#SUBTITLE#',
          value: '子标题',
          obj: []
        },
      ],
    },
  });
}
