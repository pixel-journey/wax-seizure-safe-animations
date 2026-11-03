export const FLASH_MYTHS = [
  {
    myth: "Passing this check means the animation is medically safe",
    reality:
      "Count-only educational gate inspired by WCAG 2.3.1 general flash. Area and red flash are not measured.",
  },
  {
    myth: "This plays or audits a real canvas",
    reality: "Pure integers. No frames are rendered by these helpers.",
  },
  {
    myth: "3 flashes per second is always fine for every user",
    reality:
      "It is a general threshold used in guidance; products should still offer reduced-motion paths.",
  },
] as const;

export const GLOSSARY = [
  {
    term: "flashAllowed",
    meaning: "Whether flashes in windowMs stay at ≤3 per second.",
  },
  {
    term: "maxFlashesInWindow",
    meaning: "floor(3 * windowMs / 1000).",
  },
  {
    term: "clampFlashes",
    meaning: "min(requested, max allowed in window).",
  },
] as const;
