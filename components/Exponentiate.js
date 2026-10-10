import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    icon: "caret-up",
    inPorts: {
      base: { datatype: "number", required: true },
      exponent: { datatype: "number", control: true, required: true },
    },
    outPorts: {
      out: { datatype: "number" },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("base", "exponent")) {
      return;
    }
    const [base, exponent] = input.getData("base", "exponent");
    output.sendDone({ out: base ** exponent });
  });

  return c;
}
