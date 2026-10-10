import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    description: "Generate a random number in the given range.",
    icon: "random",
    inPorts: {
      in: { datatype: "bang", required: true },
      lower: {
        datatype: "number",
        description: "the lower bound",
        control: true,
      },
      upper: {
        datatype: "number",
        description: "the upper bound",
        control: true,
      },
    },
    outPorts: {
      out: { datatype: "number", required: true },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("in", "lower", "upper")) {
      return;
    }
    input.getData("in");
    let lower = input.getData("lower");
    let upper = input.getData("upper");

    // Math.random() returns a number between 0 (inclusive) and 1 (exclusive)
    lower = Math.min(lower, upper);
    upper = Math.max(lower, upper);
    const range = 0.5 + upper - lower;
    const value = lower + Math.random() * range;
    output.sendDone({ out: Math.floor(value) });
  });

  return c;
}
