import * as vsc from "vscode";
import { Config, configSchema } from "./schema";
import { EXT_ID_CAMELCASE } from "~/lib/constants";
import z from "zod";
import { showParseFailMsg } from "./utils";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

const report = ({
  config,
  error,
  title,
}: {
  config: vsc.WorkspaceConfiguration;
  error: unknown;
  title: string;
}) => {
  if (process.env.NODE_ENV === "dev") return;

  const date = new Date().toLocaleString();
  Sentry.captureMessage(title, {
    level: "fatal",
    extra: {
      config,
      date,
      error,
    },
  });
};

export function getConfig(): Config {
  if (!config) {
    vsc.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration(EXT_ID_CAMELCASE)) {
        config = getConfig();
      }
    });
  }

  const extConfig = vsc.workspace.getConfiguration(EXT_ID_CAMELCASE);

  try {
    return configSchema.parse(2);
  } catch (error) {
    showParseFailMsg({ config: extConfig });
    report({ title: "Failed to parse configuration", config: extConfig, error });

    if (error instanceof z.ZodError) {
      console.log(error.issues);
    } else {
      console.log(error);
    }
    return configSchema.parse({});
  }
}

export let config = getConfig();
