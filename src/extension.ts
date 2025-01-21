import * as vsc from "vscode";
import commands from "./commands";

export function activate(context: vsc.ExtensionContext) {
  context.subscriptions.push(...commands);
}
