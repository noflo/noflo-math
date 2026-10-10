import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as noflo from "@noflo/noflo";

import { getComponent as getAccumulate } from "../components/Accumulate.js";
import { getComponent as getAdd } from "../components/Add.js";
import { getComponent as getCalculateAngle } from "../components/CalculateAngle.js";
import { getComponent as getCalculateDistance } from "../components/CalculateDistance.js";
import { getComponent as getCeil } from "../components/Ceil.js";
import { getComponent as getCompare } from "../components/Compare.js";
import { getComponent as getCountSum } from "../components/CountSum.js";
import { getComponent as getDivide } from "../components/Divide.js";
import { getComponent as getExponentiate } from "../components/Exponentiate.js";
import { getComponent as getFloor } from "../components/Floor.js";
import { getComponent as getMapRange } from "../components/MapRange.js";
import { getComponent as getModulo } from "../components/Modulo.js";
import { getComponent as getMultiply } from "../components/Multiply.js";
import { getComponent as getRandom } from "../components/Random.js";
import { getComponent as getRangedRandomInt } from "../components/RangedRandomInt.js";
import { getComponent as getSendNumber } from "../components/SendNumber.js";
import { getComponent as getSubtract } from "../components/Subtract.js";

/**
 * Drives a component: sends the given port/value pairs, returns the
 * first data value seen on the first out-port (or the collected values).
 * @param {import("@noflo/noflo").Component} component
 * @param {Record<string, unknown>} inputs
 * @param {string} outPort
 * @returns {Promise<unknown[]>}
 */
const drive = async (component, inputs, outPort) => {
  const outSocket = noflo.internalSocket.createSocket();
  component.outPorts[outPort].attach(outSocket);
  /** @type {unknown[]} */
  const values = [];
  outSocket.addEventListener(
    "ip",
    /** @param {CustomEvent} event */ (event) => {
      if (event.detail.type === "data") {
        values.push(event.detail.data);
      }
    },
  );
  for (const [port, value] of Object.entries(inputs)) {
    const socket = noflo.internalSocket.createSocket();
    component.inPorts[port].attach(socket);
    socket.post(new noflo.IP("data", value));
  }
  // Allow the synchronous burst to settle
  await new Promise((resolve) => setTimeout(resolve, 20));
  return values;
};

describe("Arithmetic components", () => {
  it("Add sums augend and addend", async () => {
    const values = await drive(getAdd(), { augend: 2, addend: 5 }, "sum");
    assert.deepEqual(values, [7]);
  });

  it("Subtract subtracts the subtrahend", async () => {
    const values = await drive(
      getSubtract(),
      { minuend: 2, subtrahend: 5 },
      "out",
    );
    assert.deepEqual(values, [-3]);
  });

  it("Multiply multiplies", async () => {
    const values = await drive(
      getMultiply(),
      { multiplicand: 2, multiplier: 5 },
      "product",
    );
    assert.deepEqual(values, [10]);
  });

  it("Divide divides", async () => {
    const values = await drive(
      getDivide(),
      { dividend: 5, divisor: 2 },
      "quotient",
    );
    assert.deepEqual(values, [2.5]);
  });

  it("Modulo computes the remainder", async () => {
    const values = await drive(getModulo(), { dividend: 5, divisor: 2 }, "out");
    assert.deepEqual(values, [1]);
  });

  it("Exponentiate raises base to exponent", async () => {
    const values = await drive(
      getExponentiate(),
      { base: 2, exponent: 5 },
      "out",
    );
    assert.deepEqual(values, [32]);
  });

  it("Ceil rounds up", async () => {
    const values = await drive(getCeil(), { in: 2.9 }, "out");
    assert.deepEqual(values, [3]);
  });

  it("Floor rounds down", async () => {
    const values = await drive(getFloor(), { in: 2.9 }, "out");
    assert.deepEqual(values, [2]);
  });
});

