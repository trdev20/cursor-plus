// env
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "dev" | undefined;
    SENTRY_DSN: string;
  }
}
