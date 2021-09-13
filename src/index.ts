import {Client, Message, GatewayIntents} from "../deps.ts"

const config = JSON.parse(Deno.readTextFileSync('../secrets/config.json'));

const client = new Client()

client.on('ready', () => {
    console.log(`Ready! User: ${client.user?.tag}`)
})

client.on('messageCreate', (ctx: Message) => {
    if (ctx.content === '!ping') {
        ctx.reply(`Pong (Hello World): ${client.gateway.ping}`)
    }
})

client.connect(config.secret, [
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES,
]);