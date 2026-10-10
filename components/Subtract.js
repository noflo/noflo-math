import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    icon: "minus",
    inPorts: {
      minuend: { datatype: "number", required: true },
      subtrahend: { datatype: "number", control: true, required: true },
    },
    outPorts: {
      out: { datatype: "number" },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("minuend", "subtrahend")) {
      return;
    }
    const [minuend, subtrahend] = input.getData("minuend", "subtrahend");
    output.sendDone({ out: minuend - subtrahend });
  });

  return c;
}
