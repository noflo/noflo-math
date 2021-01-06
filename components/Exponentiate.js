const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.icon = 'caret-up';
  c.inPorts.add('base', {
    datatype: 'number',
    required: true,
  });
  c.inPorts.add('exponent', {
    datatype: 'number',
    required: true,
    control: true,
  });
  c.outPorts.add('power',
    { datatype: 'number' });

  return c.process((input, output) => {
    if (!input.hasData('base', 'exponent')) { return; }
    const [base, exponent] = input.getData('base', 'exponent');
    output.sendDone({ power: (base ** exponent) });
  });
};
