/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function() {
  const c = new noflo.Component({
    inPorts: {
      dividend: {
        datatype: 'all',
        required: true
      },
      divisor: {
        datatype: 'all',
        required: true,
        control: true
      }
    },
    outPorts: {
      remainder: {
        datatype: 'all'
      }
    }
  });

  return c.process(function(input, output) {
    if (!input.hasData('dividend', 'divisor')) { return; }
    const [dividend, divisor] = Array.from(input.getData('dividend', 'divisor'));
    return output.sendDone(dividend % divisor);
  });
};
