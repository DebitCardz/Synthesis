import { GatewayIntents } from "../deps.ts";
import { config } from "./types/Config.ts";
import SynthesisClient from "./client.ts";

const client = new SynthesisClient({
  prefix: "!",
  token: config.discord.secret,
  intents: [
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES,
  ],
});
client.connect();
