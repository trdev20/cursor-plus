import * as vsc from "vscode";
import { cmdIds } from "../data";
import { reselectAfterReplace, selectionsAreEmpty } from "~/utils/vsc/vsc";
import { registerCommand } from "../utils";

const handler = async (editor: vsc.TextEditor) => {
  const doc = editor.document;

  const { selections } = editor;

  if (selectionsAreEmpty(selections)) return;

  await editor.edit((edit) => {
    selections.slice(0, Math.floor(selections.length / 2)).forEach(async (sel, selInd) => {
      const oppositeInd = selections.length - selInd - 1;

      const oppositeSel = selections[oppositeInd];

      const text = doc.getText(sel);
      const oppositeText = doc.getText(oppositeSel);

      edit.replace(sel, oppositeText);
      edit.replace(oppositeSel, text);
    });
  });

  reselectAfterReplace(selections, editor);
};

const swapTextCmd = registerCommand({
  group: "swap",
  command: cmdIds.swap.text,
  handler,
});

export default swapTextCmd;
