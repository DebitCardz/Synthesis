import { CommandClient } from "../../deps.ts";
import SynthesisClient from "../client.ts";

export const trueEquals = (a: unknown, b: unknown): boolean =>
  (!a && !b) || (a === b);

export const requireSynthesisClient = (client: CommandClient) => {
  if (client instanceof SynthesisClient) {
    return client as SynthesisClient;
  } else {
    throw new Error("Client isn't an instanceof SynthesisClient.");
  }
};

/**
 * Organize the contents of a given directory.
 * @returns Each content of the directory organized in a object.
 */
export function getOrganizedDirectory(
  dir: string | URL,
): OrganizedDirectoryResult {
  const organizedDirectory: OrganizedDirectoryResult = {
    files: [],
    directories: [],
    symlinks: [],
  };

  for (const content of Deno.readDirSync(dir)) {
    const name = content.name;

    if (content.isFile) {
      organizedDirectory.files.push(name);
    } else if (content.isDirectory) {
      organizedDirectory.directories.push(name);
    } else {
      // Symlinks will probably never be used but eh.
      organizedDirectory.symlinks.push(name);
    }
  }

  return organizedDirectory;
}

/**
 * Get all the files of a given directory recursively.
 * @param range Amount of directories allowed to be scanned, -1 if unlimited.
 * @returns Every file contained within each directory.
 */
export function getContentsOfAllDirectories(
  dir: string | URL,
  range: number = -1,
): string[] {
  const files: string[] = [];
  let directoryIterations = 0;

  // Scan the start directory.
  const scanDirectory = (dir: string | URL) => {
    // If it's not unlimited check iterations.
    if (range !== -1 && directoryIterations++ > range) return;

    const contents = getOrganizedDirectory(dir);
    contents.directories.forEach((directoryName) =>
      scanDirectory(`${dir.toString()}/${directoryName}`)
    );

    // Add the file location to each file name.
    contents.files.forEach((_, i) => {
      contents.files[i] = `${dir.toString()}${contents.files[i]}`;
    });

    files.push(...contents.files);
  };

  scanDirectory(dir);

  return files;
}

interface OrganizedDirectoryResult {
  files: string[];
  directories: string[];
  symlinks: string[];
}
