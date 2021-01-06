const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    description: 'Calculate the distance between two points',
    icon: 'arrow-right',
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
      distance: {
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
    const distance = Math.sqrt((deltaX ** 2) + (deltaY ** 2));
    output.sendDone({ distance });
  });
};
