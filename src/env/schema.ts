import { z } from "zod";

export const serverScheme = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  ENABLE_VC_BUILD: z.string().default("1").transform((v) => parseInt(v)),
  SITE_URL: z.string(),
  CLIENT_ID_GOOGLE: z.string(),
  CLIENT_SECRET_GOOGLE: z.string(),
});

export const clientScheme = z.object({
  MODE: z.enum(['development', 'production', 'test']).default('development'),
  VITE_SESSION_SECRET: z.string(),
});
