import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    icon: "divide",
    inPorts: {
      dividend: { datatype: "number", required: true },
      divisor: { datatype: "number", control: true, required: true },
    },
    outPorts: {
      quotient: { datatype: "number" },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("dividend", "divisor")) {
      return;
    }
    const [dividend, divisor] = input.getData("dividend", "divisor");
    output.sendDone({ quotient: dividend / divisor });
  });

  return c;
}
