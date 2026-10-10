import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    icon: "random",
    description: "Generate a random number between 0 and 1",
    inPorts: {
      in: { datatype: "bang" },
    },
    outPorts: {
      out: { datatype: "number", required: true },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("in")) {
      return;
    }
    input.getData("in");
    output.sendDone({ out: Math.random() });
  });

  return c;
}
