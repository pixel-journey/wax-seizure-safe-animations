export type ShareState = { flashes: string; windowMs: string };

export function encodeShareState(s: ShareState): string {
  const q = new URLSearchParams();
  q.set("f", s.flashes);
  q.set("w", s.windowMs);
  return q.toString();
}

export function decodeShareState(search: string): Partial<ShareState> {
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const out: Partial<ShareState> = {};
  if (q.has("f")) out.flashes = q.get("f") ?? undefined;
  if (q.has("w")) out.windowMs = q.get("w") ?? undefined;
  return out;
}
