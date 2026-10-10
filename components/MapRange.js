import { Component } from "@noflo/noflo";

/**
 * Maps a number from a source range to a target range. Range bounds
 * are normalized so inverted inputs behave like sorted ones.
 * @returns {import("@noflo/noflo").Component} The configured component
 */
export function getComponent() {
  const c = new Component({
    description: "Map a number from a source range to a target range.",
    icon: "reorder",
    inPorts: {
      in: { datatype: "number", required: true },
      in_lower: {
        datatype: "number",
        description: "the lower bound of the input value",
        control: true,
        required: true,
      },
      in_upper: {
        datatype: "number",
        description: "the upper bound of the input value",
        control: true,
        required: true,
      },
      out_lower: {
        datatype: "number",
        description: "the lower bound of the output value",
        control: true,
        required: true,
      },
      out_upper: {
        datatype: "number",
        description: "the upper bound of the output value",
        control: true,
        required: true,
      },
    },
    outPorts: {
      out: { datatype: "number" },
    },
  });

  c.process((input, output) => {
    if (
      !input.hasData("in", "in_lower", "in_upper", "out_upper", "out_lower")
    ) {
      return;
    }

    const data = input.getData("in");
    const inLowerData = input.getData("in_lower");
    const inUpperData = input.getData("in_upper");
    const outUpperData = input.getData("out_upper");
    const outLowerData = input.getData("out_lower");

    const inLower = Math.min(inLowerData, inUpperData);
    const inUpper = Math.max(inLowerData, inUpperData);
    const inRange = inUpper - inLower;
    const outLower = Math.min(outLowerData, outUpperData);
    const outUpper = Math.max(outLowerData, outUpperData);
    const outRange = outUpper - outLower;
    const value = outLower + ((data - inLower) * outRange) / inRange;
    output.sendDone({ out: value });
  });

  return c;
}
