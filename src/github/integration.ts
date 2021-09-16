import { Octokit } from "../../deps.ts";
import { config } from "../types/Config.ts";
import Issue from "../types/Issue.ts";
import IssueComment from "../types/IssueComment.ts";

const octokit = new Octokit({ auth: config.github.token });

export async function getIssues(): Promise<Issue[]> {
  return (await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: config.github.user,
    repo: config.github.repo,
  })).data as Issue[];
}

export async function getIssueComments(
  id: number,
): Promise<IssueComment[]> {
  return (await octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner: config.github.user,
      repo: config.github.repo,
      issue_number: id,
    },
  )).data as IssueComment[];
}

export function formatUrl(
  issueNumber: number,
  issueComment?: number,
) {
  return `https://github.com/${config.github.user}/${config.github.repo}/issues/${issueNumber}${
    issueComment === undefined ? "" : `#issuecomment-${issueComment}`
  }`;
}
