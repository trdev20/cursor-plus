import * as vsc from "vscode";
import { config } from "~/config";
import { revealFirstSelection } from "~/utils/vsc/vsc";
import { cmdIds } from "../data";

type Location = keyof typeof cmdIds.move;

type GetPositionParams = {
  doc: vsc.TextDocument;
  activeLine: number;
  location: Location;
};

const getPosition = ({ doc, activeLine, location }: GetPositionParams): vsc.Position => {
  let direction = location.startsWith("up") ? -1 : location.startsWith("down") ? 1 : 0;

  const isFirstLine = activeLine === 0;
  const isLastLine = activeLine === doc.lineCount - 1;
  const isUp = direction === -1;
  const isDown = direction === 1;

  if ((isFirstLine && isUp) || (isLastLine && isDown)) {
    direction = 0;
  }

  const targetLine = activeLine + direction;

  const line = doc.lineAt(targetLine);
  const lastNonWhitespaceCharacterIndex = line.text.trimEnd().length;

  switch (location) {
    case "lineStart":
    case "upLineStart":
    case "downLineStart":
      return new vsc.Position(targetLine, 0);

    case "textStart":
    case "upTextStart":
    case "downTextStart":
      return new vsc.Position(targetLine, line.firstNonWhitespaceCharacterIndex);

    case "textEnd":
    case "upTextEnd":
    case "downTextEnd":
      return new vsc.Position(targetLine, lastNonWhitespaceCharacterIndex);

    case "lineEnd":
    case "upLineEnd":
    case "downLineEnd":
      return new vsc.Position(targetLine, line.text.length);
  }
};

export const createMoveHandler = (location: Location) => {
  return (editor: vsc.TextEditor) => {
    const doc = editor.document;

    editor.selections = editor.selections.map((selection) => {
      const pos = getPosition({
        doc,
        activeLine: selection.active.line,
        location,
      });
      return new vsc.Selection(pos, pos);
    });
    revealFirstSelection({ editor });
  };
};
