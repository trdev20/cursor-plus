import { isArray, isOneOf, uniqueArr } from "~/utils/js";
import { z } from "zod";

export const hideableMessages = ["config-error"] as const;

export type HideableMessage = (typeof hideableMessages)[number];

export const hiddenMessagesSchema = z.preprocess(
  (val) => {
    if (!isArray(val)) return;
    return uniqueArr(val as any).filter((item) => isOneOf(item, hideableMessages));
  },
  z.array(z.enum(hideableMessages)).default([]),
);
