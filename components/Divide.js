const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    icon: 'plus',
    inPorts: {
      dividend: {
        datatype: 'all',
        required: true,
      },
      divisor: {
        datatype: 'all',
        required: true,
        control: true,
      },
    },
    outPorts: {
      quotient: {
        datatype: 'all',
      },
    },
  });

  return c.process((input, output) => {
    if (!input.hasData('dividend', 'divisor')) { return; }
    const [dividend, divisor] = input.getData('dividend', 'divisor');
    output.sendDone({ quotient: dividend / divisor });
  });
};
