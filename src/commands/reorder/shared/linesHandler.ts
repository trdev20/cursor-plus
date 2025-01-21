import * as vsc from "vscode";

import { selectionsAreSorted, sortSelections } from "~/utils/vsc/vsc";

export type Options = {
  wholeLine: boolean;
};

const createLinesHandler =
  ({ wholeLine }: Options) =>
  async (editor: vsc.TextEditor) => {
    const doc = editor.document;

    const { selections } = editor; // selections order: first to create to last

    if (selectionsAreSorted(selections)) return;

    const sortedSelections = sortSelections(selections);

    await editor.edit((edit) => {
      selections.forEach((sel, ind) => {
        const lineRange = new vsc.Range(
          sel.start.line,
          wholeLine ? 0 : doc.lineAt(sel.start.line).firstNonWhitespaceCharacterIndex,
          sel.end.line,
          doc.lineAt(sel.end.line).text.length,
        );
        const lineText = doc.getText(lineRange);
        const sortedSelection = sortedSelections[ind];
        const replaceRange = new vsc.Range(
          sortedSelection.start.line,
          wholeLine ? 0 : doc.lineAt(sortedSelection.start.line).firstNonWhitespaceCharacterIndex,
          sortedSelection.end.line,
          doc.lineAt(sortedSelection.end.line).text.length,
        );
        edit.replace(replaceRange, lineText);
      });
    });

    editor.selections = sortSelections(editor.selections);
  };

export default createLinesHandler;
