# Education — at most three flashes a second, then clamp

> **Rung:** `npm test` passes. Nothing is animated. This is a count. It does not measure area, brightness, or red. It is not a medical claim and not a WCAG conformance test.  
> **The test is the rule.** The understanding document is [WCAG 2.2 three flashes](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html). A different lab collapses the same excess to one reveal instead of clamping to three: [wax-seizure-safe-pack-opening-canvas](https://github.com/pixel-journey/wax-seizure-safe-pack-opening-canvas).

## Predict, then run

Allowed when `flashes * 1000 <= 3 * windowMs`. The equal case is allowed.

| Call | Locked result |
| --- | --- |
| `flashAllowed(3, 1000)` | allowed |
| `flashAllowed(4, 1000)` | not allowed |
| `flashAllowed(3, 500)` | not allowed |
| `flashAllowed(0, 1000)` | allowed. Zero flashes is fine. |
| `flashAllowed(6, 2000)` | allowed |
| `flashAllowed(7, 2000)` | not allowed |
| `maxFlashesInWindow(1000)` | `3` |
| `maxFlashesInWindow(2000)` | `6` |
| `maxFlashesInWindow(333)` | `0`. `floor(3 * 333 / 1000)` is `0`. A window shorter than 334 ms allows no flashes. |
| `clampFlashes(10, 1000)` | `3` |
| `clampFlashes(2, 1000)` | `2` |

The pack-opening lab does not clamp 4 reveals to 3. It sets `shown` to `1`. Do not mix the two functions.

The HTTP examples include an Atomic Packs `unboxassets` row. That request is unsent, and it is not this count.
