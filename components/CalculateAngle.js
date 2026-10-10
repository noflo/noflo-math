import { Component } from "@noflo/noflo";

/** @returns {import("@noflo/noflo").Component} The configured component */
export function getComponent() {
  const c = new Component({
    description: "Calculate the angle between two points",
    icon: "compass",
    inPorts: {
      origin: { datatype: "object", required: true },
      destination: { datatype: "object", required: true },
    },
    outPorts: {
      angle: { datatype: "int", required: true },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("origin", "destination")) {
      return;
    }
    const [origin, destination] = input.getData("origin", "destination");

    const deltaX = destination.x - origin.x;
    const deltaY = destination.y - origin.y;
    let angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI + 90;
    if (angle < 0) {
      angle += 360;
    }
    output.sendDone({ angle });
  });

  return c;
}
