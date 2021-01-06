/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function() {
  const c = new noflo.Component({
    icon: 'random',
    description: 'Generate a random number between 0 and 1',
    inPorts: {
      in: {
        datatype: 'bang'
      }
    },
    outPorts: {
      out: {
        datatype: 'number'
      }
    }
  });

  return c.process(function(input, output) {
    if (!input.hasData('in')) { return; }
    input.getData('in');
    return output.sendDone(Math.random());
  });
};
