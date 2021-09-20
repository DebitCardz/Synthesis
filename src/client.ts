import { CommandClient, CommandClientOptions, event } from "../deps.ts";
import SyncCommand from "./commands/SyncCommand.ts";
import Config from "./types/Config.ts";
import GithubIntegration from "./github/integration.ts";

export default class SynthesisClient extends CommandClient {
  // cache here
  public config: Config;

  public readonly github: GithubIntegration;

  constructor(options: CommandClientOptions) {
    super(options);
    this.commands.add(SyncCommand);

    this.config = JSON.parse(
      Deno.readTextFileSync("../secrets/config.json"),
    );

    this.github = new GithubIntegration(this.config);
  }

  @event()
  ready(): void {
    console.log(`Ready! User: ${this.user?.tag}`);
  }
}
