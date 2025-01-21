import * as vsc from "vscode";
import store from "../lib/store";
import { config } from "~/config";
import pickCommand from "~/utils/vsc/PickCommand";
import { generateCmdId } from "~/lib/ext";
import { CommandGroup } from "../lib/ext";
import { TextEditorCommandHandler } from "~/types";

export type RegisterCommandParams = {
  group: CommandGroup;
  command: string;
  handler: TextEditorCommandHandler;
};

export const registerCommand = ({ group, command, handler }: RegisterCommandParams) => {
  const { savedCommands } = config;

  const handlerWithHistory: TextEditorCommandHandler = (editor, edit, args) => {
    handler(editor, edit, args);
    if (savedCommands.includes(group)) {
      store.lastCmds = [{ command: command, args }];
    }
  };

  return vsc.commands.registerTextEditorCommand(command, handlerWithHistory);
};

export const registerWrapperCmd = (group: CommandGroup) => {
  const cmdId = generateCmdId({ group, name: "wrapper" });

  const handler: TextEditorCommandHandler = async (_editor, _edit, args) => {
    const cmdId = await pickCommand(group);
    if (!cmdId) return;
    await vsc.commands.executeCommand(cmdId, args);
  };

  const wrapperCmd = vsc.commands.registerTextEditorCommand(cmdId, handler);
  return wrapperCmd;
};
