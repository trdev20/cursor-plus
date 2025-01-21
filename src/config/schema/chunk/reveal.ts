import { z } from "zod";
import { genNumberSchema as genNumSchema, validateObject } from "./shared";
import { isNumber, isObject } from "~/utils/js";

export const revealSchema = z
  .preprocess(
    validateObject,
    z
      .object({
        offset: genNumSchema(10).describe(
          "The minimum number of characters to reveal to the left.",
        ),
        threshold: genNumSchema(20).describe(
          "If cursor position is less than this value, it will reveal from line start.",
        ),
      })
      .default({}),
  )
  .describe("Reveal settings. Used when running a CursorPlus command that moves the cursor.");
