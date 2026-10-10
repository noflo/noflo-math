# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [2.0.0-alpha.1] - 2026-10-09

### Added

- The package is renamed to `@noflo/math`; graph component identifiers are unaffected and keep resolving under the `math/` namespace

### Changed

- All 17 components are converted to JavaScript ES modules for NoFlo 2.x (esm-only), with TypeScript-checked sources and Biome formatting
- Components follow the 2.x Process API contract: preconditions are checked with `has`/`hasData`/`hasStream` before any `get`/`getData` call
- Components that used the 1.x bare-value `sendDone(number)` shorthand now send on their named output port explicitly
- `Accumulate` keeps its per-scope counter in a Map cleared in async `tearDown`
- The typo'd port descriptions (`uppwer`, `reange`) are corrected

### Fixed

- Test suite rebuilt on `node:test` (21 tests) covering all 17 components, replacing the Mocha suite. The 1.x CountSum spec expectation (`[1, 3, 5, 7]` for interleaved sends) could not be reproduced from the 1.x component source's per-activation logic; the ported component's actual behavior — per-stream sums restarting on connection changes — is what the suite asserts
