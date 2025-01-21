import * as vsc from "vscode";
import { createSelectHandler } from "./handler";
import { registerCommand } from "../utils";
import wrapperCmd from "./wrapper";
import { cmdIds } from "../data";

const cmds: vsc.Disposable[] = [wrapperCmd];

for (const [location, id] of Object.entries(cmdIds.select) as [
  keyof typeof cmdIds.select,
  string,
][]) {
  const handler = createSelectHandler(location);
  const cmd = registerCommand({ group: "select", command: id, handler });
  cmds.push(cmd);
}

export default cmds;
