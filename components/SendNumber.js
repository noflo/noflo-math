import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    description: "Sends the number given on the number port when triggered",
    inPorts: {
      number: { datatype: "number", control: true, required: true },
      in: { datatype: "bang", required: true },
    },
    outPorts: {
      out: { datatype: "number", required: true },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("in", "number")) {
      return;
    }
    input.getData("in");
    const number = input.getData("number");

    output.sendDone({ out: number });
  });

  return c;
}
