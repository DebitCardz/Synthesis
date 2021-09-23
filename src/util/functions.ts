import { CommandClient } from "../../deps.ts";
import SynthesisClient from "../client.ts";

export const trueEquals = (a: unknown, b: unknown): boolean =>
  (!a && !b) || (a === b);

export const requireSynthesisClient = (client: CommandClient) => {
  if (client instanceof SynthesisClient) {
    return client as SynthesisClient;
  } else {
    throw new Error("Client isn't an instanceof SynthesisClient.");
  }
};
