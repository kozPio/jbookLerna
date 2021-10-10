#!/usr/bin/env node
import { program } from "commander";
import { serveComand } from "./commands/serve";


program
  .addCommand(serveComand);


  program.parse(process.argv)