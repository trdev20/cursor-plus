import { EXT_ID_CAMELCASE } from "./constants";

export type CommandGroup = "move" | "select" | "insert" | "delete" | "swap" | "reorder";

export type GenerateCmdIdParams = {
  group?: CommandGroup;
  name: string;
};

export const generateCmdId = ({ group, name }: GenerateCmdIdParams) =>
  `${EXT_ID_CAMELCASE}.${group ? `${group}.` : ""}${name}`;
