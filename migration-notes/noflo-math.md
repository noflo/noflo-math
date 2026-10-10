# Migration notes: noflo-math → @noflo/math

Migrated 2026-10-09. 17 components, already JavaScript; converted to
ES modules and the 2.x Process API.

## Scope

- All 17 components converted; 21 `node:test` tests cover all of them.
  No fbp-spec cases: the behaviors are plain data-in/data-out, covered
  more precisely by direct tests.
- No third-party dependencies (only `@noflo/noflo`).

## 2.x compatibility findings

- **Bare-value `sendDone(number)` shorthand removed.** Accumulate,
  Ceil, Floor, MapRange, Modulo, Subtract, Exponentiate, and
  RangedRandomInt sent bare numbers in 1.x (interpreted against the
  single outport); the 2.x components send on the named port
  explicitly.
- **CountSum 1.x spec expectation unreproducible.** The 1.x spec
  expected `[1, 3, 5, 7]` for interleaved sends on two connections,
  but the 1.x component source's per-activation logic (stream taken
  from the first connected connection only, per-activation `sum`
  reset) cannot produce that sequence under any consistent 1.x stream
  interpretation we could construct. The ported component processes
  each complete stream with the same branch logic; the suite asserts
  the ported behavior (per-stream sums restarting on connection
  changes).
- Everything else (Accumulate per-scope counters, comparison operator
  routing, angle/distance math, range normalization) ported faithfully.
