import * as vsc from "vscode";

export type TextEditorCommandHandler<
  Args extends Record<string, unknown> = Record<string, unknown>,
> = (editor: vsc.TextEditor, edit: vsc.TextEditorEdit, args?: Args) => void;
