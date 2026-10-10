import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    description: "Calculate the distance between two points",
    icon: "arrow-right",
    inPorts: {
      origin: { datatype: "object", required: true },
      destination: { datatype: "object", required: true },
    },
    outPorts: {
      distance: { datatype: "int", required: true },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("origin", "destination")) {
      return;
    }
    const [origin, destination] = input.getData("origin", "destination");

    const deltaX = destination.x - origin.x;
    const deltaY = destination.y - origin.y;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    output.sendDone({ distance });
  });

  return c;
}
