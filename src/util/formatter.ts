import { Embed } from "../../deps.ts";
import GithubUser from "../types/GithubUser.ts";

export type FormattableMessage = {
  id: number;
  body: string;
  user: GithubUser;
  url: string;
  "created_at": string;
};

export function formatIssue(
  message: FormattableMessage & { title: string },
): Embed {
  return new Embed({
    title: `#${message.id}: ${message.title}`,
    description: (message.body || "").substring(0, 4096),
    url: message.url,
    timestamp: message.created_at,
    author: {
      name: message.user.login,
      icon_url: message.user.avatar_url,
      url: message.user.url,
    },
  });
}

export function formatIssueComment(message: FormattableMessage): Embed {
  return new Embed({
    title: `Issue Comment #${message.id}`,
    description: (message.body || "").substring(0, 4096),
    url: message.url,
    timestamp: message.created_at,
    author: {
      name: message.user.login,
      icon_url: message.user.avatar_url,
      url: message.user.url,
    },
  });
}

export function formatUrl(
  user: string,
  repo: string,
  issueNumber: number,
  issueComment?: number,
): string {
  // TODO: If user is running a custom github impl we have to reflect that url.
  return `https://github.com/${user}/${repo}/issues/${issueNumber}${
    !issueComment ? "" : `#issuecomment-${issueComment}`
  }`;
}
