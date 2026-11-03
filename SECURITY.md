# Security notes

**Trust label:** `educational-reference`

## What this package does not do

- No private keys, wallets, or signing
- No canvas or video playback of flashing content
- No medical or clinical clearance
- No WCAG area / red-flash measurement

## Host-product guidance

- Prefer failing closed with `clampFlashes` or a static alternative when `flashAllowed` is false.
- Pair with `wax-reduced-motion-dashboard` for preference-based motion reduction.
- Share URLs only encode flash counts / windows — not auth tokens.
- Do not market educational verdicts as “seizure-proof.”

## Supply-chain

Correctness is locked by pure unit tests (3/s boundary, clamp, ranges). Pin dependencies for any public deploy.
