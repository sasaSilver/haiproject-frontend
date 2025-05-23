import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  client: {
    NEXT_PUBLIC_OMDB_KEY: z.string(),
    NEXT_PUBLIC_API_BASE_URL: z.string().url().default("http://localhost:8000"),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_OMDB_KEY: process.env.NEXT_PUBLIC_OMDB_KEY,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  
  emptyStringAsUndefined: true,
});
