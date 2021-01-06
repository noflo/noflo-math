/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function() {
  const c = new noflo.Component({
    icon: 'arrow-down',
    description: 'Round a number down',
    inPorts: {
      in: {
        datatype: 'number'
      }
    },
    outPorts: {
      out: {
        datatype: 'int'
      }
    }
  });

  return c.process(function(input, output) {
    if (!input.hasData('in')) { return; }
    const data = input.getData('in');
    return output.sendDone(Math.floor(data));
  });
};
