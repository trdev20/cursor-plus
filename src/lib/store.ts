import { HideableMessage } from "~/config/schema/chunk";

type LastCmd = {
  command: string;
  args?: Record<string, unknown>;
};

type Store = {
  lastCmds: LastCmd[];
  hiddenMessages: HideableMessage[];
};

const store: Store = {
  lastCmds: [],
  hiddenMessages: [],
};

export default store;
