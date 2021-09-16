import { CommandClient } from "../deps.ts";
import Config from "./types/Config.ts";

export default class SynthesisClient extends CommandClient {
  // cache here
  public config: Config;

  constructor() {
    super({
      prefix: "!",
    });

    this.config = JSON.parse(
      Deno.readTextFileSync("../secrets/config.json"),
    ) as Config;
  }
}
