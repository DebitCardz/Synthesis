import GithubUser from "./GithubUser.ts"

export default interface IssueComment {
    id: number,
    body: string,
    user: GithubUser,
    url: string,
    "created_at": string,
}