import { Argument, Command } from "commander";
import { join } from "path";
import { appendFile } from "fs/promises";
import { touchFile } from "../../utils";
import { DIARY_PATH } from "../../utils/paths.utils";

export const AngelDailyTodo = new Command()
  .name("todo")
  .addArgument(new Argument("[text]", "text to add to todo"))
  .action(async (text) => {
    if (!text) return;
    const path = join(DIARY_PATH, "todos.md");
    await touchFile(path);
    await appendFile(path, `- [ ] ${text}\n`);
  });
