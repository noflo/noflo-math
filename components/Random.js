const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    icon: 'random',
    description: 'Generate a random number between 0 and 1',
    inPorts: {
      in: {
        datatype: 'bang',
      },
    },
    outPorts: {
      out: {
        datatype: 'number',
      },
    },
  });

  return c.process((input, output) => {
    if (!input.hasData('in')) { return; }
    input.getData('in');
    output.sendDone(Math.random());
  });
};
