import * as vsc from "vscode";
import { createDeleteHandler } from "./handler";
import wrapperCmd from "./wrapper";
import { cmdIds } from "../data";
import { registerCommand } from "../utils";

const cmds: vsc.Disposable[] = [wrapperCmd];

for (const [location, id] of Object.entries(cmdIds.delete) as [
  keyof typeof cmdIds.delete,
  string,
][]) {
  const handler = createDeleteHandler(location);
  const cmd = registerCommand({ group: "delete", command: id, handler });
  cmds.push(cmd);
}

export default cmds;
