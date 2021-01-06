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
      number: {
        datatype: 'number',
        required: true,
        control: true
      },
      in: {
        datatype: 'bang',
        required: true
      }
    },
    outPorts: {
      out: {
        datatype: 'number',
        required: true
      }
    }
  });

  return c.process(function(input, output) {
    if (!input.hasData('in', 'number')) { return; }
    const [data, number] = Array.from(input.getData('in', 'number'));

    return output.sendDone({out: number});
  });
};
