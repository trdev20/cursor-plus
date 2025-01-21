import { z } from "zod";
import { isArray, isOneOf, uniqueArr } from "~/utils/js";

const validCmdsToSave = [
  "move",
  "select",
  "delete",
  "insert",
  "swap",
  "reorder",
  "runCommands",
] as const;

export const savedCommandsSchema = z
  .preprocess(
    (val) => {
      if (!isArray(val)) return;
      return uniqueArr(val as any).filter((item) => isOneOf(item, validCmdsToSave));
    },
    z.array(z.enum(validCmdsToSave)).default(["move", "select"]),
  )
  .describe("Commands to save so that they can be re-run again using `cursorPlus.last` command.");
