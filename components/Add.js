import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    icon: "plus",
    inPorts: {
      augend: { datatype: "number", required: true },
      addend: { datatype: "number", control: true, required: true },
    },
    outPorts: {
      sum: { datatype: "number" },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("augend", "addend")) {
      return;
    }
    const [augend, addend] = input.getData("augend", "addend");
    output.sendDone({ sum: Number(augend) + Number(addend) });
  });

  return c;
}
