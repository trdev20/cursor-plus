import * as vsc from "vscode";

import moveCommands from "./move/cmds";
import selectCommands from "./select";
import last from "./last";
import insertCommands from "./insert";
import deleteCommands from "./delete";
import swapCmds from "./swap";
import reorderCmds from "./reorder";
import runCommands from "./runCommands";

const commands = [
  ...moveCommands,
  ...selectCommands,
  last,
  ...insertCommands,
  ...deleteCommands,
  ...swapCmds,
  ...reorderCmds,
  runCommands,
] as const satisfies vsc.Disposable[];

export default commands;
