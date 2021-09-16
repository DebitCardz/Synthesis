import { CommandClient, CommandContext } from "../../deps.ts";
import SynthesisClient from "../client.ts";
import Config from "../types/Config.ts";

export const trueEquals = (a: any, b: any): boolean => (!a && !b) || (a === b);

export const requireSynthesisConfigFromClient = (
  client: CommandClient,
): Config => {
  if (client instanceof SynthesisClient) {
    return (client as SynthesisClient).config;
  } else {
    throw new Error("Client isn't an instanceof SynthesisClient.");
  }
};

export const requireSynthesisConfig = (ctx: CommandContext): Config =>
  requireSynthesisConfigFromClient(ctx.client);
