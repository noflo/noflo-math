/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function() {
  const c = new noflo.Component({
    description: 'Calculate the distance between two points',
    icon: 'arrow-right',
    inPorts: {
      origin: {
        datatype: 'object',
        required: true
      },
      destination: {
        datatype: 'object',
        required: true
      }
    },
    outPorts: {
      distance: {
        datatype: 'int',
        required: true
      }
    }
  });

  return c.process(function(input, output) {
    if (!input.hasData('origin', 'destination')) { return; }
    let [origin, destination] = Array.from(input.getData('origin', 'destination'));

    const deltaX = destination.x - origin.x;
    const deltaY = destination.y - origin.y;
    origin = null;
    destination = null;
    const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return output.sendDone({
      distance});
  });
};
