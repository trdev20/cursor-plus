import * as vsc from "vscode";

import swapDirectionCmd from "./direction";
import swapLinesCmd from "./lines";
import swapLinesTextCmd from "./linesText";
import swapTextCmd from "./text";

const swapCmds: vsc.Disposable[] = [swapDirectionCmd, swapLinesCmd, swapLinesTextCmd, swapTextCmd];

export default swapCmds;
