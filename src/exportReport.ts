export function exportFlashMarkdown(input: {
  flashes: string;
  windowMs: string;
  allowed: string;
  reason: string;
  maxFlashes: string;
  clamped: string;
}): string {
  return [
    "# Flash count policy (educational)",
    "",
    "> Count-only. Not medical clearance. No animation played.",
    "",
    `flashes: ${input.flashes}`,
    `windowMs: ${input.windowMs}`,
    `allowed: ${input.allowed}`,
    `reason: ${input.reason}`,
    `maxFlashes: ${input.maxFlashes}`,
    `clamped: ${input.clamped}`,
    "",
  ].join("\n");
}

export function downloadText(filename: string, content: string): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
