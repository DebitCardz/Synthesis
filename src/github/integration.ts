import { Octokit } from "../../deps.ts";
import {config} from "../types/Config.ts"

const octokit = new Octokit({ auth: config.github.token });

export async function getSynthesisRepo() {
    return (await octokit.request('GET /repos/{owner}/{repo}', {
        owner: 'CoreyShupe',
        repo: 'Synthesis'
    })).data
}
