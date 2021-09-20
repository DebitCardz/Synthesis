import { Octokit } from "../../deps.ts";
import Config from "../types/Config.ts";
import Issue from "../types/Issue.ts";
import IssueComment from "../types/IssueComment.ts";

export default class GithubIntegration {
  private octokit: Octokit;

  // TODO: Add interface for Github config.
  private readonly githubConfig: Config;

  constructor(config: Config) {
    this.octokit = new Octokit({ auth: config.github.token });

    this.githubConfig = config;
  }

  async getIssues(): Promise<Issue[]> {
    return (await this.octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: this.githubConfig.github.user,
      repo: this.githubConfig.github.repo,
    })).data as Issue[];
  }

  async getIssueComments(
    id: number,
  ): Promise<IssueComment[]> {
    return (await this.octokit.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: this.githubConfig.github.user,
        repo: this.githubConfig.github.repo,
        issue_number: id,
      },
    )).data as IssueComment[];
  }
}
