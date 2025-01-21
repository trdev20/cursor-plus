import { z } from "zod";
import { optStrSchema, validateObject } from "./shared";
import { isObject } from "~/utils/js";

export const moveAliasesSchema = z
  .object({
    lineStart: optStrSchema,
    textStart: optStrSchema,
    textEnd: optStrSchema,
    lineEnd: optStrSchema,
    upLineStart: optStrSchema,
    upTextStart: optStrSchema,
    upTextEnd: optStrSchema,
    upLineEnd: optStrSchema,
    downLineStart: optStrSchema,
    downTextStart: optStrSchema,
    downTextEnd: optStrSchema,
    downLineEnd: optStrSchema,
  })
  .partial()
  .describe("Aliases for `cursorPlus.move.*` commands.");

export const insertAliasesSchema = moveAliasesSchema
  .extend({})
  .describe("Aliases for `cursorPlus.insert.*` commands.");

export const selectAliasesSchema = moveAliasesSchema
  .extend({
    line: optStrSchema,
    upLine: optStrSchema,
    downLine: optStrSchema,
    text: optStrSchema,
    upText: optStrSchema,
    downText: optStrSchema,
  })
  .partial()
  .describe("Aliases for `cursorPlus.select.*` commands.");

export const deleteAliasesSchema = selectAliasesSchema
  .extend({
    entireLine: optStrSchema,
    upEntireLine: optStrSchema,
    downEntireLine: optStrSchema,
  })
  .partial()
  .describe("Aliases for `cursorPlus.delete.*` commands.");

export const swapAliasesSchema = deleteAliasesSchema
  .extend({
    text: optStrSchema,
    lines: optStrSchema,
    direction: optStrSchema,
  })
  .partial()
  .describe("Aliases for `cursorPlus.swap.*` commands.");

export const reorderAliasesSchema = swapAliasesSchema
  .extend({
    text: optStrSchema,
    lines: optStrSchema,
    selections: optStrSchema,
  })
  .partial()
  .describe("Aliases for `cursorPlus.reorder.*` commands.");

export const globalAliasesSchema = deleteAliasesSchema
  .extend({
    ...swapAliasesSchema.shape,
    ...reorderAliasesSchema.shape,
  })
  .partial()
  .describe("Aliases for all commands.");

export const aliasesSchema = z
  .preprocess(
    validateObject,
    z
      .object({
        global: z.preprocess(validateObject, globalAliasesSchema.default({})),
        move: z.preprocess(validateObject, moveAliasesSchema.default({})),
        insert: z.preprocess(validateObject, insertAliasesSchema.default({})),
        select: z.preprocess(validateObject, selectAliasesSchema.default({})),
        delete: z.preprocess(validateObject, deleteAliasesSchema.default({})),
        swap: z.preprocess(validateObject, swapAliasesSchema.default({})),
        reorder: z.preprocess(validateObject, reorderAliasesSchema.default({})),
      })
      .default({}),
  )
  .describe("Aliases settings. Used when running a `cursorPlus.<group>.wrapper` command.");
