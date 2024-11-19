import { createOpenAPI, createWebsocket } from 'qq-guild-bot';

const config = {
    appID: process.env.BOT_APP_ID || '', // 申请机器人时获取到的机器人 BotAppID
    token: process.env.BOT_TOKEN || '', // 申请机器人时获取到的机器人 BotToken
    intents: ['PUBLIC_GUILD_MESSAGES'], // 事件订阅,用于开启可接收的消息类型
    sandbox: true, // 沙箱支持，可选，默认false. v2.7.0+
};

export const QQBot = createOpenAPI(config);
