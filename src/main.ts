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

if (!config.discord.secret) {
  throw new Error(
    "Please provide your discord bot token in secrets/config.json.",
  );
} else {
  client.connect();
}
