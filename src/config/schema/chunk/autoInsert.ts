import { isArray, isNonEmptyString, isObject, isString, uniqueArr } from "~/utils/js";
import { z } from "zod";
import { genStrSchema, trueBoolSchema, validateObject } from "./shared";

const autoInsertItemSchema = z.preprocess(
  (val) => {
    if (!isArray(val)) return;
    return uniqueArr(val as any).filter(
      (item) =>
        isNonEmptyString(item) ||
        (isObject(item) && isNonEmptyString(item.text) && isNonEmptyString(item.alias)),
    );
  },
  z
    .array(
      z.union([
        z.string().describe("This text will be auto-inserted when typed."),
        z.object({
          text: z.string().describe("This text will be auto-inserted when its alias is typed."),
          alias: z.string().describe("This alias will be typed to trigger the auto-insert."),
        }),
      ]),
    )
    .default([]),
);

export const autoInsertSchema = z
  .preprocess(
    validateObject,
    z
      .object({
        enabled: trueBoolSchema.describe("Enable/Disable auto-select behavior."),
        escapeChar: genStrSchema("/").describe(
          "Start the text with this character to prevent any auto-select behavior.",
        ),
        global: autoInsertItemSchema.describe("Texts to auto-select for all insert commands."),
        lineStart: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.lineStart` command.",
        ),
        textStart: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.textStart` command.",
        ),
        textEnd: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.textEnd` command.",
        ),
        lineEnd: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.lineEnd` command.",
        ),
        upLineStart: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.upLineStart` command.",
        ),
        upTextStart: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.upTextStart` command.",
        ),
        upTextEnd: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.upTextEnd` command.",
        ),
        upLineEnd: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.upLineEnd` command.",
        ),
        downLineStart: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.downLineStart` command.",
        ),
        downTextStart: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.downTextStart` command.",
        ),
        downTextEnd: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.downTextEnd` command.",
        ),
        downLineEnd: autoInsertItemSchema.describe(
          "Texts to auto-select for `cursorPlus.insert.downLineEnd` command.",
        ),
      })
      .default({}),
  )
  .describe("Auto-select settings. Used when running a `cursorPlus.insert.*` command.");
