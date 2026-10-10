import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    icon: "arrow-down",
    description: "Round a number down",
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
    output.sendDone({ out: Math.floor(data) });
  });

  return c;
}
