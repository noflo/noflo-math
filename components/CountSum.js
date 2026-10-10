import { Component } from "@noflo/noflo";

/**
 * Sums numbers coming from multiple inputs together. Per stream: when
 * consecutive packets share a connection index the running sum keeps
 * growing; on a connection change the accumulated sum is sent.
 * @returns {import("@noflo/noflo").Component} The configured component
 */
export function getComponent() {
  const c = new Component({
    description: "Sum numbers coming from multiple inputs together",
    forwardBrackets: {},
    inPorts: {
      in: { datatype: "number", addressable: true },
    },
    outPorts: {
      out: { datatype: "number" },
    },
  });

  c.process((input, output) => {
    const indexesWithStream = /** @type {number[]} */ (
      input.attached("in")
    ).filter((idx) => input.hasStream(["in", idx]));
    if (!indexesWithStream.length) {
      return;
    }

    const connection = ["in", indexesWithStream[0]];
    const stream = /** @type {import("@noflo/noflo").IP[]} */ (
      input.getStream(connection)
    ).filter((ip) => ip.type === "data");

    let sum = 0;
    /** @type {import("@noflo/noflo").IP|null} */
    let previous = null;
    for (const packet of stream) {
      sum += packet.data;

      // if the data is from the same port as the previous packet
      // send out just this packet's data
      if (packet.index === previous?.index) {
        output.send({ out: packet.data });
        sum = 0;
        // if they are from different ones, send out
        // then store this data for next iteration
      } else {
        output.send({ out: sum });
        sum = packet.data;
      }

      previous = packet;
    }

    output.done();
  });

  return c;
}
