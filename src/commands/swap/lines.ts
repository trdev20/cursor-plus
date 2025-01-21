import { cmdIds } from "../data";
import { registerCommand } from "../utils";
import { createLinesHandler } from "./shared";

const swapLinesCmd = registerCommand({
  group: "swap",
  command: cmdIds.swap.lines,
  handler: createLinesHandler({ wholeLine: true }),
});

export default swapLinesCmd;
