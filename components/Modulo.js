const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
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
      remainder: {
        datatype: 'all',
      },
    },
  });

  return c.process((input, output) => {
    if (!input.hasData('dividend', 'divisor')) { return; }
    const [dividend, divisor] = input.getData('dividend', 'divisor');
    output.sendDone(dividend % divisor);
  });
};
