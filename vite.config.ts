import solid from "solid-start/vite";
import dotenv from "dotenv";
import { defineConfig } from "vite";
import devtools from 'solid-devtools/vite'
// @ts-expect-error no typing
import vercel from "solid-start-vercel";

export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [
      devtools({
        name: true,
        componentLocation: true,
      }),
      solid({
        ssr: true,
        adapter: vercel({ edge: false })
      })
    ],
  };
});
