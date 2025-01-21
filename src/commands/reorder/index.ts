import * as vsc from "vscode";

import reorderLinesCmd from "./lines";
import reorderLinesTextCmd from "./linesText";
import reorderSelectionsCmd from "./selections";
import reorderTextCmd from "./text";
import wrapperCmd from "./wrapper";

const reorderCmds: vsc.Disposable[] = [
  reorderLinesCmd,
  reorderLinesTextCmd,
  reorderSelectionsCmd,
  reorderTextCmd,
  wrapperCmd,
];

export default reorderCmds;
