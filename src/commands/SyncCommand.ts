import {Command, CommandContext, Embed} from "../../deps.ts"
import {config} from "../types/Config.ts"
import {getIssues, getIssueComments, formatUrl} from "../github/integration.ts"
import GithubUser from "../types/GithubUser.ts"

type FormattableMessage = {
    id: number, 
    body: string, 
    user: GithubUser, 
    url: string, 
    "created_at": string,
}

export default class SyncCommand extends Command {
    name = 'sync'

    private formatIssue(message: FormattableMessage & {title: string}): Embed {
        return new Embed({
            title: `#${message.id}: ${message.title}`,
            description: (message.body || "").substring(0, 4096),
            url: message.url,
            timestamp: message.created_at,
            author: {
                name: message.user.login,
                icon_url: message.user.avatar_url,
                url: message.user.url,
            }
        })
    }

    private format(message: FormattableMessage): Embed {
        return new Embed({
            title: `Issue Comment #${message.id}`,
            description: (message.body || "").substring(0, 4096),
            url: message.url,
            timestamp: message.created_at,
            author: {
                name: message.user.login,
                icon_url: message.user.avatar_url,
                url: message.user.url,
            }
        })
    }

    async execute(ctx: CommandContext) {
        ctx.message.reply("Syncing...")
        try {
        const issues = (await getIssues()).sort((i1, i2) => i1.number - i2.number)
        for (const issue of issues) {
            const message = await ctx.client.channels.sendMessage(config.discord.channels.issues, this.formatIssue({
                ...issue,
                id: issue.number,
                url: formatUrl(issue.number),
            }))
            const threadChannel = await message.startThread({
                name: `(${issue.number}) ${issue.title.substr(0, Math.min(issue.title.length, 50))}`,
                autoArchiveDuration: 1440,
            })
            const comments = await getIssueComments(issue.number)

            const channelId = threadChannel.id
            for (const comment of comments) {
                await ctx.client.channels.sendMessage(channelId, this.format({
                    ...comment,
                    url: formatUrl(issue.number, comment.id),
                }))
            }
        }
        }catch(e){
            console.log(e)
        }
    }
}