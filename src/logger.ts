import {Client, Embed} from "../deps.ts";
import {config} from "./types/Config.ts"

const logColors = {
    WARN: 0xFFFF00,
    DEBUG: 0x808080,
    ALERT: 0xFF0000,
    INFO: 0x00FF00,
}

export enum LogLevel {
    WARN = 'WARN',
    DEBUG = 'DEBUG',
    ALERT = 'ALERT',
    INFO = 'INFO',
}

export async function log(client: Client, content: string, level: LogLevel = LogLevel.INFO) {
    await client.channels.sendMessage(config.discord.channels.logs, new Embed({
        title: "Synthesis Logger",
        color: logColors[level],
        timestamp: new Date().toISOString(),
        fields: [{
            name: `:: ${level} ::`,
            value: content,
        }],
    }));
}