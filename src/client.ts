import { CommandClient } from "../deps.ts";

export default class SynthesisClient extends CommandClient {
  // cache here

  constructor() {
    super({
      prefix: "!",
    });
  }
}
