export const FLASH_MYTHS = [
  {
    myth: "Passing this helper means the animation is fully WCAG-safe",
    reality:
      "This is only the general flash *count* threshold (≤3/s). Area and red flash rules are separate.",
  },
  {
    myth: "This page plays flashing animations to test them",
    reality:
      "No animation is played. Pure arithmetic only.",
  },
  {
    myth: "Four flashes over two seconds is the same as four in one second",
    reality:
      "Rate depends on windowMs. 4 flashes in 2000 ms is at 2/s and is allowed by this count rule.",
  },
] as const;
