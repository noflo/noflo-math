const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    inPorts: {
      in: {
        datatype: 'bang',
        required: true,
      },
      lower: {
        datatype: 'number',
        description: 'the lower bound',
        control: true,
      },
      upper: {
        datatype: 'number',
        description: 'the uppwer bound',
        control: true,
      },
    },
    outPorts: {
      out: {
        datatype: 'number',
        required: true,
      },
    },
  });

  c.icon = 'random';
  c.description = 'Generate a random number in the given range.';

  c.forwardBrackets = {
    in: ['out'],
    lower: ['out'],
    upper: ['out'],
  };

  // On data flow.
  return c.process((input, output) => {
    if (!input.hasData('in', 'lower', 'upper')) { return; }
    let lower = input.getData('lower');
    let upper = input.getData('upper');

    // Math.random() returns a number between 0 (inclusive) and 1 (exclusive)
    lower = Math.min(lower, upper);
    upper = Math.max(lower, upper);
    const range = (0.5 + upper) - lower;
    const value = lower + (Math.random() * range);
    output.sendDone(Math.floor(value));
  });
};
