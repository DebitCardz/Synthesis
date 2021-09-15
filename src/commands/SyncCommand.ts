import { Command, CommandContext } from "../../deps.ts";
import { config } from "../types/Config.ts";
import {
  formatUrl,
  getIssueComments,
  getIssues,
} from "../github/integration.ts";
import { formatIssue, formatIssueComment } from "../util/formatter.ts";

export default class SyncCommand extends Command {
  name = "sync";

  async execute(ctx: CommandContext) {
    ctx.message.reply("Syncing...");

    // grab issues
    const issues = (await getIssues()).sort((i1, i2) => i1.number - i2.number);

    for (const issue of issues) {
      const message = await ctx.client.channels.sendMessage(
        config.discord.channels.issues,
        formatIssue({
          ...issue,
          id: issue.number,
          url: formatUrl(issue.number),
        }),
      );

      const threadChannel = await message.startThread({
        name: `(${issue.number}) ${
          issue.title.substr(0, Math.min(issue.title.length, 50))
        }`,
        autoArchiveDuration: 1440,
      });

      // grab issue comments
      const comments = await getIssueComments(issue.number);
      const channelId = threadChannel.id;
      for (const comment of comments) {
        await ctx.client.channels.sendMessage(
          channelId,
          formatIssueComment({
            ...comment,
            url: formatUrl(issue.number, comment.id),
          }),
        );
      }
    }
  }
}
