import * as vsc from "vscode";
import { selectionsAreEmpty } from "~/utils/vsc/vsc";
import { cmdIds } from "../data";
import { registerCommand } from "../utils";

const handler = (editor: vsc.TextEditor) => {
  const { selections } = editor;

  if (selectionsAreEmpty(selections)) return;

  editor.selections = selections.map((sel) => new vsc.Selection(sel.active, sel.anchor));
};

const swapDirectionCmd = registerCommand({
  group: "swap",
  command: cmdIds.swap.direction,
  handler,
});

export default swapDirectionCmd;
