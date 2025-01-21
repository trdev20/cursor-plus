import * as vsc from "vscode";
import { createMoveHandler } from "./handler";
import { registerCommand } from "../utils";
import wrapperCmd from "./wrapper";
import { cmdIds } from "../data";

const cmds: vsc.Disposable[] = [wrapperCmd];

for (const [location, id] of Object.entries(cmdIds.move) as [keyof typeof cmdIds.move, string][]) {
  const handler = createMoveHandler(location);
  const cmd = registerCommand({ group: "move", command: id, handler });
  cmds.push(cmd);
}

export default cmds;
