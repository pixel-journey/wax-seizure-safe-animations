# Sources

| Source | Use |
| --- | --- |
| [WCAG 2.2 three flashes](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html) | Understanding document |
| [pack-opening canvas](https://github.com/pixel-journey/wax-seizure-safe-pack-opening-canvas) | Collapse excess to **1**, not clamp to 3 |
| [reduced-motion dashboard](https://github.com/pixel-journey/wax-reduced-motion-dashboard) | Preference flag, different product |
| [docs.wax.io](https://docs.wax.io/) | WAX context only |

## Product facts locked by tests

- Allowed when `flashes * 1000 <= 3 * windowMs` (equality allowed).
- `flashAllowed(4, 1000)` false; `(3, 1000)` true.
- `clampFlashes(10, 1000) === 3`.
- `maxFlashesInWindow(333) === 0`.
- Nothing is animated. Not a medical claim.
