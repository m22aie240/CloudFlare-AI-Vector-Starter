import type { Env } from "./types";
import { embed } from "./embedding";

export async function ingest(req: Request, env: Env): Promise<Response> {
  let text: string;
  const ct = req.headers.get("content-type") ?? "";

  if (ct.includes("application/pdf")) {
    // For brevity: treat PDF as unsupported in skeleton
    return new Response("PDF ingest TODO", { status: 415 });
  }
  text = await req.text();
  if (!text) return new Response("Empty body", { status: 400 });

  // Truncate to MAX_TOKENS tokens
  const maxTokens = parseInt(env.MAX_TOKENS ?? "512");
  const trimmed = text.split(/\s+/).slice(0, maxTokens).join(" ");

  const vector = await embed(trimmed, env);
  const id = crypto.randomUUID();

  await env.DOC_INDEX.insert([{ id, values: vector, metadata: { text: trimmed } }]);
  return new Response(JSON.stringify({ id }), { headers: { "content-type": "application/json" } });
}
