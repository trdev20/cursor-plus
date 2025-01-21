import { registerCommand } from "../utils";
import { cmdIds } from "../data";
import { createLinesHandler } from "./shared";

const reorderTextCmd = registerCommand({
  group: "reorder",
  command: cmdIds.reorder.lines,
  handler: createLinesHandler({ wholeLine: true }),
});

export default reorderTextCmd;
