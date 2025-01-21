import { cmdIds } from "../data";
import { registerCommand } from "../utils";
import { createLinesHandler } from "./shared";

const swapLinesCmd = registerCommand({
  group: "swap",
  command: cmdIds.swap.linesText,
  handler: createLinesHandler({ wholeLine: false }),
});

export default swapLinesCmd;