describe("Comparison component", () => {
  it("routes equal values to pass with the default operator", async () => {
    const c = getCompare();
    const passSocket = noflo.internalSocket.createSocket();
    const failSocket = noflo.internalSocket.createSocket();
    c.outPorts.pass.attach(passSocket);
    c.outPorts.fail.attach(failSocket);
    /** @type {unknown[]} */
    const passed = [];
    /** @type {unknown[]} */
    const failed = [];
    passSocket.addEventListener(
      "ip",
      /** @param {CustomEvent} event */ (event) => {
        if (event.detail.type === "data") {
          passed.push(event.detail.data);
        }
      },
    );
    failSocket.addEventListener(
      "ip",
      /** @param {CustomEvent} event */ (event) => {
        if (event.detail.type === "data") {
          failed.push(event.detail.data);
        }
      },
    );
    const value = noflo.internalSocket.createSocket();
    const comparison = noflo.internalSocket.createSocket();
    c.inPorts.value.attach(value);
    c.inPorts.comparison.attach(comparison);
    value.post(new noflo.IP("data", 42));
    comparison.post(new noflo.IP("data", 42));
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.deepEqual(passed, [42]);
    assert.deepEqual(failed, []);
  });

  it("routes lower values to fail with the lt operator", async () => {
    const c = getCompare();
    const failSocket = noflo.internalSocket.createSocket();
    c.outPorts.fail.attach(failSocket);
    /** @type {unknown[]} */
    const failed = [];
    failSocket.addEventListener(
      "ip",
      /** @param {CustomEvent} event */ (event) => {
        if (event.detail.type === "data") {
          failed.push(event.detail.data);
        }
      },
    );
    const value = noflo.internalSocket.createSocket();
    const comparison = noflo.internalSocket.createSocket();
    const operator = noflo.internalSocket.createSocket();
    c.inPorts.value.attach(value);
    c.inPorts.comparison.attach(comparison);
    c.inPorts.operator.attach(operator);
    operator.post(new noflo.IP("data", "lt"));
    value.post(new noflo.IP("data", 42));
    comparison.post(new noflo.IP("data", 42));
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.deepEqual(failed, [42]);
  });
});

describe("Point components", () => {
  it("CalculateAngle returns 180 straight down", async () => {
    const values = await drive(
      getCalculateAngle(),
      { origin: { x: 0, y: 0 }, destination: { x: 0, y: 1 } },
      "angle",
    );
    assert.deepEqual(values, [180]);
  });

  it("CalculateAngle returns 270 to the left", async () => {
    const values = await drive(
      getCalculateAngle(),
      { origin: { x: 0, y: 0 }, destination: { x: -1, y: 0 } },
      "angle",
    );
    assert.deepEqual(values, [270]);
  });

  it("CalculateAngle returns 45 up-right from an offset origin", async () => {
    const values = await drive(
      getCalculateAngle(),
      { origin: { x: 1, y: 2 }, destination: { x: 2, y: 1 } },
      "angle",
    );
    assert.deepEqual(values, [45]);
  });

  it("CalculateDistance returns the Euclidean distance", async () => {
    const values = await drive(
      getCalculateDistance(),
      { origin: { x: 0, y: 0 }, destination: { x: 3, y: 4 } },
      "distance",
    );
    assert.deepEqual(values, [5]);
  });
});

describe("Range components", () => {
  it("MapRange maps between ranges", async () => {
    const values = await drive(
      getMapRange(),
      { in: 6, in_lower: 5, in_upper: 10, out_lower: 50, out_upper: 100 },
      "out",
    );
    assert.deepEqual(values, [60]);
  });

  it("Random generates numbers between 0 and 1", async () => {
    const values = await drive(getRandom(), { in: null }, "out");
    assert.equal(values.length, 1);
    assert.ok(/** @type {number} */ (values[0]) >= 0);
    assert.ok(/** @type {number} */ (values[0]) < 1);
  });

  it("RangedRandomInt generates integers within the bounds", async () => {
    const values = await drive(
      getRangedRandomInt(),
      { in: null, lower: 1, upper: 6 },
      "out",
    );
    assert.equal(values.length, 1);
    assert.ok(
      /** @type {number} */ (values[0]) >= 1 &&
        /** @type {number} */ (values[0]) <= 6,
    );
    assert.equal(Number.isInteger(values[0]), true);
  });

  it("SendNumber emits the configured number on bang", async () => {
    const values = await drive(
      getSendNumber(),
      { number: 42, in: null },
      "out",
    );
    assert.deepEqual(values, [42]);
  });
});

