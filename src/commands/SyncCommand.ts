import {
  ChannelTypes,
  Command,
  CommandContext,
  Embed,
  Guild,
  GuildChannel,
  User,
} from "../../deps.ts";
import { config } from "../types/Config.ts";
import {
  formatUrl,
  getIssueComments,
  getIssues,
} from "../github/integration.ts";
import { formatIssue, formatIssueComment } from "../util/formatter.ts";
import { trueEquals } from "../util/functions.ts";

export default class SyncCommand extends Command {
  name = "sync";

  async execute(ctx: CommandContext) {
    const start = Date.now();

    // DM channel or something?
    if (!ctx.guild) {
      return;
    }

    const replyMessage = await ctx.message.reply(
      `Synchronizing issues with **${config.github.repo}**.`,
    );

    // TODO: We can store this somewhere else later, for now this works.
    const issueChannel = await this.resetIssuesChannel(ctx.guild);

    // grab issues
    const issues = (await getIssues()).sort((i1, i2) => i1.number - i2.number);
    let totalComments = 0;

    for (const issue of issues) {
      const message = await ctx.client.channels.sendMessage(
        issueChannel.id,
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
      totalComments += comments.length;

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

    await replyMessage.edit(
      `Process complete in **${Date.now() - start}ms**.`,
      this.getSyncCompleteEmbed(
        ctx.author,
        issues.length,
        totalComments,
      ),
    );
  }

  private async resetIssuesChannel(guild: Guild): Promise<GuildChannel> {
    const configChannelName = config.discord.channels.issues.name;
    const configParentId = config.discord.channels.issues.parent;

    // Remove all previous issue channels so we can reinitialize it.
    for (const channel of await guild.channels.array()) {
      if (channel.type !== ChannelTypes.GUILD_TEXT) continue;

      if (
        trueEquals(configParentId, channel.parentID) &&
        trueEquals(configChannelName, channel.name)
      ) {
        await guild.channels.delete(channel.id);
      }
    }

    return await guild.createChannel({
      name: config.discord.channels.issues.name,
      parent: config.discord.channels.issues.parent,
      type: ChannelTypes.GUILD_TEXT,
    });
  }

  private getSyncCompleteEmbed(
    author: User,
    openIssues: number,
    totalComments: number,
  ): Embed {
    return new Embed({
      fields: [
        {
          name: "Open Issues",
          value: `${openIssues}`,
          inline: true,
        },
        {
          name: "Total Comments",
          value: `${totalComments}`,
          inline: true,
        },
      ],
      author: {
        name: "Synchronization Complete",
        icon_url: author.avatarURL("dynamic"),
      },
      color: 0x00FF00,
    });
  }
}
