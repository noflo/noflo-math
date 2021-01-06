/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function() {
  const c = new noflo.Component({
    description: 'Accumulate numbers coming from the input port',
    inPorts: {
      in: {
        datatype: 'number',
        description: 'Numbers to accumulate',
        required: true
      },
      reset: {
        datatype: 'bang',
        description: 'Reset accumulation counter'
      },
      emitreset: {
        datatype: 'boolean',
        description: 'Whether to emit an output upon reset',
        control: true,
        default: false
      }
    },
    outPorts: {
      out: {
        datatype: 'number',
        required: true
      }
    }
  });

  c.forwardBrackets = {};

  c.counter = {};
  c.tearDown = function(callback) {
    c.counter = {};
    return callback();
  };

  return c.process(function(input, output) {
    if (input.hasData('reset')) {
      input.getData('reset');
      c.counter[input.scope] = 0;
      let emitReset = false;
      if (input.hasData('emitreset')) { emitReset = input.getData('emitreset'); }
      if (emitReset) { return output.sendDone(c.counter[input.scope]); }
      return output.done();
    }

    if (!input.hasData('in')) { return; }

    const data = input.getData('in');
    if (!c.counter[input.scope]) { c.counter[input.scope] = 0; }
    c.counter[input.scope] += data;

    return output.sendDone(c.counter[input.scope]);});
};
