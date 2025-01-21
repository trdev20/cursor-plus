import { CommandGroup, generateCmdId } from "~/lib/ext";

const genMoveCmdId = (name: string) => generateCmdId({ group: "move", name });
const genSelectCmdId = (name: string) => generateCmdId({ group: "select", name });
const genDeleteCmdId = (name: string) => generateCmdId({ group: "delete", name });
const genInsertCmdId = (name: string) => generateCmdId({ group: "insert", name });
const genReorderCmdId = (name: string) => generateCmdId({ group: "reorder", name });
const genSwapCmdId = (name: string) => generateCmdId({ group: "swap", name });

export const cmdIds = {
  move: {
    lineStart: genMoveCmdId("lineStart"),
    textStart: genMoveCmdId("textStart"),
    textEnd: genMoveCmdId("textEnd"),
    lineEnd: genMoveCmdId("lineEnd"),
    upLineStart: genMoveCmdId("upLineStart"),
    upTextStart: genMoveCmdId("upTextStart"),
    upTextEnd: genMoveCmdId("upTextEnd"),
    upLineEnd: genMoveCmdId("upLineEnd"),
    downLineStart: genMoveCmdId("downLineStart"),
    downTextStart: genMoveCmdId("downTextStart"),
    downTextEnd: genMoveCmdId("downTextEnd"),
    downLineEnd: genMoveCmdId("downLineEnd"),
  },
  select: {
    lineStart: genSelectCmdId("lineStart"),
    textStart: genSelectCmdId("textStart"),
    textEnd: genSelectCmdId("textEnd"),
    lineEnd: genSelectCmdId("lineEnd"),
    upLineStart: genSelectCmdId("upLineStart"),
    upTextStart: genSelectCmdId("upTextStart"),
    upTextEnd: genSelectCmdId("upTextEnd"),
    upLineEnd: genSelectCmdId("upLineEnd"),
    downLineStart: genSelectCmdId("downLineStart"),
    downTextStart: genSelectCmdId("downTextStart"),
    downTextEnd: genSelectCmdId("downTextEnd"),
    downLineEnd: genSelectCmdId("downLineEnd"),
    line: genSelectCmdId("line"),
    upLine: genSelectCmdId("upLine"),
    downLine: genSelectCmdId("downLine"),
    text: genSelectCmdId("text"),
    upText: genSelectCmdId("upText"),
    downText: genSelectCmdId("downText"),
  },
  delete: {
    lineStart: genDeleteCmdId("lineStart"),
    textStart: genDeleteCmdId("textStart"),
    textEnd: genDeleteCmdId("textEnd"),
    lineEnd: genDeleteCmdId("lineEnd"),
    upLineStart: genDeleteCmdId("upLineStart"),
    upTextStart: genDeleteCmdId("upTextStart"),
    upTextEnd: genDeleteCmdId("upTextEnd"),
    upLineEnd: genDeleteCmdId("upLineEnd"),
    downLineStart: genDeleteCmdId("downLineStart"),
    downTextStart: genDeleteCmdId("downTextStart"),
    downTextEnd: genDeleteCmdId("downTextEnd"),
    downLineEnd: genDeleteCmdId("downLineEnd"),
    line: genDeleteCmdId("line"),
    upLine: genDeleteCmdId("upLine"),
    downLine: genDeleteCmdId("downLine"),
    entireLine: genDeleteCmdId("entireLine"),
    upEntireLine: genDeleteCmdId("upEntireLine"),
    downEntireLine: genDeleteCmdId("downEntireLine"),
    text: genDeleteCmdId("text"),
    upText: genDeleteCmdId("upText"),
    downText: genDeleteCmdId("downText"),
  },
  insert: {
    lineStart: genInsertCmdId("lineStart"),
    textStart: genInsertCmdId("textStart"),
    textEnd: genInsertCmdId("textEnd"),
    lineEnd: genInsertCmdId("lineEnd"),
    upLineStart: genInsertCmdId("upLineStart"),
    upTextStart: genInsertCmdId("upTextStart"),
    upTextEnd: genInsertCmdId("upTextEnd"),
    upLineEnd: genInsertCmdId("upLineEnd"),
    downLineStart: genInsertCmdId("downLineStart"),
    downTextStart: genInsertCmdId("downTextStart"),
    downTextEnd: genInsertCmdId("downTextEnd"),
    downLineEnd: genInsertCmdId("downLineEnd"),
  },
  reorder: {
    lines: genReorderCmdId("lines"),
    linesText: genReorderCmdId("linesText"),
    text: genReorderCmdId("text"),
    selections: genReorderCmdId("selections"),
  },
  swap: {
    lines: genSwapCmdId("lines"),
    linesText: genSwapCmdId("linesText"),
    text: genSwapCmdId("text"),
    direction: genSwapCmdId("direction"),
  },
  lastCmd: generateCmdId({ name: "lastCmd" }),
  runCommands: generateCmdId({ name: "runCommands" }),
} satisfies Record<CommandGroup, Record<string, string>> & {
  lastCmd: string;
  runCommands: string;
};
