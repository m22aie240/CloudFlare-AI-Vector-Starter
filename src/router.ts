import type { Env } from "./types";
import { ingest } from "./ingest";
import { search } from "./search";

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(req.url);
    if (req.method === "POST" && pathname === "/ingest") {
      return ingest(req, env);
    }
    if (req.method === "GET" && pathname === "/search") {
      return search(req, env);
    }
    return new Response("Not found", { status: 404 });
  }
} satisfies ExportedHandler<Env>;
