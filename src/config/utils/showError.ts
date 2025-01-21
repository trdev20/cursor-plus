import * as vsc from "vscode";
import store from "~/lib/store";
import { HideableMessage } from "../schema/chunk";

export type ShowErrorMessageProps = {
  config: vsc.WorkspaceConfiguration;
};

const message: string = "Failed to parse configuration! Please report!";
const targetMessage: HideableMessage = "config-error";

export const showParseFailMsg = async ({ config }: ShowErrorMessageProps) => {
  const isTempHidden = store.hiddenMessages.includes(targetMessage);
  const isPermHidden = config.get<HideableMessage[]>("hiddenMessages")?.includes(targetMessage);
  if (isTempHidden || isPermHidden) return;

  const action = await vsc.window.showErrorMessage(message, "Hide", "Don't show again");
  switch (action) {
    case "Hide": {
      store.hiddenMessages = [...store.hiddenMessages, "config-error"];
      break;
    }
    case "Don't show again": {
      config.update("hiddenMessages", [
        ...(config.get<HideableMessage[]>("hiddenMessages") ?? []),
        "config-error",
      ]);
      break;
    }
  }
};
