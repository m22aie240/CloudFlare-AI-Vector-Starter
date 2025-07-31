export interface Env {
  DOC_INDEX: VectorizeIndex;
  AI: Ai;
  MAX_TOKENS?: string;
  TOP_K?: string;
}

export interface DocVector {
  id: string;
  text: string;
  embedding: number[];
}
