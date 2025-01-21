import * as vsc from "vscode";

import {
  reselectAfterReplace,
  selectionsAreEmpty,
  selectionsAreSorted,
  sortSelections,
} from "~/utils/vsc/vsc";
import { registerCommand } from "../utils";
import { cmdIds } from "../data";

const handler = async (editor: vsc.TextEditor) => {
  const doc = editor.document;
  const { selections } = editor;

  if (selectionsAreEmpty(selections) || selectionsAreSorted(selections)) return;

  const sortedSelections = sortSelections(selections);

  await editor.edit((edit) => {
    selections.forEach((sel, ind) => {
      const text = doc.getText(sel);
      const replaceRange = sortedSelections[ind];
      edit.replace(replaceRange, text);
    });
  });

  reselectAfterReplace(selections, editor);

  sortSelections(editor);
};

const reorderTextCmd = registerCommand({ group: "reorder", command: cmdIds.reorder.text, handler });

export default reorderTextCmd;
