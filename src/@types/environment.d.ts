export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: number;
      API_SECRET: string;
      DATABASE_URL: string;
    }
  }
}