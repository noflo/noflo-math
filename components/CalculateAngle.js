const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    description: 'Calculate the angle between two points',
    icon: 'compass',
    inPorts: {
      origin: {
        datatype: 'object',
        required: true,
      },
      destination: {
        datatype: 'object',
        required: true,
      },
    },
    outPorts: {
      angle: {
        datatype: 'int',
        required: true,
      },
    },
  });

  return c.process((input, output) => {
    if (!input.hasData('origin', 'destination')) { return; }
    let [origin, destination] = input.getData('origin', 'destination');

    const deltaX = destination.x - origin.x;
    const deltaY = destination.y - origin.y;
    origin = null;
    destination = null;
    let angle = ((Math.atan2(deltaY, deltaX) * 180) / Math.PI) + 90;
    if (angle < 0) { angle += 360; }
    output.sendDone({ angle });
  });
};
