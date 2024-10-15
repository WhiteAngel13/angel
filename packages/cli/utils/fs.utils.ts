import { writeFile } from "fs/promises";
import { stat, mkdir } from "fs/promises";
import { dirname } from "path";

const assertDir = async (path: string) => {
  try {
    const dir = await stat(path);
    if (!dir.isDirectory()) {
      throw new Error(`${path} is not a directory`);
    }
  } catch (e) {
    await mkdir(path, { recursive: true });
    return assertDir(path);
  }
};

export const touchFile = async (path: string): Promise<void> => {
  try {
    const fileStat = await stat(path);
    if (!fileStat.isFile()) throw new Error(`${path} is not a file`);
  } catch (e) {
    await writeFile(path, "");
    return touchFile(path);
  }
};

export const writeFileSafe = async (path: string, data: string) => {
  const dirPath = dirname(path);
  await assertDir(dirPath);
  await writeFile(path, data);
};
