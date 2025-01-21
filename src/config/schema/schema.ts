import { z } from "zod";
import {
  aliasesSchema,
  revealSchema,
  autoInsertSchema,
  savedCommandsSchema,
  hiddenMessagesSchema,
} from "./chunk";

const configSchema = z
  .object({
    reveal: revealSchema,
    autoInsert: autoInsertSchema,
    savedCommands: savedCommandsSchema,
    aliases: aliasesSchema,
    hiddenMessages: hiddenMessagesSchema,
  })
  .default({});

export type Config = z.infer<typeof configSchema>;

export default configSchema;
