const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    icon: 'plus',
    inPorts: {
      minuend: {
        datatype: 'all',
        required: true,
      },
      subtrahend: {
        datatype: 'all',
        required: true,
        control: true,
      },
    },
    outPorts: {
      difference: {
        datatype: 'all',
      },
    },
  });

  return c.process((input, output) => {
    if (!input.hasData('minuend', 'subtrahend')) { return; }
    const [minuend, subtrahend] = input.getData('minuend', 'subtrahend');
    output.sendDone(minuend - subtrahend);
  });
};
