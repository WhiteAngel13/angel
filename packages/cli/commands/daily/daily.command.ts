import { Argument, Command } from "commander";
import { join } from "path";
import { readFile } from "fs/promises";
import { touchFile, writeFileSafe } from "../../utils";
import { exec } from "child_process";
import { DIARY_PATH } from "../../utils/paths.utils";

export const AngelDailyCommand = new Command()
  .name("daily")
  .addArgument(new Argument("[subcommand]", "Can be 'open'"))
  .action(async (subcommand) => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const path = join(DIARY_PATH, "dailys", year, month, day, "daily.md");

    const templatePath = join(__dirname, "daily.template.md");
    const template = await readFile(templatePath, "utf-8");

    const file = await touchFile(path);

    if (file === "") {
      await writeFileSafe(path, template);
    }

    if (subcommand === "open") {
      exec(`code ${path}`);
    }
  });
