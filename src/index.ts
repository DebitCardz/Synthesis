import {Client, Message, GatewayIntents} from "../deps.ts"
import {config} from "./types/Config.ts"
import {getSynthesisRepo} from "./github/integration.ts"

const client = new Client()

client.on('ready', () => {
    console.log(`Ready! User: ${client.user?.tag}`)
})

client.on('messageCreate', (ctx: Message) => {
    if (ctx.content === '!debug') {
        getSynthesisRepo().then((data) => {
            ctx.reply(`\`\`\`${JSON.stringify(data, undefined, 2).substr(0, 500)}\`\`\``)
        })
    }
})

client.connect(config.discord.secret, [
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES,
]);