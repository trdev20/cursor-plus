import * as vsc from "vscode";
import { config } from "~/config";
import { revealFirstSelection } from "~/utils/vsc/vsc";
import { cmdIds } from "../data";

type Location = keyof typeof cmdIds.select;

type GetRangeParams = {
  doc: vsc.TextDocument;
  activeLine: number;
  location: Location;
};

const getPosOrSelc = ({
  doc,
  activeLine,
  location,
}: GetRangeParams): vsc.Position | vsc.Selection => {
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

    case "line":
    case "upLine":
    case "downLine":
      return new vsc.Selection(
        new vsc.Position(targetLine, 0),
        new vsc.Position(targetLine, line.text.length),
      );

    case "text":
    case "upText":
    case "downText":
      return new vsc.Selection(
        new vsc.Position(targetLine, line.firstNonWhitespaceCharacterIndex),
        new vsc.Position(targetLine, line.text.length),
      );
  }
};

export const createSelectHandler = (location: Location) => {
  return (editor: vsc.TextEditor) => {
    const doc = editor.document;

    editor.selections = editor.selections.map((selection) => {
      const { active, anchor } = selection;
      const result = getPosOrSelc({ doc, activeLine: active.line, location });

      if (result instanceof vsc.Range) {
        return new vsc.Selection(result.start, result.end);
      }
      return new vsc.Selection(anchor, result);
    });

    revealFirstSelection({ editor });
  };
};
