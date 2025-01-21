import * as vsc from "vscode";

export type Options = {
  wholeLine: boolean;
};

const createLinesHandler =
  ({ wholeLine }: Options) =>
  async (editor: vsc.TextEditor) => {
    const doc = editor.document;

    const { selections } = editor;

    await editor.edit((edit) => {
      selections.slice(0, Math.floor(selections.length / 2)).forEach((sel, selInd) => {
        const oppositeInd = selections.length - selInd - 1;
        const oppositeSel = selections[oppositeInd];

        const validOppositeSel = new vsc.Selection(
          oppositeSel.start.line,
          wholeLine ? 0 : doc.lineAt(oppositeSel.start.line).firstNonWhitespaceCharacterIndex,
          oppositeSel.end.line,
          doc.lineAt(oppositeSel.end.line).text.length,
        );

        const validSel = new vsc.Selection(
          sel.start.line,
          wholeLine ? 0 : doc.lineAt(sel.start.line).firstNonWhitespaceCharacterIndex,
          sel.end.line,
          doc.lineAt(sel.end.line).text.length,
        );

        const text = doc.getText(validSel);
        const oppositeText = doc.getText(validOppositeSel);

        edit.replace(validSel, oppositeText);
        edit.replace(validOppositeSel, text);
      });
    });
  };

export default createLinesHandler;
