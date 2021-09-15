export default interface Config {
  discord: {
    secret: string;
    channels: {
      logs: string;
      issues: string;
    };
  };
  github: {
    token: string;
    user: string;
    repo: string;
  };
}

export const config: Config = JSON.parse(
  Deno.readTextFileSync("../secrets/config.json"),
);
