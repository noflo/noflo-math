const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    icon: 'asterisk',
    inPorts: {
      multiplicand: {
        datatype: 'all',
        required: true,
      },
      multiplier: {
        datatype: 'all',
        required: true,
        control: true,
      },
    },
    outPorts: {
      product: {
        datatype: 'all',
        required: true,
      },
    },
  });

  return c.process((input, output) => {
    if (!input.hasData('multiplicand', 'multiplier')) { return; }
    const [multiplicand, multiplier] = input.getData('multiplicand', 'multiplier');
    output.sendDone({ product: multiplicand * multiplier });
  });
};
