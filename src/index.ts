import {CommandClient, GatewayIntents} from "../deps.ts"
import {config} from "./types/Config.ts"
import SyncCommand from "./commands/SyncCommand.ts"

const client = new CommandClient({
    prefix: '!',
})

client.commands.add(SyncCommand)

client.on('ready', () => {
    console.log(`Ready! User: ${client.user?.tag}`)
})

client.connect(config.discord.secret, [
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES,
]);