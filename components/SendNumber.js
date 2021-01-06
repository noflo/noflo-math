const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    inPorts: {
      number: {
        datatype: 'number',
        required: true,
        control: true,
      },
      in: {
        datatype: 'bang',
        required: true,
      },
    },
    outPorts: {
      out: {
        datatype: 'number',
        required: true,
      },
    },
  });

  return c.process((input, output) => {
    if (!input.hasData('in', 'number')) { return; }
    input.getData('in');
    const number = input.getData('number');

    output.sendDone({ out: number });
  });
};
