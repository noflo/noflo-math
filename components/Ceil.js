import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    icon: "arrow-up",
    description: "Round a number up",
    inPorts: {
      in: { datatype: "number", required: true },
    },
    outPorts: {
      out: { datatype: "int" },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("in")) {
      return;
    }
    const data = input.getData("in");
    output.sendDone({ out: Math.ceil(data) });
  });

  return c;
}
