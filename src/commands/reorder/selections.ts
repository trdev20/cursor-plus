import * as vsc from "vscode";
import { sortSelections } from "~/utils/vsc/vsc";
import { registerCommand } from "../utils";
import { cmdIds } from "../data";

const handler = async (editor: vsc.TextEditor) => {
  sortSelections(editor);
};

const reorderSelectionsCmd = registerCommand({
  group: "reorder",
  command: cmdIds.reorder.selections,
  handler,
});

export default reorderSelectionsCmd;
