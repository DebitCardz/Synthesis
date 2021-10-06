import {
  Command,
  CommandClient,
  CommandClientOptions,
  event,
  Extension
} from "../deps.ts";
import Config, {
  DiscordConfiguration,
  GithubConfiguration,
} from "./types/Config.ts";
import GithubIntegration from "./github/integration.ts";
import { getContentsOfAllDirectories } from "./util/functions.ts";

export default class SynthesisClient extends CommandClient {
  // cache here
  public readonly config: Config;
  public readonly github: GithubIntegration;

  constructor(options: CommandClientOptions) {
    super(options);

    this.config = JSON.parse(
      Deno.readTextFileSync("../secrets/config.json"),
    );

    this.github = new GithubIntegration(this.config.github);

    this.registerCommands();
    this.registerEvents();
  }

  private async registerCommands() {
    getContentsOfAllDirectories("./commands/").forEach(async (file) => {
      const { default: command } = await import(file);
      if (command === undefined || command !instanceof Command) {
        console.error(`A file in commands is not a valid command.`);
        return;
      }

      this.commands.add(command);
    });
  }

  private async registerEvents() {
    getContentsOfAllDirectories("./events/").forEach(async (file) => {
      const { default: event } = await import(file);
      if (event === undefined || event !instanceof Extension) {
        console.error(`A file in events is not a valid extension.`);
        return;
      }

      this.extensions.load(event);
    });
  }

  public get discordConfig(): DiscordConfiguration {
    return this.config.discord;
  }

  public get githubConfig(): GithubConfiguration {
    return this.config.github;
  }

  @event()
  ready(): void {
    console.log(`Ready! User: ${this.user?.tag}`);
  }
}
