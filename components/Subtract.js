/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function() {
  const c = new noflo.Component({
    icon: 'plus',
    inPorts: {
      minuend: {
        datatype: 'all',
        required: true
      },
      subtrahend: {
        datatype: 'all',
        required: true,
        control: true
      }
    },
    outPorts: {
      difference: {
        datatype: 'all'
      }
    }
  });

  return c.process(function(input, output) {
    if (!input.hasData('minuend', 'subtrahend')) { return; }
    const [minuend, subtrahend] = Array.from(input.getData('minuend', 'subtrahend'));
    return output.sendDone(minuend - subtrahend);
  });
};
