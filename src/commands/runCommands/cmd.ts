import * as vsc from "vscode";
import { cmdIds } from "../data";
import { TextEditorCommandHandler } from "~/types";
import store from "~/lib/store";
import { isString } from "~/utils/js";

type CommandData = {
  command: string;
  args?: Record<string, unknown>;
};

type Args = {
  commands: (string | CommandData)[];
};

const pickCommands = () =>
  new Promise<string[] | null>(async (res) => {
    const qp = vsc.window.createQuickPick();
    qp.title = "Pick commands";
    qp.items = (await vsc.commands.getCommands(true)).map((cmd) => ({ label: cmd }));
    qp.canSelectMany = true;
    qp.show();

    let hiddenByMe = false;

    qp.onDidAccept(() => {
      hiddenByMe = true;
      qp.hide();
      res(qp.selectedItems.map((item) => item.label));
    });

    qp.onDidHide(() => {
      if (!hiddenByMe) res(null);
      qp.dispose();
    });
  });

// const pickCommands = () => {
//   const _pickCommands = (commandsList: string[] = []) =>
//     new Promise<string[] | null>((res) => {
//       const inp = vsc.window.createInputBox();
//       inp.title = "Add command to the list. End with (.) to finish.";
//       inp.show();

//       let isHiddenByMe = false;

//       inp.onDidAccept(async () => {
//         if (isEmptyOrWhitespaces(inp.value)) {
//           inp.validationMessage = "Command cannot be empty";
//           return;
//         }
//         if (inp.value.endsWith(".")) {
//           commandsList.push(inp.value.slice(0, -1));
//           isHiddenByMe = true;
//           inp.hide();
//           res(commandsList);
//         } else {
//           commandsList.push(inp.value);
//           isHiddenByMe = true;
//           inp.hide();
//           res(await _pickCommands(commandsList));
//         }
//       });

//       inp.onDidHide(() => {
//         if (!isHiddenByMe) res(null);
//         inp.dispose();
//       });
//     });

//   return _pickCommands();
// };

const handler: TextEditorCommandHandler<Args> = async (_editor, _edit, args) => {
  const commands = args?.commands ?? (await pickCommands());
  if (!commands) return;

  for (const cmd of commands) {
    if (isString(cmd)) {
      await vsc.commands.executeCommand(cmd);
    } else {
      await vsc.commands.executeCommand(cmd.command, cmd.args);
    }
  }

  store.lastCmds = commands.map((command) => (isString(command) ? { command } : command));
};

const runCommands = vsc.commands.registerTextEditorCommand(cmdIds.runCommands, handler);

export default runCommands;
