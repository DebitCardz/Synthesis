import { Extension, event, Message } from "../../deps.ts";

export default class MessageCreateEvent extends Extension {
	@event("messageCreate")
	private messageCreatedEvent(_: this, message: Message) {
		if(!message.channel.isThread()) return;
		
	}
}