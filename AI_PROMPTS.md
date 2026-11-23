# AI handoff — flash budget

## Non-negotiables

1. Allowed when `flashes * 1000 <= 3 * windowMs` (equality allowed).
2. `flashAllowed(4, 1000)` is false. `flashAllowed(3, 1000)` is true.
3. `clampFlashes(10, 1000) === 3`.
4. `maxFlashesInWindow(333) === 0`.
5. Nothing is animated. **Not a medical claim.**
6. Pack-opening canvas collapses excess to **1**, it does not clamp to 3. Do not merge the two policies.
7. Reduced-motion is a preference flag in a different lab.

## Prompt seeds

- "3 flashes in 1000 ms — allowed? 4?"
- "Window 333 ms — max flashes?"
- "Contrast clamp-to-3 here with collapse-to-1 on the pack canvas."

## Do not

- Claim WCAG conformance or medical safety from this integer check.
- Animate inside unit tests.
