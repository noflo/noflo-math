# @noflo/math

Math Components for [NoFlo](http://noflojs.org/)

This package provides components for mathematical operations in NoFlo
programs: arithmetic, comparison, ranges, and random numbers.

## Usage

Install the package:

    npm install @noflo/math

The components are then available under the `math/` namespace, for
example `math/Add` or `math/Compare`.

Components include:

- `Add`, `Subtract`, `Multiply`, `Divide`, `Modulo`, `Exponentiate` —
  binary arithmetic
- `Ceil`, `Floor`, `SendNumber` — number utilities
- `Compare` — route values by comparison operator
- `Accumulate`, `CountSum` — running sums
- `MapRange`, `Random`, `RangedRandomInt` — ranges and randomness
- `CalculateAngle`, `CalculateDistance` — point geometry
