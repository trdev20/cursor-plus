import * as vsc from "vscode";
import { config } from "~/config/config";
import { cmdIds } from "../data";
import { isOneOf, isString } from "~/utils/js";

type Location = keyof typeof cmdIds.insert;

type GetPositionParams = {
  doc: vsc.TextDocument;
  activeLine: number;
  location: Location;
};

const getPosition = ({
  doc,
  activeLine,
  location,
}: GetPositionParams): vsc.Position | undefined => {
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

const getText = async (location: Location) =>
  new Promise<string>((resolve) => {
    const inp = vsc.window.createInputBox();
    inp.title = `Insert At ${location}`;
    inp.placeholder = "Text to insert";
    inp.show();

    const { enabled, escapeChar, global, ...locationSpecific } = config.autoInsert;

    const validateValue = (value: string) =>
      value
        // Remove the escape character
        .replace(new RegExp(`^${escapeChar}`), "")
        // Replace escaped new lines with actual new lines
        .replace(/(?<=(?<=(?<!\\)(?:\\{2})*))\\n/g, "\n")
        // Replace escaped new lines with actual new lines
        .replace(/(?<=(?<=(?<!\\)(?:\\{2})*))\\t/g, "\t")
        // Replace escaped escape characters with a single escape characters
        .replace(/(?<=(?<=(?<!\\)(?:\\{2})*))\\\\/g, "\\");

    if (enabled) {
      inp.onDidChangeValue((value) => {
        if (value.startsWith(escapeChar)) return;

        // Check location-specific autoPick values
        const locationValue = locationSpecific[location]?.find(
          (item) => value === (isString(item) ? item : item.alias),
        );
        if (locationValue) {
          const text = isString(locationValue) ? locationValue : locationValue.text;
          resolve(text);
          inp.dispose();
          return;
        }

        // Check global autoPick values
        const globalValue = global?.find((item) => value === (isString(item) ? item : item.alias));
        if (globalValue) {
          const text = isString(globalValue) ? globalValue : globalValue.text;
          resolve(text);
          inp.dispose();
          return;
        }
      });
    }

    inp.onDidAccept(() => {
      resolve(validateValue(inp.value));
      inp.dispose();
    });
  });

const validNextCommands = ["insertLineBreak", "insertLineBefore", "insertLineAfter"] as const;

type NextCommand = (typeof validNextCommands)[number];

const insertLine = ({
  edit,
  pos,
  doc,
  target,
}: {
  edit: vsc.TextEditorEdit;
  pos: vsc.Position;
  doc: vsc.TextDocument;
  target: NextCommand;
}) => {
  const whitespacesCount = doc.lineAt(pos.line).firstNonWhitespaceCharacterIndex;
  const tabWidth = vsc.workspace.getConfiguration("editor").get<number>("tabSize") ?? 4;
  if (target === "insertLineBreak") {
    edit.insert(pos, `\n${" ".repeat(whitespacesCount + tabWidth)}`);
    edit.insert(pos, `\n${" ".repeat(whitespacesCount)}`);
    return;
  }

  const directionNum = target === "insertLineBefore" ? -1 : 0;
  const insertLine = pos.line + directionNum;
  const insertPos = new vsc.Position(insertLine, doc.lineAt(insertLine).text.length);
  const newLineText = `\n${" ".repeat(whitespacesCount)}`;

  edit.insert(insertPos, newLineText);
};

const moveSelAfterInsert = (editor: vsc.TextEditor, doc: vsc.TextDocument, target: NextCommand) => {
  const directionNum = target === "insertLineBefore" ? -1 : target === "insertLineAfter" ? 1 : 0;

  editor.selections = editor.selections.map((sel) => {
    if (directionNum === 0) {
      const targetLine = sel.active.line - 1;
      const pos = new vsc.Position(targetLine, doc.lineAt(targetLine).text.length);
      return new vsc.Selection(pos, pos);
    }

    // If the selection.active is at the end of the line, inserting a new line will move it to the next line automatically
    if (sel.active.character === doc.lineAt(sel.active).text.length && directionNum === 1) {
      return sel;
    }
    const newPos = new vsc.Position(
      sel.active.line + directionNum,
      doc.lineAt(sel.active).text.length,
    );
    return new vsc.Selection(newPos, newPos);
  });
};

export const createInsertHandler = (location: Location) => {
  return async (
    editor: vsc.TextEditor,
    _edit: vsc.TextEditorEdit, // unused
    args?: { text?: string; nextCommand?: NextCommand },
  ) => {
    const isValidNextCommand = isOneOf(args?.nextCommand, validNextCommands);

    const doc = editor.document;

    const positions: { ogPos: vsc.Position; insertPos: vsc.Position }[] = [];

    for (const selection of editor.selections) {
      const { active } = selection;
      const insertPos = getPosition({ doc, activeLine: active.line, location });
      if (insertPos) positions.push({ ogPos: active, insertPos });
    }

    const text = args?.text ?? (await getText(location));

    await editor.edit((edit) => {
      for (const { ogPos, insertPos } of positions) {
        edit.insert(insertPos, text);
        if (isValidNextCommand) {
          insertLine({ edit, pos: ogPos, doc, target: args.nextCommand! });
        }
      }
    });

    if (isValidNextCommand) {
      moveSelAfterInsert(editor, doc, args.nextCommand!);
    }
  };
};
