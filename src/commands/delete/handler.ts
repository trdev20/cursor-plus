import * as vsc from "vscode";
import { cmdIds } from "../data";

type Location = keyof typeof cmdIds.delete;

type GetRangeParams = {
  doc: vsc.TextDocument;
  active: vsc.Position;
  location: Location;
};

const getRange = ({ doc, active, location }: GetRangeParams): vsc.Range | undefined => {
  const { line: activeLine } = active;

  const direction = location.startsWith("up") ? -1 : location.startsWith("down") ? 1 : 0;

  // Handle edge cases
  if (
    (activeLine === 0 && direction === -1) ||
    (activeLine === doc.lineCount - 1 && direction === 1)
  ) {
    return undefined;
  }

  const targetLine = activeLine + direction;
  const line = doc.lineAt(targetLine);

  const lastNonWhitespaceCharacterIndex = line.text.trimEnd().length;

  switch (location) {
    case "lineStart":
    case "upLineStart":
    case "downLineStart": {
      const targetPos = new vsc.Position(targetLine, 0);
      return new vsc.Range(active, targetPos);
    }

    case "textStart":
    case "upTextStart":
    case "downTextStart": {
      const targetPos = new vsc.Position(targetLine, line.firstNonWhitespaceCharacterIndex);
      return new vsc.Range(active, targetPos);
    }

    case "textEnd":
    case "upTextEnd":
    case "downTextEnd": {
      const targetPos = new vsc.Position(targetLine, lastNonWhitespaceCharacterIndex);
      return new vsc.Range(active, targetPos);
    }

    case "lineEnd":
    case "upLineEnd":
    case "downLineEnd": {
      const targetPos = new vsc.Position(targetLine, line.text.length);
      return new vsc.Range(active, targetPos);
    }

    case "line":
    case "upLine":
    case "downLine": {
      const start = new vsc.Position(targetLine, 0);
      const end = new vsc.Position(targetLine, line.text.length);
      return new vsc.Range(start, end);
    }

    case "entireLine":
    case "upEntireLine":
    case "downEntireLine": {
      const targetLineIsLastLine = targetLine === doc.lineCount - 1;
      if (targetLineIsLastLine) {
        const prevLine = targetLine - 1;
        const start = new vsc.Position(prevLine, doc.lineAt(prevLine).text.length);
        const end = new vsc.Position(targetLine, doc.lineAt(targetLine).text.length);
        return new vsc.Range(start, end);
      } else {
        const nextLine = targetLine + 1;
        const start = new vsc.Position(targetLine, 0);
        const end = new vsc.Position(nextLine, 0);
        return new vsc.Range(start, end);
      }
    }

    case "text":
    case "upText":
    case "downText": {
      const start = new vsc.Position(targetLine, line.firstNonWhitespaceCharacterIndex);
      const end = new vsc.Position(targetLine, line.text.length);
      return new vsc.Range(start, end);
    }
  }
};

export const createDeleteHandler = (location: Location) => {
  return async (editor: vsc.TextEditor) => {
    const doc = editor.document;

    const ranges: vsc.Range[] = [];
    for (const selection of editor.selections) {
      const { active } = selection;
      const range = getRange({ doc, active, location });
      if (range) ranges.push(range);
    }

    await editor.edit((edit) => {
      for (const range of ranges) {
        edit.delete(range);
      }
    });
  };
};
