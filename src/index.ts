import { GatewayIntents } from "../deps.ts";
import { config } from "./types/Config.ts";
import SyncCommand from "./commands/SyncCommand.ts";
import SynthesisClient from "./client.ts";

const client = new SynthesisClient();

client.commands.add(SyncCommand);

client.on("ready", () => {
  console.log(`Ready! User: ${client.user?.tag}`);
});

client.connect(config.discord.secret, [
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);
