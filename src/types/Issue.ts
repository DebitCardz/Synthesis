import GithubUser from "./GithubUser.ts"

export default interface Issue {
    id: number,
    number: number
    title: string,
    body: string,
    user: GithubUser,
    url: string,
    "created_at": string,
}