import { Component } from "@noflo/noflo";

/**
 * Accumulates numbers per scope. `reset` zeroes the counter; when
 * `emitreset` is set, the zeroed counter is emitted on reset.
 * @returns {import("@noflo/noflo").Component} The configured component
 */
export function getComponent() {
  const c = new Component({
    description: "Accumulate numbers coming from the input port",
    forwardBrackets: {},
    inPorts: {
      in: {
        datatype: "number",
        description: "Numbers to accumulate",
        required: true,
      },
      reset: {
        datatype: "bang",
        description: "Reset accumulation counter",
      },
      emitreset: {
        datatype: "boolean",
        description: "Whether to emit an output upon reset",
        control: true,
        default: false,
      },
    },
    outPorts: {
      out: {
        datatype: "number",
        required: true,
      },
    },
  });

  /** @type {Map<string, number>} */
  const counters = new Map();
  c.tearDown = async () => {
    counters.clear();
  };

  c.process((input, output) => {
    if (input.hasData("reset")) {
      input.getData("reset");
      counters.set(input.scope ?? "null", 0);
      let emitReset = false;
      if (input.hasData("emitreset")) {
        emitReset = input.getData("emitreset");
      }
      if (emitReset) {
        output.sendDone({ out: 0 });
        return;
      }
      output.done();
      return;
    }

    if (!input.hasData("in")) {
      return;
    }

    const key = input.scope ?? "null";
    const data = input.getData("in");
    const current = counters.get(key) ?? 0;
    const next = current + data;
    counters.set(key, next);

    output.sendDone({ out: next });
  });

  return c;
}
