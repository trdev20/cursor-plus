import { cmdIds } from "../data";
import { registerCommand } from "../utils";
import { createLinesHandler } from "./shared";

const reorderLinesCmd = registerCommand({
  group: "reorder",
  command: cmdIds.reorder.linesText,
  handler: createLinesHandler({ wholeLine: false }),
});

export default reorderLinesCmd;
