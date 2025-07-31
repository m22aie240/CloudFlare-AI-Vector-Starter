import { describe, it, expect, vi } from "vitest";
import { ingest } from "../src/ingest";
import { search } from "../src/search";

const mockVector = Array(384).fill(0.1);
const mockEnv = {
  AI: { run: vi.fn().mockResolvedValue({ data: [mockVector] }) },
  DOC_INDEX: {
    data: new Map(),
    insert: vi.fn(async (rows) => {
      rows.forEach(r => mockEnv.DOC_INDEX.data.set(r.id, r));
    }),
    query: vi.fn(async () => ({ matches: [] }))
  }
} as any;

describe("ingest", () => {
  it("stores document and returns id", async () => {
    const res = await ingest(new Request("https://x", { method: "POST", body: "hello world" }), mockEnv);
    const body = await res.json();
    expect(body.id).toBeDefined();
    expect(mockEnv.DOC_INDEX.insert).toHaveBeenCalled();
  });
});

describe("search", () => {
  it("requires q param", async () => {
    const res = await search(new Request("https://x/search"), mockEnv);
    expect(res.status).toBe(400);
  });
});
