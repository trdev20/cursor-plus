import * as vsc from "vscode";

import { cmdIds } from "~/commands/data";
import { CommandGroup } from "~/lib/ext";
import { config } from "~/config";
import { upperFirst } from "~/utils/js";

const camelToTitleCase = (str: string) => str.replace(/([A-Z])/g, " $1").replace(/^./, upperFirst);

const getAvailableCmds = (group: CommandGroup) => {
  return Object.entries(cmdIds[group]).map(([cmdName, cmdId]) => ({
    id: cmdId,
    title: camelToTitleCase(cmdName),
    alias: config.aliases[group][cmdName as never],
  }));
};

/**
 * Picks a command from a list of commands and returns the command ID.
 *
 * @param commands List of commands to pick from
 * @returns Command ID
 */

const pickCommand = async (group: CommandGroup) => {
  const commands = getAvailableCmds(group);

  const qpItems = commands.map((cmd) => ({
    label: cmd.title,
    description: cmd.alias,
  }));

  const getCmdId = () =>
    new Promise<string | null>((resolve) => {
      const qp = vsc.window.createQuickPick();
      qp.items = qpItems;
      qp.matchOnDescription = true;
      qp.title = `Pick a ${group} command`;
      qp.placeholder = "Type command alias to auto-select it.";
      qp.show();

      qp.onDidAccept(() => {
        const pickedCmdName = qp.selectedItems[0].label;
        const pickedCmdId = commands.find((cmd) => cmd.title === pickedCmdName)!.id;
        resolve(pickedCmdId);
        qp.dispose();
      });

      qp.onDidChangeValue((value) => {
        const selectedCmd = qp.items.find((item) => item.description === value);
        if (!selectedCmd) return;
        qp.selectedItems = [selectedCmd];
      });

      qp.onDidHide(() => {
        resolve(null);
        qp.dispose();
      });
    });

  const cmdId = await getCmdId();
  return cmdId;
};

export default pickCommand;
