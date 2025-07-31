import type { Env } from "./types";
import { embed } from "./embedding.ts";

export async function search(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? "";
  if (!q) return new Response("Missing q", { status: 400 });

  const vector = await embed(q, env);
  const topK = parseInt(env.TOP_K ?? "5");

  const results = await env.DOC_INDEX.query({
    topK,
    vector,
    includeMetadata: true,
  });

  return new Response(JSON.stringify(results), { headers: { "content-type": "application/json" } });
}
