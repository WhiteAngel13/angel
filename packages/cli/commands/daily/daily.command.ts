import { Command } from "commander";
import { join } from "path";
import { readFile } from "fs/promises";
import { writeFileSafe } from "../../utils";
import { DIARY_PATH } from "../../utils/paths.utils";

export const AngelDailyCommand = new Command()
  .name("daily")
  .action(async () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const path = join(DIARY_PATH, "dailys", year, month, day, "daily.md");

    const templatePath = join(__dirname, "daily.template.md");
    const template = await readFile(templatePath, "utf-8");

    await writeFileSafe(path, template);
  });
