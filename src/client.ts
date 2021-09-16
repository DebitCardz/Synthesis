import { CommandClient, CommandClientOptions, event } from "../deps.ts";
import SyncCommand from "./commands/SyncCommand.ts";
import Config from "./types/Config.ts";

export default class SynthesisClient extends CommandClient {
  // cache here
  public config: Config;

  constructor(options: CommandClientOptions) {
    super(options);
    this.commands.add(SyncCommand);

    this.config = JSON.parse(
      Deno.readTextFileSync("../secrets/config.json"),
    );
  }

  @event()
  ready(): void {
    console.log(`Ready! User: ${this.user?.tag}`);
  }
}
