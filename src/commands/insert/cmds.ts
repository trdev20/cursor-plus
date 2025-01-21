import * as vsc from "vscode";
import { createInsertHandler } from "./handler";
import wrapperCmd from "./wrapper";
import { cmdIds } from "../data";
import { registerCommand } from "../utils";

const cmds: vsc.Disposable[] = [wrapperCmd];

for (const [location, id] of Object.entries(cmdIds.insert) as [
  keyof typeof cmdIds.insert,
  string,
][]) {
  const handler = createInsertHandler(location);
  const cmd = registerCommand({ group: "insert", command: id, handler });
  cmds.push(cmd);
}

export default cmds;
