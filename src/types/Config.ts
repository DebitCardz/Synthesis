export default interface Config {
    discord: {
        secret: string,
        channels: {
            logs: string,
        },
    },
    github: {
        token: string,
    },
}

export const config: Config = JSON.parse(Deno.readTextFileSync('../secrets/config.json'));