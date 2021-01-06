/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function() {
  const c = new noflo.Component({
    icon: 'asterisk',
    inPorts: {
      multiplicand: {
        datatype: 'all',
        required: true
      },
      multiplier: {
        datatype: 'all',
        required: true,
        control: true
      }
    },
    outPorts: {
      product: {
        datatype: 'all',
        required: true
      }
    }
  });

  return c.process(function(input, output) {
    if (!input.hasData('multiplicand', 'multiplier')) { return; }
    const [multiplicand, multiplier] = Array.from(input.getData('multiplicand', 'multiplier'));
    return output.sendDone({product: multiplicand * multiplier});
  });
};
