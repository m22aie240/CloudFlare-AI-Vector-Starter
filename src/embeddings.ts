import type { Env } from "./types";

export async function embed(text: string, env: Env): Promise<number[]> {
  const resp = await env.AI.run("@cf/baai/bge-small-en-v1.5", {
    text,
  });
  return resp.data[0]; // embedding vector
}
