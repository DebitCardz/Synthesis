import { Command, CommandContext } from "../../deps.ts";
import { requireSynthesisClient } from "../util/functions.ts";

export default class TestCommand extends Command {
	name = "test";

	async execute(ctx: CommandContext) {
		const client = requireSynthesisClient(ctx.client)

		client.github.postIssueComment(4, "hello")
	}
}