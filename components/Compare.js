import { Component } from "@noflo/noflo";

/**
 * Compares two numbers with the configured operator, routing the value
 * to `pass` or `fail`. Unknown operators fail the activation.
 * @returns {import("@noflo/noflo").Component} The configured component
 */
export function getComponent() {
  const c = new Component({
    description: "Compare two numbers",
    icon: "check",
    forwardBrackets: {
      value: ["pass"],
      comparison: ["pass"],
      operator: ["pass"],
    },
    inPorts: {
      value: { datatype: "number", required: true },
      comparison: { datatype: "number", required: true },
      operator: {
        datatype: "string",
        control: true,
        default: "==",
      },
    },
    outPorts: {
      pass: { datatype: "number" },
      fail: { datatype: "number" },
    },
  });

  c.process((input, output) => {
    if (!input.hasData("value", "comparison")) {
      return;
    }

    const value = input.getData("value");
    const comparison = input.getData("comparison");
    const operator = input.getData("operator") || "==";

    switch (operator) {
      case "eq":
      case "==":
        if (value === comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      case "ne":
      case "!=":
        if (value !== comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      case "gt":
      case ">":
        if (value > comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      case "lt":
      case "<":
        if (value < comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      case "ge":
      case ">=":
        if (value >= comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      case "le":
      case "<=":
        if (value <= comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      default: {
        // Unknown comparison is a fail
        output.done(new Error(`Unknown comparison: ${operator}`));
        return;
      }
    }
    output.sendDone({ fail: value });
  });

  return c;
}
