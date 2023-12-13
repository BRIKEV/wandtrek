export {};
declare global {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
  }
  interface Process {
    env: ProcessEnv;
  }
  let process: Process;
}