describe("Accumulate component", () => {
  it("accumulates numbers per scope", async () => {
    const c = getAccumulate();
    const outSocket = noflo.internalSocket.createSocket();
    c.outPorts.out.attach(outSocket);
    /** @type {unknown[]} */
    const values = [];
    outSocket.addEventListener(
      "ip",
      /** @param {CustomEvent} event */ (event) => {
        if (event.detail.type === "data") {
          values.push(event.detail.data);
        }
      },
    );
    const inSocket = noflo.internalSocket.createSocket();
    c.inPorts.in.attach(inSocket);
    inSocket.post(new noflo.IP("data", 2));
    inSocket.post(new noflo.IP("data", 5));
    inSocket.post(new noflo.IP("data", 3));
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.deepEqual(values, [2, 7, 10]);
  });

  it("reset zeroes the counter and emits when emitreset is set", async () => {
    const c = getAccumulate();
    const outSocket = noflo.internalSocket.createSocket();
    c.outPorts.out.attach(outSocket);
    /** @type {unknown[]} */
    const values = [];
    outSocket.addEventListener(
      "ip",
      /** @param {CustomEvent} event */ (event) => {
        if (event.detail.type === "data") {
          values.push(event.detail.data);
        }
      },
    );
    const inSocket = noflo.internalSocket.createSocket();
    const resetSocket = noflo.internalSocket.createSocket();
    const emitresetSocket = noflo.internalSocket.createSocket();
    c.inPorts.in.attach(inSocket);
    c.inPorts.reset.attach(resetSocket);
    c.inPorts.emitreset.attach(emitresetSocket);
    inSocket.post(new noflo.IP("data", 4));
    inSocket.post(new noflo.IP("data", 2));
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.deepEqual(values, [4, 6]);
    emitresetSocket.post(new noflo.IP("data", true));
    resetSocket.post(new noflo.IP("data", null));
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.deepEqual(values, [4, 6, 0]);
  });
});

describe("CountSum component", () => {
  it("sends per-stream sums, restarting on connection changes", async () => {
    const c = getCountSum();
    const outSocket = noflo.internalSocket.createSocket();
    c.outPorts.out.attach(outSocket);
    /** @type {unknown[]} */
    const values = [];
    outSocket.addEventListener(
      "ip",
      /** @param {CustomEvent} event */ (event) => {
        if (event.detail.type === "data") {
          values.push(event.detail.data);
        }
      },
    );
    const socket0 = noflo.internalSocket.createSocket();
    const socket1 = noflo.internalSocket.createSocket();
    c.inPorts.in.attach(socket0, 0);
    c.inPorts.in.attach(socket1, 1);
    // Connection 0 sends a bracketed pair; the first packet of a stream
    // emits the running sum, later same-connection packets emit
    // themselves
    socket0.post(new noflo.IP("openBracket", "stream"));
    socket0.post(new noflo.IP("data", 1));
    socket0.post(new noflo.IP("data", 2));
    socket0.post(new noflo.IP("closeBracket", "stream"));
    // Connection 1 sends its own stream
    socket1.post(new noflo.IP("openBracket", "stream"));
    socket1.post(new noflo.IP("data", 3));
    socket1.post(new noflo.IP("closeBracket", "stream"));
    await new Promise((resolve) => setTimeout(resolve, 30));
    assert.deepEqual(values, [1, 2, 3]);
  });
});
