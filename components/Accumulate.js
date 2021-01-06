const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    description: 'Accumulate numbers coming from the input port',
    inPorts: {
      in: {
        datatype: 'number',
        description: 'Numbers to accumulate',
        required: true,
      },
      reset: {
        datatype: 'bang',
        description: 'Reset accumulation counter',
      },
      emitreset: {
        datatype: 'boolean',
        description: 'Whether to emit an output upon reset',
        control: true,
        default: false,
      },
    },
    outPorts: {
      out: {
        datatype: 'number',
        required: true,
      },
    },
  });

  c.forwardBrackets = {};

  c.counter = {};
  c.tearDown = (callback) => {
    c.counter = {};
    callback();
  };

  return c.process((input, output) => {
    if (input.hasData('reset')) {
      input.getData('reset');
      c.counter[input.scope] = 0;
      let emitReset = false;
      if (input.hasData('emitreset')) {
        emitReset = input.getData('emitreset');
      }
      if (emitReset) {
        output.sendDone(c.counter[input.scope]);
        return;
      }
      output.done();
      return;
    }

    if (!input.hasData('in')) {
      return;
    }

    const data = input.getData('in');
    if (!c.counter[input.scope]) {
      c.counter[input.scope] = 0;
    }
    c.counter[input.scope] += data;

    output.sendDone(c.counter[input.scope]);
  });
};
