export default interface GithubUser {
  login: string;
  id: number;
  url: string;
  "avatar_url": string;
  type: "User" | "Bot" | string;
}
