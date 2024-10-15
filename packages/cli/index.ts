#!/usr/bin/env bun
import { Command } from "commander";
import * as Commands from "./commands";

const angel = new Command();

for (const command of Object.values(Commands)) {
  angel.addCommand(command);
}

angel.parse(process.argv);
