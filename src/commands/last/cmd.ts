import * as vsc from "vscode";
import { cmdIds } from "../data";
import handler from "./handler";

const lastCmd = vsc.commands.registerTextEditorCommand(cmdIds.lastCmd, handler);

export default lastCmd;
