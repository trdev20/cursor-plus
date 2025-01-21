import * as vsc from "vscode";
import store from "~/lib/store";

const handler = async () => {
  const { lastCmds } = store;
  if (!lastCmds.length) return;

  for (const { command: id, args } of lastCmds) {
    await vsc.commands.executeCommand(id, args);
  }

  store.lastCmds = lastCmds;
};

export default handler;
