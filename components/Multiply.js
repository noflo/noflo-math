import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    icon: "times",
    inPorts: {
      multiplicand: { datatype: "number", required: true },
      multiplier: { datatype: "number", control: true, required: true },
    },
    outPorts: {
      product: { datatype: "number" },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("multiplicand", "multiplier")) {
      return;
    }
    const [multiplicand, multiplier] = input.getData(
      "multiplicand",
      "multiplier",
    );
    output.sendDone({ product: multiplicand * multiplier });
  });

  return c;
}
