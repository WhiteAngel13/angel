import { Command } from "commander";
import { join } from "path";
import { readFile } from "fs/promises";
import { writeFileSafe } from "../../utils";

export const AngelDailyCommand = new Command()
  .name("daily")
  .action(async () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const cwd = process.cwd();
    const path = join(
      cwd,
      "dailys",
      year.toString(),
      month.toString(),
      day.toString(),
      "daily.md"
    );
    const templatePath = join(__dirname, "daily.template.md");
    const template = await readFile(templatePath, "utf-8");

    await writeFileSafe(path, template);
  });
