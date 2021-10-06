import { Extension, event, ThreadChannel } from "../../deps.ts";

export default class ThreadUpdateEvent extends Extension {
	name = "ThreadUpdateEvent"
	
	@event("threadUpdate")
	private threadUpdateEvent(_: this, thread: ThreadChannel): void {
	}
}