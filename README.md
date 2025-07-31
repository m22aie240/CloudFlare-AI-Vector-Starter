# workers-ai-vector-starter

End‑to‑end demo: ingest text → embed via **Workers AI** → store in **Vectorize** → semantic search at the edge.

```bash
# local dev
npm i
wrangler dev
```

### Routes
| Method | Path      | Use                                   |
|--------|-----------|----------------------------------------|
| POST   | /ingest   | Body text → stored & embedded          |
| GET    | /search?q | Returns top‑k similar docs (JSON)      |

---
Roadmap
- PDF text extraction (pdf.js)
- Batch ingest via Curl
- Faceted search with metadata filters
