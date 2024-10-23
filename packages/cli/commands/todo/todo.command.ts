import { Argument, Command, Option } from "commander";
import { join } from "path";
import { appendFile } from "fs/promises";
import { touchFile } from "../../utils";
import { DIARY_PATH } from "../../utils/paths.utils";
import { readFile } from "fs/promises";
import { exec } from "child_process";

export const AngelDailyTodo = new Command()
  .name("todo")
  .addArgument(new Argument("[text]", "text to add to todo"))
  .action(async (text) => {
    if (!text) return;
    const path = join(DIARY_PATH, "todos.md");
    await touchFile(path);

    if (text === "list") {
      const file = await readFile(path, "utf-8");
      console.log(file);
      return;
    }

    if (text === "open") {
      exec(`code ${path}`);
      return;
    }

    console.log(`Adding todo: ${text} at ${path}`);
    await appendFile(path, `- [ ] ${text}\n`);
  });
