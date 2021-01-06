const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    icon: 'plus',
    inPorts: {
      augend: {
        datatype: 'number',
        required: true,
      },
      addend: {
        datatype: 'number',
        required: true,
        control: true,
      },
    },
    outPorts: {
      sum: {
        datatype: 'number',
      },
    },
  });

  return c.process((input, output) => {
    if (!input.hasData('augend', 'addend')) { return; }
    const [augend, addend] = input.getData('augend', 'addend');
    output.sendDone({
      sum: Number(augend) + Number(addend),
    });
  });
};
