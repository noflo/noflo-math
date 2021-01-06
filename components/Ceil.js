const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    icon: 'arrow-up',
    description: 'Round a number up',
    inPorts: {
      in: {
        datatype: 'number',
      },
    },
    outPorts: {
      out: {
        datatype: 'int',
      },
    },
  });

  return c.process((input, output) => {
    if (!input.hasData('in')) { return; }
    const data = input.getData('in');
    output.sendDone(Math.ceil(data));
  });
};
